# Prototype testing log

PHASE2 checkpoint2026-11-06: initial Pi setup,basic camera and user-reported VNC access passed. Step45 power removal is confirmed after desktop shutdown. Step42 header fit/soldering is deferred;no sensor/ADC electrical test or full prototype claim. Earlier dated pending statements below are history.

## Recorded session checks — 2026-11-06

| Check | Observed result | Status / limit |
| --- | --- | --- |
| Physical state at card inspection | User confirmed Pi off/card connected to Linux Mint22.3 laptop | Card later returned;Pi now unplugged after desktop shutdown per user |
| Read-only mount | User-run unmount/mount succeeded;independent findmnt shows rootfs ro,relatime,norecovery at project tmp/pi-rootfs | PASS for that inspected mount,not a currently connected card;desktop previously mounted card rw,so no claim of read-only handling since insertion |
| Linux startup reached cloud-init | Two saved cloud-init completion records;latest stage status zero fatal errors | PASS for recorded cloud-init execution;does not certify all services/hardware |
| Setup warning | Missing cc_netplan_nm_patch;matching upstream issue45 | Recoverable warning;connectivity cause unproven |
| Startup network snapshot | eth0/wlan0 down/noIPv4 in both early cloud-init network tables | Early state only;later association/authentication unknown |
| SSH configuration | Server installed,enablement symlink present | Disk configuration PASS;new-router live listener and authenticated login later PASS |
| Saved journal | No journal files/boots;no syslog/daemon.log/kern.log | Later service-log evidence UNAVAILABLE |
| NetworkManager saved Wi-Fi switch | User screenshot shows WirelessEnabled=true;no NetworkingEnabled line printed | Saved Wi-Fi enabled;association/global networking state unconfirmed |
| Protected Netplan profiles | User-run helper:one wlan0/AP,DHCP IPv4,name/password present,plausible WPA password format;second file has no Wi-Fi definitions | Configuration presence PASS;this offline summary did not authenticate;later new-router login passed |
| Default network handling | System default renderer NetworkManager,service enabled,Netplan generator present | Per-file omitted renderer is not by itself a defect;runtime unverified |
| New laptop connection | Wi-Fi connected on5GHz/channel48/5240MHz;user confirms this is a different router and desired new Pi target | Old same2.4GHz suggestion superseded;installed profile subsequently changed and tested |
| New-router update | User-run apply reports backup/profile replacement/readback PASS;independently verified rootfs restored ro,norecovery | On-disk update PASS;safe removal/card return completed. New-router listener/login now PASS;initial health later passed |
| New-router power-on | User reports red on,green blinked then off | Physical power/activity reported;use live checks for startup evidence |
| New-router hostname/SSH listener | sentrion-pi.local resolves192.168.100.211;TCP22 accepts,OpenSSH banner received | PASS2026-11-06. Authentication later passed |
| First authenticated SSH login | Screenshot shows sentrion@sentrion-pi prompt after password login;running kernel6.18.50+rpt-rpi-v8,aarch64 | PASS2026-11-06 |
| Live board/RAM/temperature/power flags | Pi4 ModelB Rev1.5;Mem3.7Gi total/3.4Gi available;38.4C;throttled=0x0 | Initial idle checks PASS;camera-loaded short checks later passed,full-load/long-run reliability untested |
| Running OS/clock/storage | Debian13 Trixie,13.7 metadata;Asia/Manila+0800,clock synchronized/NTP active;root21G available,boot417M available | PASS2026-11-06 |
| Initial Pi setup milestone | New-router boot/authenticated SSH and initial idle/model/RAM/OS/time/storage checks pass | Complete for initial Pi setup only;camera identity/basic tests later passed |
| USB camera readiness | Photo shows generic WEBCAM/2K QUAD HD,clip and USB-A plug;no model/power label | USB/UVC enumeration subsequently PASS:349c:3307,uvcvideo,video0/video1 camera links,v4l2-ctl installed. Capabilities now confirmed:video0 image capture,video1 metadata,v4l2-ctl1.30.1;MJPG up to2560x1440 advertised. First640x480 MJPG stream completed:exit0,observed~25.3fps,flags0x0,temp38.4C. VGA and1440p images subsequently decoded/viewed;native resolution unverified |
| Camera initial frame transport |640x480 MJPG,30fps requested;~25.3fps reported,exit0;post-stream38.4C/throttled0x0 | PASS for frame arrival;30fps and decoded image content not established. Subsequent VGA snapshot decoded/viewed successfully. Higher-resolution image and short stream subsequently passed |
| Camera VGA snapshots | Latest16068bytes at12:23:00,640x480 RGB,full decode PASS;wider scene has recognizable distant edges,bright box washed out | Basic capture PASS;fine detail/exposure uncalibrated. Subsequent1440p still also passed;Short higher-mode stream subsequently passed |
| Camera1440p still | Local ignored JPEG104216bytes,2560x1440 RGB,full decode PASS;box lettering readable,bright highlights washed out | Actual1440p output PASS. Native sensor/sustained FPS unproven. Short higher-mode stream subsequently passed at~15.1fps,exit0,flags0x0/38.9C |
| Camera1440p short stream | Requested20fps, reported15.28 initially then~15.1fps;exit0,throttled0x0,temp38.9C | Short frame delivery PASS;20fps and long-run stability not demonstrated |
| Existing case/fan | Pi installed in case with fan connected and spinning per user | Operation user-confirmed; exact power pins/rating remain unverified. No pin allocation based on assumed fan wiring. |
| Delivered sensor/ADC | MQ-family board has fitted VCC/GND/DO/AO header; ADS1115-marked board includes loose header | Visual presence PASS; exact chips/function/voltages unverified. Step42 unpowered header-fit inspection pending. |
| Remote desktop prerequisites | Pi wayvnc0.10.2-1+rpt1 installed, disabled/inactive;graphical.target;labwc-greeter running | Step43 inspection complete. User subsequently reports desktop access working;checkpoint dpkg audit confirms laptop viewer1.13.1+dfsg-2build2. |
| VNC desktop access | User reports it is working after Step44 instructions | PASS,user-reported. Laptop viewer1.13.1+dfsg-2build2 independently verified installed;live Pi service state not audited. Step45 user subsequently confirmed unplugging after desktop shutdown. |
| Shutdown and power removal | User selected desktop Shut Down,received VNC reset104,then confirmed unplugged | Step45 complete,user-reported. All-light-off was not separately measured;no further hardware action required for checkpoint. |

