---
artifact_contract: "ce-handoff/v1"
created_at: "2026-11-06T05:08:34Z"
title: "Pi powered off after working Wi-Fi, camera and desktop access"
summary: "Phase2 Step45 unplugged; ADS1115 header preparation and soldering remain deferred at Step42."
keywords: ["raspberry-pi", "phase2", "powered-off", "ADS1115", "soldering", "VNC"]
cwd: "/home/hans/repos/cctv-smoke-detector"
resume_focus: "Resume the unfinished ADS1115 header preparation when the user is ready."
repository: "hanssantos02/cctv-smoke-detector"
branch: "main"
head: "4577265"
worktree_path: "/home/hans/repos/cctv-smoke-detector"
---

# Pi prototype checkpoint — 2026-11-06, Asia/Manila

The captured HEAD above is the base before this user-requested checkpoint. The commit containing this file identifies the saved checkpoint; compare it with origin/main to verify publication. This snapshot is intended to be committed to the repository and retained with its history, not left in temporary managed storage.

## User intent and stopping state

The user explicitly confirmed Pi power **unplugged after desktop shutdown**, deferred soldering, and requested all progress pushed to **main** so a new chat can continue. Pi is already installed in its case with fan connected; microSD remains seated as last reported. Fan spinning was confirmed while powered. All-lights-off was not separately reported. No more hardware action is needed for saving this checkpoint.

Phase2 remains active. Step45 shutdown/power removal is complete as a user report. Step42 ADC header fit/soldering is unfinished; no successful solder joint, sensor wiring or ADC/sensor electrical test is claimed. Full prototype success and Phase3 approval have not been given.

## Authoritative references

- `AGENTS.md`: beginner-first explanations, phase/step prefix, physical-result checkpoints and current permission requirements. Its old model/runtime note is historical.
- `PROGRESS.md`: current phase/next action and completed entries87–121 cover this Linux session; later explicit outcomes supersede earlier dated pending statements.
- `docs/CONTINUE_ON_ANOTHER_PC.md`: concise current inventory, completed evidence, how to reconnect after a later boot, privacy and workbook constraints.
- `docs/BUILD_PROTOTYPE.md`, Step42: unfinished dry-fit orientation and inspection before soldering. Step41 received photos, not functional tests.
- `docs/WIRING.md`: visible module labels and installed cables. Existing fan pins/rating are unknown; no sensor-to-Pi pin assignment exists.
- `docs/CAMERA_CHECK.md`: USB identity, actual frame rates, decoded-image results and limitations.
- `docs/REMOTE_DESKTOP_LINUX.md`: VNC setup path, user-reported working desktop and shutdown result. No autologin or router forwarding was needed in the guide.
- `docs/READ_STARTUP_LOGS_LINUX.md` and `docs/CHANGE_WIFI_LINUX.md`: completed offline inspection/new-router actions. Historical mount/device commands are not resume tasks.
- `tools/README.md`: exact historical scope of Python/Linux versus PowerShell/Windows helpers; card-write helper defaults to preview and has private local confirmation.

## Verified milestones

| Area | Evidence and limit |
| --- | --- |
| Linux laptop | Linux Mint22.3 Zena,Ubuntu noble base |
| Pi | Pi4 ModelB Rev1.5,3.7Gi usable RAM consistent with4GB;Debian13 Trixie/13.7 metadata,aarch64,kernel6.18.50+rpt-rpi-v8 |
| Supply/card | Label KSA-15E-051300HU,5.1V/3A,flat pins;Silvertec32GB microSDHC. Authenticity/full load/endurance unverified |
| New-router setup | User chose laptop's current Wi-Fi;offline installed-profile update backed up/read back and restored read-only mount;safe card return followed |
| Live access | Authenticated SSH as sentrion@sentrion-pi.local,last IPv4 192.168.100.211,lease can change |
| Initial health | Idle38.4C,throttled0x0;Asia/Manila clock synchronized/NTP active;root21G and boot417M available |
| Camera | Generic enclosed USB webcam,349c:3307,uvcvideo,v4l2-ctl1.30.1;video0 capture/video1 metadata |
| Actual captures | VGA stream~25.3fps with30requested;JPEG2560×1440 RGB104216bytes decoded/viewed;short1440p MJPG stream~15.1fps with20requested,exit0,38.9C/throttled0x0 |
| Desktop | Pi wayvnc0.10.2-1+rpt1/raspi-config20261026 observed;TigerVNC viewer path worked per user. Exact post-install laptop version not audited |
| Shutdown | User selected desktop Shut Down,VNC connection reset104 appeared,then user confirmed unplugging |

