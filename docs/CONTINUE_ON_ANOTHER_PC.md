# Continue on another PC

Updated **2026-11-05, Asia/Manila**. Repository: https://github.com/hanssantos02/cctv-smoke-detector
Current phase: **Phase 2, Step 19 — initial Pi setup / Linux startup-log investigation**.

## The next checkpoint

The user asked whether a Linux laptop would make diagnosis easier, then requested this repository checkpoint so another device/assistant can continue. The proposed Linux route has not yet been executed.

First obtain the laptop distribution/version:

```sh
cat /etc/os-release
```

This only reads information; no installation, sudo or serial-group change is required. Return/inspect that output before choosing exact mount commands. Also reconfirm the actual Pi power/card location because hardware state can change between chats.

Follow [READ_STARTUP_LOGS_LINUX.md](READ_STARTUP_LOGS_LINUX.md). The targets, if startup created them, are:

- `/var/log/cloud-init.log`
- `/var/log/cloud-init-output.log`
- Persistent journals only if present and compatible with the laptop's journal tools; volatile `/run` logs cannot be assumed to survive shutdown.

There is no need to install Codex, move the whole project, or install Pi development packages merely to use the Linux laptop as a card reader. If the user wants to continue this project/chat on it, clone/pull and read these files.

## Hardware and software already identified

| Item | Verified observation / limit |
| --- | --- |
| Pi | Raspberry Pi 4 Model B visible in photo; 4GB RAM per user, not yet software-checked |
| Supply | Label KSA-15E-051300HU, Raspberry Pi-branded, output 5.1V DC/3A, input 100–240V AC, flat pins; authenticity/load regulation untested |
| Card | Silvertec 32GB microSDHC, UHS-I/A1/Class10 markings; no established high-endurance rating |
| Reader | USB Mass Storage Device, reported 31,299,993,600 bytes; Windows disk/volume identifiers are local and must be rediscovered |
| Case/display | Pi in black case; monitor owned, monitor input unconfirmed, no micro-HDMI cable or Ethernet cable reported |
| OS preparation | Imager 2.0.12 on Windows; Raspberry Pi OS 64-bit desktop Trixie release 2026-10-06 was selected; running OS/version has not been confirmed |
| Login settings | Hostname `sentrion-pi`, username `sentrion`; private password not stored in repo |

**Last physical report:** prepared card seated in Pi, power on for at least five minutes during the 2.4GHz retry, green ACT subsequently off. No successful boot/SSH session is confirmed. Do not assume ACT off means failure or a safe shutdown.

## What happened in this session

1. User authorized starting initial Pi setup, confirmed first-boot inventory, and supplied hardware labels. This supersedes the old Phase1-only status. Full BOM approval and later prototype success were not given.
2. User operated Imager: Pi4, OS64-bit, Manila/Asia-Manila, US keyboard code `us`, account, Wi-Fi, SSH/password authentication; Connect was left off. Imager showed Write complete and automatic safe ejection. Verification was requested, but its completion was not separately established beyond the completion screen/brief reply.
3. Pi powered; user reported red on and intermittent green activity. Neither `sentrion-pi.local` nor `sentrion-pi` resolved. Bounded IPv4 ping/SSH22 scans found other devices but no SSH listener. mDNS and manufacturer-prefix checks did not identify Pi; absence of a response is not proof of broken hardware.
4. Router initially inaccessible, then user opened the PLDT/Huawei HG8145V5 interface. All four User Device Information pages and the pre-retry DHCP table showed no confirmed Pi identity. DHCP had spare addresses. An unnamed client refused SSH and was not identified as Pi. User supplied screenshots; direct Windows browser automation was blocked by its URL-policy enforcement, not bypassed.
5. With explicit user approval, one power-off/card transfer allowed **read-only card inspection**. Boot files/configs were readable through bootfs's existing Windows volume path. Windows marked bootfs Warning; no repair was run. Unelevated raw access to the Linux partition was denied, so **Linux startup logs remain unread**.
6. Card itself contained expected hostname/account/SSID/PH regulatory settings, SSH password auth and a service-start command. This is setup-file evidence, not running-state evidence. See [CARD_INSPECTION.md](CARD_INSPECTION.md). Do not falsely diagnose missing `enable_ssh`: this Imager version uses a service command.
7. User approved a controlled **2.4GHz retry**, selected the network by connecting this Windows PC to it, and confirmed the password was the same. Only `network-config`'s AP name and matching NoCloud IDs in `meta-data`/`cmdline.txt` changed. `user-data` and password line remained unchanged; readbacks passed. Initial provisioning was requested again, not an image reflash.
8. Originals were backed up **on the card** in `.sentrion-before-wifi24-b5e24c57`. It contains private configuration and must stay out of Git. Windows safe-ejection API succeeded when no menu appeared. User returned card and powered the retry for at least five minutes.
9. PC verified on 2.4GHz/channel4; fresh hostname/SSH checks still failed. Post-retry router DHCP/WLAN association evidence has not been supplied. IPv6 discovery was unavailable because this Windows Wi-Fi binding is disabled; it was not enabled. IPv4 mDNS still gave no replies.
10. Windows ext4-reader alternative was researched and its signed Free5.3 installer downloaded to ignored Windows `tmp/downloads/`, **never executed/installed**. User then asked about the Linux laptop; Windows installation is deferred.

