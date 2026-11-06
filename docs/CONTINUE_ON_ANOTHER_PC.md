# Continue on another PC

## Current checkpoint — 2026-11-06, Asia/Manila

**Phase2, Step45 complete. Pi power is unplugged per user after desktop shutdown.** The Pi is already in its case with a fan; microSD remains seated as last reported. Fan spinning was confirmed while powered. All-lights-off was not separately reported; do not invent that measurement. The user's latest request is to save all progress to `main` so a new chat can continue. Soldering is deferred, not completed.

Resume snapshot: [pi-prototype-powered-off.md](handoffs/pi-prototype-powered-off.md). The older [Linux-startup snapshot](handoffs/pi-startup-logs-linux.md) preserves November5 history and is superseded for current state.

## Load these first

| File | What matters |
| --- | --- |
| [AGENTS.md](../AGENTS.md) | Begin replies with phase/step; beginner explanations; phase gates; permission and physical-result rules |
| [PROJECT.md](../PROJECT.md) | Sentrion SDS200 scope and dated material decisions |
| [PROGRESS.md](../PROGRESS.md) | Latest state, completed entries87–121 and procurement backlog; dated pending statements are history |
| [BUILD_PROTOTYPE.md](BUILD_PROTOTYPE.md), Step42 | Header dry-fit orientation and inspection checkpoint; not yet confirmed or soldered |
| [WIRING.md](WIRING.md) | Delivered module labels, installed cables/fan uncertainty; no sensor-to-Pi pin assignment yet |
| [TESTING.md](TESTING.md) | Passed checks and untested detector components |
| [tools/README.md](../tools/README.md) | Historical card-helper scope; never rerun a card write to resume |

## Next hardware work, when the user is ready

Step41 photos are complete: MQ-family board has a fitted four-pin right-angle header, underside labels VCC/GND/DO/AO with the connector pointing right. Exact MQ-2 marking on the can is unreadable. The bagged converter board says ADS1115/16Bit I2C ADC+PGA; its straight header is loose. Labels run VDD/GND/SCL/SDA/ADDR/ALRT/A0/A1/A2/A3. Board markings do not prove chip identity or function.

**Step42 is unfinished:** unwrap the ADC,inspect its underside and ten-hole/header fit,then dry-fit on an unpowered breadboard with long header ends down and board lettering/components up over short ends. Inspect top/side/underside and confirm available tools before teaching soldering. User owns soldering equipment;iron/solder/stand/multimeter readiness was requested but not confirmed. No joint or board voltage has been tested. Keep loose modules unpowered.

Before allocating GPIO pins,identify the already connected fan's actual power pins/rating and case access. Do not infer all GPIO pins are unused or install/buy another fan. Never change wiring while powered. No MQ-2/ADS1115/LED/buzzer/button circuit or detector application exists. Phase3 is not authorized.

## Completed setup and how to reconnect later

- Pi4 ModelB Rev1.5,4GB consistent with3.7Gi usable RAM. Inspected Raspberry Pi-branded KSA-15E-051300HU supply5.1V/3A,flat pins;authenticity/full-load regulation unverified. Silvertec32GB microSDHC;endurance/real capacity unverified.
- Linux Mint22.3 (Zena),Ubuntu noble base. Native read-only log inspection and new-router update completed. The card is now in the Pi,not a laptop mount. Historical `/dev/sda` names must be reidentified for any future card work.
- New-router Wi-Fi works;user chose the laptop's current network. Hostname `sentrion-pi.local`,username `sentrion`,last IPv4 `192.168.100.211` (lease can change). Credentials were entered locally and are absent from Git. No fresh card rewrite is needed.
- User SSH login succeeded. Later,after the user powers Pi normally and allows boot,use `ssh sentrion@sentrion-pi.local` from the laptop. Do not bypass a changed host key. The current unplugged Pi will not answer.
- Running metadata: Debian13 Trixie,DEBIAN_VERSION_FULL13.7,kernel6.18.50+rpt-rpi-v8,aarch64. Asia/Manila clock synchronized,NTP active. Root21G free;boot417M free. Initial38.4C/throttled0x0.
- Desktop access worked per user after enabling installed WayVNC and using TigerVNC on the laptop. Pi observed versions:wayvnc0.10.2-1+rpt1,raspi-config20261026. Read-only checkpoint audit confirms laptop tigervnc-viewer1.13.1+dfsg-2build2 installed (both FLTK libraries1.3.8-6.1build2). Launch `vncviewer sentrion-pi.local` on the laptop after a later boot. Pi credentials are entered privately;no new account/autologin/router forwarding was required by the guide. See [REMOTE_DESKTOP_LINUX.md](REMOTE_DESKTOP_LINUX.md).
- Shutdown through the Pi desktop caused TigerVNC connection reset104;consistent with service shutdown. User subsequently confirmed unplugging. Closing a viewer alone is not shutdown. No hardware action is needed for this Git checkpoint.

