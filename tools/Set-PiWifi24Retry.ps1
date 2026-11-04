<#
Prepare a controlled 2.4 GHz retry for this project's already-written Pi card.
Run without -Apply for a read-only preview. -Apply is a card write and requires
the user's approval. No Windows credentials, packages or administrator access
are used. Secret-bearing originals stay on the same card, outside the repo.
#>
[CmdletBinding()]
param([switch]$Apply)

$ErrorActionPreference = 'Stop'

# Require the exact removable card inspected in this session; never guess a
# drive letter, and never select a Windows boot/system disk.
$cards = @(Get-Disk | Where-Object {
    $_.BusType -eq 'USB' -and $_.Size -eq 31299993600 -and
    -not $_.IsBoot -and -not $_.IsSystem -and -not $_.IsReadOnly
})
if ($cards.Count -ne 1) { throw 'Expected exactly one matching writable USB card.' }
$card = $cards[0]
$bootPartition = Get-Partition -DiskNumber $card.Number -PartitionNumber 1
$bootVolume = $bootPartition | Get-Volume
if ($bootPartition.Size -ne 536870912 -or $bootVolume.FileSystemLabel -ne 'bootfs' -or
    $bootVolume.FileSystem -ne 'FAT32' -or -not $bootVolume.Path) {
    throw 'Boot partition identity does not match the inspected Pi card.'
}
$bootRoot = $bootVolume.Path

# Read the current Windows connection name, not its stored password. The user
# confirmed the 2.4 GHz network uses the same password already on the card.
$wifiText = (netsh wlan show interfaces) -join "`n"
$targetSsid = [regex]::Match($wifiText, '(?m)^\s*SSID\s*:\s*(.+?)\s*$').Groups[1].Value.Trim()
$band = [regex]::Match($wifiText, '(?m)^\s*Band\s*:\s*(.+?)\s*$').Groups[1].Value.Trim()
if ($band -ne '2.4 GHz' -or -not $targetSsid -or
    [Text.Encoding]::UTF8.GetByteCount($targetSsid) -gt 32 -or $targetSsid -match '[\x00-\x1f]') {
    throw 'Current Windows connection must be a valid 2.4 GHz Wi-Fi network.'
}
$settingsKey = Get-Item -LiteralPath 'HKCU:\Software\Raspberry Pi\Raspberry Pi Imager\imagecustomization'
$originalSsid = [string]$settingsKey.GetValue('wifiSSID')
if (-not $originalSsid -or $targetSsid -ceq $originalSsid) {
    throw 'Expected a distinct 2.4 GHz target and the original Imager network name.'
}

$utf8 = [Text.UTF8Encoding]::new($false)
$originalBytes = @{}
$original = @{}
foreach ($name in @('network-config', 'meta-data', 'cmdline.txt', 'user-data')) {
    $originalBytes[$name] = [IO.File]::ReadAllBytes((Join-Path $bootRoot $name))
    $original[$name] = $utf8.GetString($originalBytes[$name])
}

# Imager wrote a quoted YAML access-point key. Only replace that exact key;
# retain the password line and every other network setting byte-for-byte.
$oldQuoted = ConvertTo-Json -InputObject $originalSsid -Compress
$newQuoted = ConvertTo-Json -InputObject $targetSsid -Compress
$ssidPattern = '(?m)^(?<indent>[ \t]*)' + [regex]::Escape($oldQuoted) + '(?<suffix>:[ \t]*\r?)$'
$ssidMatches = [regex]::Matches($original['network-config'], $ssidPattern)
if ($ssidMatches.Count -ne 1) { throw 'Expected exactly one original access-point key.' }
$ssidMatch = $ssidMatches[0]
$replacementLine = $ssidMatch.Groups['indent'].Value + $newQuoted + $ssidMatch.Groups['suffix'].Value
$newNetwork = $original['network-config'].Substring(0, $ssidMatch.Index) + $replacementLine +
    $original['network-config'].Substring($ssidMatch.Index + $ssidMatch.Length)