## Earlier checks and dated history

| Check | Expected result | Observed result | Status / next action |
| --- | --- | --- | --- |
| Imager writes intended removable card | Write complete, correct device/OS, safe ejection | v2.0.12 Done screenshot shows Pi4, OS64-bit, Mass Storage Device USB Device, customisations including Wi-Fi/SSH, automatically ejected | Write PASS. Verification-not-skipped not independently described; do not assert full card reliability |
| Card insertion | Card seated in unpowered Pi without force | User reports yes,connected | User-confirmed seating |
| First power/activity | Red power indication, green startup activity; no electrical fault | User reports red on, green flickering periodically | Power/activity observed; OS boot not established |
| Local name discovery | sentrion-pi.local resolves to reachable Pi address | Windows lookup fails; direct and standard5353 mDNS return no replies after additional startup time | Configured Wi-Fi name matches per user; actual association unknown. Router admin unavailable; choose Ethernet/display route |
| SSH discovery | Port22 reachable on intended Pi | No listener in initial bounded subnet check or later known-neighbor probes | Unresolved; no login attempted. Ask Ethernet cable/port availability; monitor owned but Pi-compatible cable absent |
| First login / OS identity / RAM / time / temperature / power health | Successful login and actual system evidence | Not run | Pending network discovery and correct username |
| Camera / ADC / MQ-2 / LEDs / buzzer / buttons / UPS | Individual tests before integration | Not built or tested | Deferred; do not connect unverified circuitry |

Follow [BUILD_PROTOTYPE.md](BUILD_PROTOTYPE.md), Step14, for the current network checkpoint. Record new observations before trying another fix. Avoid blind image rewrites or repeated power-cycling. Keep all passwords out of this log and screenshots.

Latest diagnostic resources: router admin unavailable; same configured Wi-Fi confirmed; Ethernet cable not owned; monitor owned but no Pi-compatible display cable. Await monitor input/model before selecting a cable and observing boot output. No additional display test run yet.

