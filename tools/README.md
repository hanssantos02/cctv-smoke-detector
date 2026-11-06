# Diagnostic helpers

Current checkpoint: Pi shut down/unplugged,card seated in Pi. These card helpers are preserved for reproducibility,not current resume actions. See ../docs/CONTINUE_ON_ANOTHER_PC.md.

## Linux read-only inspection

`inspect_pi_network.py` summarizes protected Netplan Wi-Fi profiles on the offline Pi card without displaying network names,passwords or filenames. It verifies the project's `tmp/pi-rootfs` is a read-only ext4 mount with `noload`/`norecovery`;it never mounts,edits,repairs or applies anything. Run only after current card/mount identification and the user-operated sudo checkpoint in [READ_STARTUP_LOGS_LINUX.md](../docs/READ_STARTUP_LOGS_LINUX.md). Uses Python3 and PyYAML,already available on the inspected Mint laptop;do not install dependencies automatically on another PC. Syntax and synthetic secret-suppression checks passed. User-run card summary2026-11-06 verified one wlan0 profile with DHCP IPv4 and a saved AP/name/password;summary did not validate credentials by itself;the subsequent new-router update/live login succeeded.

## Linux new-router change

`change_pi_wifi.py` defaults to a read-only preview. `--apply` is a deliberate **card-write operation**,with hidden password prompts and final local `YES` before writes/mount changes. It targets only the currently inspected USB card and one existing wlan0/AP Netplan profile. It uses the laptop's current WPA/WPA2 personal Wi-Fi name,backs original configuration up privately on card,temporarily mounts rootfs rw,replaces/verifies the profile,and restores read-only access. It never retrieves the laptop's stored Wi-Fi password or prints names/passwords. Follow [CHANGE_WIFI_LINUX.md](../docs/CHANGE_WIFI_LINUX.md). Do not execute --apply for repository testing. Synthetic tests and actual read-only identity/current-network checks passed;user-run update2026-11-06 succeeded with backup/readback and independently verified read-only restoration. Do not rerun --apply to resume. Boot seed/instance IDs are unchanged;future explicit reprovisioning can regenerate seed settings.

## Windows historical actions

These scripts preserve actions performed during the2026-11-05 Pi setup session. They are **Windows PowerShell helpers**,not Pi firmware or Linux-laptop setup scripts. Read current PROGRESS.md/handoff before using them. They are not automatically runnable on a new PC or safe to rerun just because they are in Git.

| Script | Purpose and limits |
| --- | --- |
| Set-PiWifi24Retry.ps1 | Default is a read-only preview. With explicit card-write approval,-Apply edits the inspected card's network-config/meta-data/cmdline.txt,retains password/user-data,backs originals up on card and verifies readbacks. Depends on the original Windows Imager registry,current2.4GHz SSID,exact card capacity/layout and original network/instance-ID shape. The approved change already ran once;do not rerun to resume diagnostics. |
| Eject-PiReader.ps1 | Standard Windows safe-removal request for a strict card-to-PnP-reader match,then verifies matching disk disappeared. No forced dismount,disable or elevation. Depends on observed reader VID/PID/card size;do not loosen guards to target unknown hardware. |

Actual session results:both scripts ran successfully for their intended scope. PowerShell syntax and safe code checks are reviewed for the Git checkpoint;no fresh card write/eject should be executed for repository validation.

The scripts contain no hardcoded password,SSID,private hash or token. They read relevant local configuration at runtime and print a public target network name for review,not credentials. Private originals are on the card in `.sentrion-before-wifi24-b5e24c57`,not in this repository. Never commit that backup or raw card configuration/logs.

For the Linux laptop,use [READ_STARTUP_LOGS_LINUX.md](../docs/READ_STARTUP_LOGS_LINUX.md). Identify the actual distro/device and seek applicable sudo/mount approval;Windows paths/disk numbers,registry settings and helper assumptions do not transfer.

## Offline checkpoint verification — 2026-11-06

Eight checks passed without real mount/card actions: summary secret suppression;new YAML quoting/unrelated-setting preservation;device/mount mismatch rejection;successful apply/private backup;injected write failure rollback;rw-mount failure read-only restoration;default preview avoiding apply/password prompts;escaping profile-symlink rejection. Fixture writes were confined to ignored project tmp and system/mount calls mocked. Do not run --apply against hardware for repository verification.