# A new NoCloud instance ID requests initial provisioning again. Update both
# locations consistently, preserving every other kernel/metadata setting.
$cmdPattern = 'ds=nocloud;i=(?<id>[^\s;]+)'
$cmdMatches = [regex]::Matches($original['cmdline.txt'], $cmdPattern)
$metaPattern = '(?m)^instance-id:[ \t]*(?<id>[^\s"''#]+)[ \t]*\r?$'
$metaMatches = [regex]::Matches($original['meta-data'], $metaPattern)
if ($cmdMatches.Count -ne 1 -or $metaMatches.Count -ne 1 -or
    $cmdMatches[0].Groups['id'].Value -cne $metaMatches[0].Groups['id'].Value) {
    throw 'Expected one consistent, unquoted NoCloud instance ID in both files.'
}
$oldId = $cmdMatches[0].Groups['id'].Value
$newId = 'rpi-imager-sentrion-wifi24-20261105-' + [guid]::NewGuid().ToString('N').Substring(0, 8)
$newCmdline = $original['cmdline.txt'].Replace(('ds=nocloud;i=' + $oldId), ('ds=nocloud;i=' + $newId))
$newMeta = $original['meta-data'].Replace($oldId, $newId)
if ($newMeta.Replace($newId, $oldId) -cne $original['meta-data'] -or
    $newCmdline.Replace($newId, $oldId) -cne $original['cmdline.txt']) {
    throw 'Instance ID preview did not round-trip exactly.'
}

$summary = [ordered]@{
    Mode = if ($Apply) { 'Apply' } else { 'Read-only preview' }
    Disk = $card.Number
    CardBytes = $card.Size
    BootLabel = $bootVolume.FileSystemLabel
    TargetSSID = $targetSsid
    TargetBand = $band
    FilesToChange = @('network-config', 'meta-data', 'cmdline.txt')
    PasswordLinePreserved = $true
    UserDataUnchanged = $true
    ReRunsInitialProvisioning = $true
    FormatsCard = $false
}
if (-not $Apply) { [pscustomobject]$summary | ConvertTo-Json -Depth 3; return }

$newText = @{'network-config' = $newNetwork; 'meta-data' = $newMeta; 'cmdline.txt' = $newCmdline}
$backupName = '.sentrion-before-wifi24-' + [guid]::NewGuid().ToString('N').Substring(0, 8)
$backupPath = Join-Path $bootRoot $backupName
[void][IO.Directory]::CreateDirectory($backupPath)

# Backup exact originals before any replacement. Never print file contents or
# put these backups in Git: network-config contains the private Wi-Fi password.
foreach ($name in $newText.Keys) {
    [IO.File]::WriteAllBytes((Join-Path $backupPath $name), $originalBytes[$name])
    $savedBackup = [IO.File]::ReadAllBytes((Join-Path $backupPath $name))
    if ([Convert]::ToBase64String($savedBackup) -cne [Convert]::ToBase64String($originalBytes[$name])) {
        throw 'On-card backup verification failed; original setup files were not edited.'
    }
}

$attemptedWrites = [System.Collections.Generic.List[string]]::new()
try {
    foreach ($name in $newText.Keys) {
        # Detect changes made since the preview/preparation before overwriting.
        $current = [IO.File]::ReadAllBytes((Join-Path $bootRoot $name))
        if ([Convert]::ToBase64String($current) -cne [Convert]::ToBase64String($originalBytes[$name])) {
            throw 'A setup file changed during preparation; refusing to continue.'
        }
        $attemptedWrites.Add($name)
        [IO.File]::WriteAllText((Join-Path $bootRoot $name), $newText[$name], $utf8)
        if ([IO.File]::ReadAllText((Join-Path $bootRoot $name)) -cne $newText[$name]) {
            throw 'Setup-file readback verification failed.'
        }
    }
    $userReadback = [IO.File]::ReadAllBytes((Join-Path $bootRoot 'user-data'))
    if ([Convert]::ToBase64String($userReadback) -cne [Convert]::ToBase64String($originalBytes['user-data'])) {
        throw 'Unexpected user-data change detected.'
    }
} catch {
    # Restore only files we attempted after a write/readback failure. No repair,
    # filesystem formatting, privileged access or broad deletion is attempted.
    foreach ($name in $attemptedWrites) {
        [IO.File]::WriteAllBytes((Join-Path $bootRoot $name), $originalBytes[$name])
    }
    throw 'Card setup update failed; original setup files were restored. Keep the card connected for inspection.'
}

$summary['ReadbackVerified'] = $true
$summary['BackupDirectoryOnCard'] = $backupName
[pscustomobject]$summary | ConvertTo-Json -Depth 3