## Camera evidence and limits

[CAMERA_CHECK.md](CAMERA_CHECK.md) holds exact commands,advertised format table and per-step findings. Delivered enclosed generic webcam has USB-A/clip and2K front marking,USB349c:3307 Generic HD video,uvcvideo,v4l2-ctl1.30.1. Video0 captures images;video1 is metadata.

| Verified test | Result |
| --- | --- |
| VGA MJPG stream | 640×480,30fps requested,~25.3fps reported,exit0,38.4C/throttled0x0 |
| VGA image | JPEG640×480 RGB,full decode/view PASS |
| Higher image | JPEG2560×1440 RGB,104216bytes,full decode/view PASS;recognizable scene/readable box lettering,some washed-out highlights |
| Short higher-mode stream | 2560×1440 MJPG,20fps requested,~15.1fps reported,exit0,38.9C/throttled0x0 |

Last requested camera mode before shutdown was1440p MJPG20fps;runtime settings are not assumed to survive power loss. Do not claim20/30fps was achieved,native sensor resolution,measured USB draw,controlled image quality or long-run reliability. No smoke-detection performance has been validated. Avoid unchanged snapshot loops or buying a duplicate camera from old BOM allowances.

Images were local ignored `tmp/camera-test.jpg` and `tmp/camera-1440p.jpg`;they do not transfer through Git. Their verified findings are saved. Request a new image only if the next task needs visual evidence.

## Offline investigation: completed history

[READ_STARTUP_LOGS_LINUX.md](READ_STARTUP_LOGS_LINUX.md) records the desktop's prior rw automount,subsequent ro/noload mount and cloud-init findings. Two setup runs completed;latest zero fatal errors with missing cc_netplan_nm_patch warning. Early Wi-Fi down/no-IP snapshots did not reveal later failure cause;no persistent journal was available. Saved wireless switch was true,profile/password existed and NetworkManager renderer was supplied by system defaults. Original router failure remains undiagnosed;do not revive radio-disabled,5GHz-incompatible or failed-boot conclusions without evidence.

[CHANGE_WIFI_LINUX.md](CHANGE_WIFI_LINUX.md) records the completed installed-profile update,backup/readback,read-only restoration,safe card return and live login. `change_pi_wifi.py` defaults to preview and requires local hidden password entry and YES for writes. It is scoped to that inspected reader/card,not general-purpose provisioning. Boot seed/account/SSH/instance IDs were unchanged;explicit future reprovisioning can regenerate old seed settings. Never rerun to resume. Private backups stay on card,out of Git. Historical Windows helpers are Windows-only;Windows Linux Reader was never installed.

## Scope, budget and permissions

The prototype scope remains camera+MQ-2/ADS1115/divider,local alarms,Wi-Fi logging/snapshots and external packaged UPS. Initial Pi setup was explicitly authorized;full BOM approval,complete prototype success and Phase3 were not given. User selected desktop setup and then chose to stop hardware work for now. Do not infer authorization to solder,flash,install,run sudo or rewire merely from this handoff. Apply current user instructions and inspect real state before a new action.

[The workbook](../outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx) is authoritative and unchanged. Never regenerate it from archived builder scripts. Reference budget:TableA PHP20,864;priced TableB PHP1,155;known sum PHP22,019 plus enclosure printing TBD. These are historical purchase-plan totals,not reconciled actual spending. A02 card ownership/endurance,A12 obsolete PHP39 plug allowance,and actual camera/fan receipt costs need coordinated later Markdown/workbook reconciliation. No duplicate card,adapter,fan or module purchase is requested. Other procurement limits are in PROGRESS.md/BOM.md.

## Git transfer and privacy

For an existing checkout:

```sh
git status
git pull --ff-only origin main
```

Preserve local edits;never reset or force-push to solve divergence. Fresh checkout instructions are in README.md. Use the containing commit and `origin/main` for checkpoint identity/publication;no credentials/private keys transfer with Git. The user explicitly requested this checkpoint on main.

Raw attachments/photos/logs,temporary renders,dependencies and private on-card setup backups are ignored. Sanitized findings,source helpers and guides belong in Git;the original PDFs/workbook remain unchanged. Machine-local absolute image/output paths are not portable. A new chat gets continuity from these files rather than access to the old chat or hardware.
