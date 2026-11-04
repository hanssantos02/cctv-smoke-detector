# Windows diagnostic helpers

These scripts preserve actions performed during the2026-11-05 Pi setup session. They are **Windows PowerShell helpers**,not Pi firmware or Linux-laptop setup scripts. Read current PROGRESS.md/handoff before using them. They are not automatically runnable on a new PC or safe to rerun just because they are in Git.

| Script | Purpose and limits |
| --- | --- |
| Set-PiWifi24Retry.ps1 | Default is a read-only preview. With explicit card-write approval,-Apply edits the inspected card's network-config/meta-data/cmdline.txt,retains password/user-data,backs originals up on card and verifies readbacks. Depends on the original Windows Imager registry,current2.4GHz SSID,exact card capacity/layout and original network/instance-ID shape. The approved change already ran once;do not rerun to resume diagnostics. |
| Eject-PiReader.ps1 | Standard Windows safe-removal request for a strict card-to-PnP-reader match,then verifies matching disk disappeared. No forced dismount,disable or elevation. Depends on observed reader VID/PID/card size;do not loosen guards to target unknown hardware. |

Actual session results:both scripts ran successfully for their intended scope. PowerShell syntax and safe code checks are reviewed for the Git checkpoint;no fresh card write/eject should be executed for repository validation.

The scripts contain no hardcoded password,SSID,private hash or token. They read relevant local configuration at runtime and print a public target network name for review,not credentials. Private originals are on the card in `.sentrion-before-wifi24-b5e24c57`,not in this repository. Never commit that backup or raw card configuration/logs.

For the Linux laptop,use [READ_STARTUP_LOGS_LINUX.md](../docs/READ_STARTUP_LOGS_LINUX.md). Identify the actual distro/device and seek applicable sudo/mount approval;Windows paths/disk numbers,registry settings and helper assumptions do not transfer.