No achieved20/30fps,native sensor detail,measured USB current,long-run stability or smoke-detection performance is established. Raw image quality showed some washed-out highlights. No repeated unchanged camera tests are currently needed.

## Delivered boards and next plausible work

User photos show an MQ-family Flying-Fish/MQ Sensor module with fitted VCC/GND/DO/AO header. Exact MQ-2 marking on the can is unreadable. The other board is printed ADS1115/16Bit I2C ADC+PGA and came with a **loose** straight header;labels VDD/GND/SCL/SDA/ADDR/ALRT/A0/A1/A2/A3. Board print is not proof of chip identity/function.

When the user is ready to resume hardware work, the existing Step42 checkpoint is reversible unpowered dry-fit: inspect ADC underside/ten-hole header, long ends into unpowered breadboard, board lettering/components up over short ends. Top/side/underside orientation and tool readiness were requested but not yet confirmed. User owns soldering equipment, but iron/solder/stand/multimeter readiness is not established. Soldering teaching and joint verification come after that checkpoint. Do not connect unsoldered contacts as an electrical shortcut.

Before allocating Pi GPIO connections, inspect the existing fan's actual power pins/rating and case access. No new fan or duplicate module purchase was requested. MQ sensor/divider/ADC/LED/buzzer/button wiring and detector software have not started. Keep Pi unplugged until needed; later reconnect using the already working SSH/VNC path after normal boot. Runtime camera format is not assumed persistent across shutdown.

## Abandoned assumptions and local-only state

The old Windows/router discovery failed, but Linux logs later proved setup completion. Saved WirelessEnabled=true,Netplan credentials existed and NetworkManager renderer was supplied by defaults. Missing cc_netplan_nm_patch warning matched an upstream report;its causal role was unproven. Earlier router failure remains undiagnosed. Do not restart old scans,reflash,change country/security or declare5GHz unsupported merely to resume.

Historical Windows card edit and Linux Wi-Fi update are complete. Never rerun helpers just because they exist. `/dev/sda` and absolute mount paths described an inspected past reader connection,not a currently connected card. Private original configurations remain in on-card backups;boot seed/account/SSH/instance IDs were not changed by the Linux helper. Explicit future reprovisioning could regenerate old seed settings.

Machine-local ignored images were `/home/hans/repos/cctv-smoke-detector/tmp/camera-test.jpg` and `/home/hans/repos/cctv-smoke-detector/tmp/camera-1440p.jpg`. They and `.codex-attachments/` do not transfer through Git. Sanitized findings above are sufficient for orientation; never publish private configuration/raw logs or credentials. No stored passwords are needed to resume the chat.

The workbook `outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx` and original PDFs are unchanged. Do not regenerate from archived scripts. Reference TableA PHP20,864,priced TableB PHP1,155,known sum PHP22,019 plus printing TBD is not reconciled spending. See BOM/PROGRESS for ownership,obsolete plug allowance,camera/fan identity,UPS and remaining procurement checks. Do not restart sourcing or buy duplicates from old allowances.

## Receiving-session boundary

This is a status snapshot,not blanket authority to power,wire,solder,install,flash or rerun sudo/card actions. Current user instructions and verified hardware state govern the next action. Resume orientation from this file and the authoritative references before continuing the user's deferred work.
