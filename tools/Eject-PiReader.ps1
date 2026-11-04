<#
Request normal Windows safe removal of this project's identified USB reader.
No forced dismount, device disable, installation or administrator elevation.
Run only when the user is ready to transfer the card back to the unpowered Pi.
#>
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'

$cards = @(Get-Disk | Where-Object {
    $_.BusType -eq 'USB' -and $_.Size -eq 31299993600 -and
    -not $_.IsBoot -and -not $_.IsSystem
})
if ($cards.Count -ne 1) { throw 'Expected exactly one matching Pi USB card.' }
$card = $cards[0]
$diskDevice = @(Get-CimInstance Win32_DiskDrive | Where-Object { $_.Index -eq $card.Number })
if ($diskDevice.Count -ne 1 -or $diskDevice[0].PNPDeviceID -notlike 'USBSTOR\*') {
    throw 'Cannot link the inspected disk to a USB storage device.'
}
$parent = (Get-PnpDeviceProperty -InstanceId $diskDevice[0].PNPDeviceID -KeyName 'DEVPKEY_Device_Parent').Data
# This VID/PID was observed on the actual reader. Refuse hubs/other devices.
if ($parent -notlike 'USB\VID_14CD&PID_1212\*') {
    throw 'Reader parent is not the previously identified USB card reader.'
}

# Add-Type compiles this small interop declaration in memory in PowerShell7.
# Microsoft's normal eject API can veto removal if a device is busy.
if (-not ('Sentrion.ReaderEject' -as [type])) {
    Add-Type -TypeDefinition @'
using System;
using System.Text;
using System.Runtime.InteropServices;
namespace Sentrion {
    public static class ReaderEject {
        [DllImport("cfgmgr32.dll", CharSet=CharSet.Unicode, ExactSpelling=true)]
        public static extern uint CM_Locate_DevNodeW(out uint instance, string deviceId, uint flags);
        [DllImport("cfgmgr32.dll", CharSet=CharSet.Unicode, ExactSpelling=true)]
        public static extern uint CM_Request_Device_EjectW(uint instance, out uint vetoType,
            StringBuilder vetoName, uint nameLength, uint flags);
    }
}
'@
}
[uint32]$instance = 0
$locateResult = [Sentrion.ReaderEject]::CM_Locate_DevNodeW([ref]$instance, $parent, 0)
if ($locateResult -ne 0) { throw "Windows could not locate reader; result $locateResult." }
[uint32]$veto = 0
$vetoName = [Text.StringBuilder]::new(260)
$ejectResult = [Sentrion.ReaderEject]::CM_Request_Device_EjectW($instance, [ref]$veto, $vetoName, 260, 0)
if ($ejectResult -ne 0) {
    [pscustomobject]@{SafeRemovalAccepted=$false;Result=$ejectResult;VetoType=$veto;ForceUsed=$false} |
        ConvertTo-Json -Compress
    return
}

$stillPresent = $true
foreach ($attempt in 1..5) {
    $stillPresent = @(Get-Disk | Where-Object {
        $_.BusType -eq 'USB' -and $_.Size -eq 31299993600
    }).Count -gt 0
    if (-not $stillPresent) { break }
    Start-Sleep -Milliseconds 300
}
[pscustomobject]@{
    SafeRemovalAccepted=$true
    MatchingCardStillPresent=$stillPresent
    SafeToUnplug= -not $stillPresent
    ForceUsed=$false
} | ConvertTo-Json -Compress
