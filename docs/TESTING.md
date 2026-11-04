# Prototype testing log

PHASE2: initial Raspberry Pi setup. Updated2026-11-04. Test one function at a time; sensor/detector tests are deferred until initial access works. No completed-prototype claim.

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