2026-11-05 retry at user request: current subnet reconfirmed; both hostname forms unresolved. Ping/SSH22 discovery found8ping-responsive addresses and no SSH listener. IEEE MA-L lookup of known-neighbor prefixes did not identify Pi, with randomized-address limitations. No login, configuration change or rewrite. Next confirm current Pi power state before selecting next diagnostic; do not infer failed boot solely from discovery results.

2026-11-05 follow-up: current power confirmed; user reports green off then faint light, color unclear. Await close-up/color identification; no brightness-based fault diagnosis. Retained Imager settings checked read-only: hostname/account/auth choices match instructions and saved Wi-Fi SSID exactly matches Windows SSID. Secrets not displayed/persisted. This does not validate actual Pi boot/association; no new scan or physical change.

2026-11-05 LED photo: red illumination visible; green not discernible through case. No boot/voltage diagnosis from static exposure. Prepared existing-reader read-only boot-partition inspection; awaiting agreement for required power-off (clean shutdown unavailable, corruption risk), then separate physical confirmations. No power cut, removal or inspection yet.

2026-11-05 steering: user initially approved inspection then said wait before power-off because router page is now open. No physical removal/power-cut result. Await router screenshot; direct Computer Use stopped by unsupported browser URL-policy enforcement. Pi4 dual-band capability verified from manufacturer; PC observed5GHz channel149,WPA2-Personal/CCMP. Not proof of Pi connection or failed5GHz compatibility. No router/card changes.

2026-11-05 router list: all4 User Device Information pages reviewed; no sentrion-pi identity. Windows PC positively matches Hans192.168.1.48. Unnamed online192.168.1.128 actively refuses TCP22; no login attempted and identity unknown. Next inspect observed DHCP Information page for lease evidence. No router configuration, power or card changes.

2026-11-05 DHCP result:14Wi-Fi leases,239addresses remaining,no Pi identity. No evidence of exhausted address pool or confirmed hardware fault. Router review complete; resume approved read-only card check,starting with wall-power disconnection/all-LEDs-off confirmation. No physical result or card inspection yet.

2026-11-05 card inspection:power-off/transfer confirmed;bootfs readable and Pi4/cloud-init files present. Actual card fields match intended hostname/account/SSID/PH/SSH configuration. Windows reports bootfs Warning,not repaired or diagnosed as corruption. Linux raw read denied without elevation;no startup-log result. No file changes. Detailed evidence and pending2.4GHz experiment approval in [CARD_INSPECTION.md](CARD_INSPECTION.md).

2026-11-05 approved2.4GHz experiment:current Windows2.4GHz/channel4 and matching card verified. Read-only script preview passed;approved -Apply changed network target and matching setup IDs,with exact original backups on card. File readbacks PASS,user-data/password line preserved. No format/root modification. Safe ejection/card return,Pi boot and actual network/SSH result pending.

2026-11-05 safe removal:Windows accepted standard PnP eject for identified USB reader;matching card no longer present in Get-Disk,SafeToUnplug true. No force/elevation. Physical transfer back to Pi and retry boot/network tests remain pending.

2026-11-05 retry boot/network:card seating and continuous power>=5minutes user-confirmed;green light off again. PC verified2.4GHz/channel4. Both hostname forms unresolved;fresh bounded scan found6ping responders,no TCP22 listener. Updated-file readback passed earlier,but network reachability remains FAIL/UNRESOLVED,not a diagnosed card/hardware fault. Await refreshed router DHCP table after this trial;no new rewrite/power-cycle.

2026-11-05 alternate discovery:IPv6 test UNAVAILABLE because PC Wi-Fi IPv6 binding is disabled/no local address;local transmit General failure is not a Pi test result. Standard IPv4 mDNS returned no hostname/SSH/workstation response. No settings changed. Next distinct check:observed router WLAN Information association/status table;actual Pi identity/boot remains unproven.

2026-11-05 log-reader preparation:user selects log-access direction. Official Free Linux Reader5.3 installer downloaded to ignored tmp/downloads,signature Valid,publisher DiskInternals;not run. Installation approval pending. No installed reader/current-user WSL distro found in checked locations. No new power-off/transfer or logs read. Plan and privacy checkpoints in [READ_STARTUP_LOGS_WINDOWS.md](READ_STARTUP_LOGS_WINDOWS.md).