The cause is **unconfirmed**. Do not declare the card faulty, 5GHz unsupported, an applied country-code error, or a completed Linux boot without evidence.

## Permissions and next physical handling

- User explicitly approved initial Pi setup and the completed 2.4GHz card edits. Those permissions are not blanket authorization for future flashes, installs, sudo, repairs or writes outside the project.
- AGENTS.md requires asking before such commands and obtaining physical results one step at a time.
- Keep the powered card in place until an agreed power-off. SSH clean shutdown is still unavailable; explain the risk of cutting power before another transfer.
- Identify the actual Linux removable device and mount state before commands. Never assume `/dev/sdb`, reuse Windows disk2/E:, or open a guessed device.
- Desktop automount may have already mounted the card; check before claiming strict read-only access.
- For inspection, Linux ext4 `ro` alone can replay its journal; `ro,noload` avoids that write. Skipping recovery may expose an inconsistent view after power loss, so interpret errors/missing files cautiously. Exact commands follow the actual distro/device and applicable approval.
- Capture logs privately and sanitize before displaying. Never commit raw cloud-init/network configuration, passwords, hashes or tokens. Do not run fsck, format or reflash as a speculative fix.

## Files to read

1. [AGENTS.md](../AGENTS.md): active permissions, phase gates, beginner explanations.
2. [PROJECT.md](../PROJECT.md): product scope, inventory and sourcing decisions.
3. [PROGRESS.md](../PROGRESS.md): current checkpoint plus completed history; later explicit decisions supersede older dated entries.
4. [READ_STARTUP_LOGS_LINUX.md](READ_STARTUP_LOGS_LINUX.md): immediate diagnostic path.
5. [CARD_INSPECTION.md](CARD_INSPECTION.md), [TESTING.md](TESTING.md): evidence/limits rather than assumptions.
6. [BUILD_PROTOTYPE.md](BUILD_PROTOTYPE.md): complete saved instructions/history; early steps are already completed, not current tasks.
7. [Immutable session snapshot](handoffs/pi-startup-logs-linux.md): compact session handoff.
8. [tools/README.md](../tools/README.md): Windows-only helper limits; do not run them on Linux or automatically rerun card changes.

There is no smoke-detector application, tested sensor wiring, confirmed prototype, final assembly or validated detection performance. Phase3 remains gated on prototype success.

## Procurement and workbook continuity

The current workbook is `outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx` (BOM Summary, Review Notes, Physical Store; 41 recorded store hyperlinks). It is unchanged in this session. Do not regenerate it from the archived builder.

Saved purchase-plan reference: TableA PHP20,864; priced TableB PHP1,155; known sum PHP22,019 plus B01 printing TBD. These are not actual spending/remaining-to-buy totals. Reconcile A02 ownership/possible endurance replacement and obsolete A12 PHP39 plug allowance together in Markdown/workbook later. No round-to-flat adapter is needed for the actual HU flat-pin supply if it fits normally.

Preserve camera uncertainty, MQ-2/ADS1115+divider design, untested fan/heatsink contents/current, external UPS requirement, owned finishing materials, printed-enclosure cost TBD, B03/B04/B08 sizing, B06 reuse and B10/B11 sourcing. See [BOM.md](BOM.md)/[BOM_REVIEW.md](BOM_REVIEW.md) instead of repeating the whole sourcing discussion.

## Git transfer

First clone:

```sh
git clone https://github.com/hanssantos02/cctv-smoke-detector.git
cd cctv-smoke-detector
git status
git log -3 --oneline
```

Existing checkout:

```sh
git status
git pull --ff-only origin main
```

Preserve local changes and ask for help on conflict/divergence. Do not use reset --hard or force push. Each computer needs its own authorized GitHub access for pushes; credentials/private keys are not transferred by this repo. Existing Windows absolute paths and installed tools do not transfer.

Only source/docs, original PDFs and the current workbook belong in the checkpoint. Installers, dependency trees, local screenshots/attachments, private card backups and raw logs are ignored. Chat and actual hardware state are not recreated by Git; relevant outcomes are preserved here. Use Git history for the checkpoint commit identity.
