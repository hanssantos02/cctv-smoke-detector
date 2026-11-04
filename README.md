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

Ask the next assistant:

> Read AGENTS.md, PROJECT.md, PROGRESS.md and docs/CONTINUE_ON_ANOTHER_PC.md. We are in Phase 2, Step 19: initial Pi setup is authorized, but boot/network access is still unverified. Resume the Linux-laptop startup-log investigation. First obtain the laptop distribution/version with cat /etc/os-release and confirm the hardware's current power/card location. Do not restart BOM sourcing, rewrite the card, install packages or run sudo without the applicable approval.

## Current state — 2026-11-05, Asia/Manila

- **Phase 2: initial Pi setup and diagnosis.** Full detector prototyping is unfinished; Phase 3 is not authorized.
- Hardware identified: Pi 4 Model B (4GB per user), Raspberry Pi-labelled KSA-15E-051300HU USB-C supply (5.1V/3A, flat pins), Silvertec 32GB microSDHC, and a USB reader.
- User-operated Raspberry Pi Imager **2.0.12** reported a completed Raspberry Pi OS **64-bit** write with hostname, account, Wi-Fi and SSH customisations. Logs/OS identity have not yet been inspected on the running Pi.
- Hostname **sentrion-pi**, username **sentrion**. Passwords are private and absent from Git.
- Original 5GHz setup was unreachable. An approved **2.4GHz trial** changed the card's network target and refreshed matching cloud-init instance IDs without erasing the OS. Password/account settings were preserved and modified files read back successfully.
- User confirmed the card returned to the Pi and a powered retry of at least five minutes. Green activity subsequently went dark; that alone does not establish a boot failure. **No successful SSH login, Pi IP or Wi-Fi association is confirmed.**
- The last reported state is **Pi powered, microSD seated**, with sensors/camera/GPIO circuits disconnected for this check. Reconfirm physical state on resuming; it does not transfer with Git.
- Next: identify the user's **Linux laptop distribution/version**, then plan read-only ext4 access to startup logs. No commands or installs have been run on that laptop. Windows Linux Reader was downloaded but **not installed**; that alternative is deferred.
- No smoke-detector application, sensor wiring, detection validation or complete prototype exists yet.

Start with [the current handoff](docs/CONTINUE_ON_ANOTHER_PC.md), not an earlier dated checkpoint in the history.

## Saved work

| File | What to read there |
| --- | --- |
| [Project rules](AGENTS.md) | Beginner guidance, phase gates, physical confirmations and installation/sudo/card-write permissions |
| [Project brief](PROJECT.md) | Scope, identified hardware, inventory and unresolved procurement |
| [Progress](PROGRESS.md) | Current action and complete dated troubleshooting history |
| [Current handoff](docs/CONTINUE_ON_ANOTHER_PC.md) | Cross-platform context, permissions and exact next checkpoint |
| [Session snapshot](docs/handoffs/pi-startup-logs-linux.md) | Immutable account of this troubleshooting session |
| [Linux log plan](docs/READ_STARTUP_LOGS_LINUX.md) | Distribution-first approach, read-only mounting and log targets |
| [Prototype guide](docs/BUILD_PROTOTYPE.md) | Saved instructions and observed outcomes through Step 19 |
| [Card inspection](docs/CARD_INSPECTION.md) | What was actually read, denied Linux access and approved card changes |
| [Testing log](docs/TESTING.md) | Verified results versus unresolved boot/connectivity |
| [Windows alternative](docs/READ_STARTUP_LOGS_WINDOWS.md) | Deferred signed-reader proposal; installation not approved |
| [BOM](docs/BOM.md), [review](docs/BOM_REVIEW.md) | Buying decisions, dated price evidence and remaining compatibility checks |
| [Excel BOM](outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx) | Existing workbook, formulas and clickable source links; unchanged in this session |
| [Authoring archive](archive/bom-authoring/README.md) | Historical tooling; never regenerate the current workbook from the initial builder |

The original materials/specification PDFs remain preserved unchanged. Temporary photos/screenshots, installer binaries, raw logs, dependencies and private on-card backups are excluded. Their relevant findings are transcribed in the documents.

The saved budget remains a **purchase-plan reference**: Table A PHP20,864; priced Table B PHP1,155; known sum PHP22,019 plus printing TBD. It has not been reconciled to current ownership. The existing Silvertec card is being used; the actual flat-pin supply does not need the old round-to-flat adapter if it fits the socket. Do not buy duplicates from unreconciled historical allowances.

This is a research prototype; detection performance and safety certification have not been established. Retain independent certified smoke alarms.
