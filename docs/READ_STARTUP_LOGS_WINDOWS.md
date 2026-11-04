# Read Pi startup logs from this Windows PC

PHASE2: PROTOTYPING, Step19. Prepared2026-11-05. This plan does not install software or move the powered card. The purpose is to obtain actual boot/setup evidence instead of repeating network scans.

**Deferred alternative:** User subsequently asked about using their Linux laptop. Follow [READ_STARTUP_LOGS_LINUX.md](READ_STARTUP_LOGS_LINUX.md) first;Windows installation was never approved or performed. Installer path is machine-local/ignored and will not exist in a fresh clone. Do not download/install it merely because this older plan exists.

## What needs to be enabled

Usually nothing needs to be enabled on the Pi to produce cloud-init logs. If startup reached cloud-init and logs were saved,they can be read from its Linux **ext4** partition. Ext4 is the filesystem used for the Pi's Linux files. Windows currently reads only the small FAT32 `bootfs` partition;opening an administrator terminal alone does not make ext4 browsable.

Primary targets from [cloud-init's debugging guide](https://docs.cloud-init.io/en/latest/howto/debugging.html):

- `/var/log/cloud-init.log` — detailed initial-setup activity and errors.
- `/var/log/cloud-init-output.log` — output from the setup stages/commands.

They may be missing/empty if startup never reached the relevant stage or logs were not retained. Their absence alone is not a complete diagnosis. `/run` data is volatile and cannot be assumed recoverable after power-off. Binary system journals may need Linux tooling later;do not promise this reader can display them as text.

## Existing tooling and selected proposal

No installed ext4 reader was found at checked standard paths. WSL executable exists,but no current-user Linux distribution is registered. Microsoft also [documents limitations for directly mounting USB/SD readers with wsl --mount](https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk). Installing a full WSL environment is not the proposed first step.

Proposed tool: **DiskInternals Linux Reader Free5.3**,a Windows application whose [vendor documentation](https://www.diskinternals.com/linux-reader/) states read-only Ext2/3/4 access and file export. Free licence cost is PHP0;no Pro purchase is needed for this planned ext4 file reading. Do not substitute Linux Writer,Ext4 Formatter or recovery/repair operations.

Installer prepared but **not run/installed**:

| Field | Verified local result |
| --- | --- |
| Source | Official vendor link `https://eu.diskinternals.com/download/Linux_Reader.exe` |
| Project-relative path | `tmp/downloads/Linux_Reader.exe` |
| File version/product |5.3 / DiskInternals Linux Reader |
| Size |50,560,936bytes |
| Authenticode status |Valid |
| Signing subject |CN=DiskInternals,O=DiskInternals,S=Kyiv,C=UA |
| SHA256 |CDDCEE0C95B61BA513E33A293951DACA208B54BE994C18A70E5E3226C88CB39F |
| Git handling |Existing `/tmp/` ignore verified;installer must not be committed |

A valid signature identifies the signed publisher;no installed/functional-reader result is claimed. The downloaded file must be checked again if replaced.

## Installation checkpoint — approval required

Ask explicit permission to run/install this named free reader on Windows. AGENTS.md requires asking before package installation or changes outside the project. Approval for earlier card edits is not permission for this installation. No installation command has been run.

After approval,start the verified installer and inspect actual prompts. User handles any Windows administrator/credential prompt personally;never automate authentication/security dialogs or bypass protection. Use only the free Reader component for this task. If optional products or paid features are offered,leave them out. Record installation/version/outcome before moving to hardware handling.

## Physical card checkpoint — after reader is ready

Pi is currently powered after the2.4GHz retry. No new card removal is authorized as completed.

1. Explain/obtain applicable confirmation for another power-off because SSH clean shutdown remains unavailable and cutting power can corrupt files.
2. Guide supply disconnection and wait for user's all-lights-off result before touching card.
3. Guide microSD transfer to existing Windows reader and await connected result. Cancel any format,repair or initialize offer.
4. Re-identify the USB card from current disk information,not old drive letters/disk numbers.

## Read/export checkpoint — never repair the card

In the actual Reader interface,identify the32GB-labelled card (reported31.3GB) and its approximately30.75GB Linux partition,not the256GB WDC or500GB Kingston internal disks. Small512MiB `bootfs` is not where `/var/log` lives. Verify current device/partition details before opening.

Browse the card's Linux root to `/var/log` and look for the two named cloud-init logs. If present,preview only safe/redacted excerpts,or export selected files into project `tmp/pi-log-inspection/` (ignored/private),not into tracked docs. Logs can contain sensitive configuration;capture privately and sanitize **before** any tool output/chat rendering. Never display raw logs,network passwords,password hashes or tokens. Do not browse `/etc/shadow` or unrelated personal files.

Report timestamps,which stages ran,and sanitized errors with confidence limits. If no usable logs,record that and choose the next evidence source rather than inferring a root cause. No card write,format,repair or OS rewrite is part of this plan. Close reader handles and use verified safe ejection before any later return to Pi.

## Current state

Installer downloaded/signature checked on original Windows PC,not run. Windows installation is deferred while exploring Linux laptop;no approval assumed. Pi last reported powered/card seated;reconfirm on resume. No Linux startup log has been read/exported yet.
