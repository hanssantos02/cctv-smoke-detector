# cctv-smoke-detector

Sentrion SDS200: an indoor Raspberry Pi 4 camera-based smoke-detection research project, with an MQ-2 sensor, local alarms and planned battery backup.

## Resume on another device

For a first checkout (Git must already be installed):

```sh
git clone https://github.com/hanssantos02/cctv-smoke-detector.git
cd cctv-smoke-detector
```

For an existing checkout, check local edits before updating:

```sh
git status
git pull --ff-only origin main
```

Preserve local edits if Git reports a conflict; do not reset or force-push.

Start the new chat with:

```text
$ce-handoff resume docs/handoffs/pi-prototype-powered-off.md
```

The new chat should read [AGENTS.md](AGENTS.md), [PROJECT.md](PROJECT.md), [PROGRESS.md](PROGRESS.md) and [the current continuation guide](docs/CONTINUE_ON_ANOTHER_PC.md). The older Linux-startup handoff is historical; do not restart its completed diagnostics.

## Current state — 2026-11-06, Asia/Manila

- **Phase2, Step45 complete:** user shut down through the Pi desktop, then confirmed power unplugged. Pi is in its case with fan attached; microSD remains seated as last reported. No power-on is needed merely to resume the chat.
- **Pi setup passed:** Pi4 ModelB Rev1.5,3.7Gi usable RAM; Debian13 Trixie/13.7 metadata,aarch64,Asia/Manila clock synchronized,root21G free. Supply label5.1V/3A with flat pins;Silvertec32GB card. Laptop is Linux Mint22.3.
- **New router and SSH passed:** saved Wi-Fi updated with a private on-card backup. Hostname `sentrion-pi.local`,account `sentrion`,last observed address `192.168.100.211` (can change). No reason to repeat card edits or old discovery scans. Earlier router failure remains undiagnosed.
- **Camera basic tests passed:** USB349c:3307,uvcvideo;video0 capture/video1 metadata. VGA stream~25.3fps (30requested),actual2560×1440 JPEG decoded/viewed,short1440p stream~15.1fps (20requested),exit0,throttled0x0,38.9C. Native sensor resolution,current and long-run reliability remain unverified.
- **Desktop access passed per user:** WayVNC on Pi and TigerVNC laptop viewer path worked. After a later boot,launch `vncviewer sentrion-pi.local` on the laptop. Do not reinstall or enable autologin without new evidence.
- **Next hardware checkpoint is Step42, deferred:** delivered MQ-family module has fitted pins; ADS1115-marked board includes a loose straight header. Header dry-fit/soldering and electrical tests are unfinished. Fan spinning is user-confirmed;its actual power pins/rating must be identified before GPIO allocation. No sensor wiring,detector application,complete prototype or Phase3 approval.
- This source checkpoint is intended for `main` at the user's request. Git history and `origin/main` identify publication. Photos/raw logs/private backups remain local and excluded;sanitized observations needed for continuity are saved.

## Saved work

| File | What to read there |
| --- | --- |
| [Project rules](AGENTS.md) | Beginner guidance, phase gates, physical confirmations and installation/sudo/card-write permissions |
| [Project brief](PROJECT.md) | Scope, identified hardware, inventory and unresolved procurement |
| [Progress](PROGRESS.md) | Current action and complete dated troubleshooting history |
| [Current handoff](docs/CONTINUE_ON_ANOTHER_PC.md) | Cross-platform context, permissions and exact next checkpoint |
| [Current session snapshot](docs/handoffs/pi-prototype-powered-off.md) | Powered-off state, verified milestones and exact deferred hardware checkpoint |
| [Earlier snapshot](docs/handoffs/pi-startup-logs-linux.md) | Historical Windows investigation before Linux/new-router success |
| [Linux log plan](docs/READ_STARTUP_LOGS_LINUX.md) | Distribution-first approach, read-only mounting and log targets |
| [Prototype guide](docs/BUILD_PROTOTYPE.md) | Initial setup history and current continuation |
| [New-router setup and checks](docs/CHANGE_WIFI_LINUX.md) | Wi-Fi update,safe transfer,SSH login,initial health/OS/time/storage results and next readiness checkpoint |
| [Camera checks](docs/CAMERA_CHECK.md), [connections](docs/WIRING.md) | Actual webcam identity,advertised modes,decoded images,achieved rates and remaining limits |
| [Desktop access](docs/REMOTE_DESKTOP_LINUX.md) | Working VNC setup, terminal roles and safe shutdown |
| [Card inspection](docs/CARD_INSPECTION.md) | What was actually read, denied Linux access and approved card changes |
| [Testing log](docs/TESTING.md) | Passed initial setup checks and untested detector components |
| [Windows alternative](docs/READ_STARTUP_LOGS_WINDOWS.md) | Deferred signed-reader proposal; installation not approved |
| [BOM](docs/BOM.md), [review](docs/BOM_REVIEW.md) | Buying decisions, dated price evidence and remaining compatibility checks |
| [Excel BOM](outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx) | Existing workbook, formulas and clickable source links; unchanged in this session |
| [Authoring archive](archive/bom-authoring/README.md) | Historical tooling; never regenerate the current workbook from the initial builder |

The original materials/specification PDFs remain preserved unchanged. Temporary photos/screenshots, installer binaries, raw logs, dependencies and private on-card backups are excluded. Their relevant findings are transcribed in the documents.

The saved budget remains a **purchase-plan reference**: Table A PHP20,864; priced Table B PHP1,155; known sum PHP22,019 plus printing TBD. It has not been reconciled to current ownership. The existing Silvertec card is being used; the actual flat-pin supply does not need the old round-to-flat adapter if it fits the socket. Do not buy duplicates from unreconciled historical allowances.

This is a research prototype; detection performance and safety certification have not been established. Retain independent certified smoke alarms.
