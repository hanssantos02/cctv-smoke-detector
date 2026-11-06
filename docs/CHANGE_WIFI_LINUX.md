# Change the Pi's saved Wi-Fi from the Linux laptop

PHASE2: Step20–28 completed on2026-11-06. The installed Wi-Fi profile was updated,card safely returned,authenticated SSH and initial health checks passed. The Pi is now shut down and unplugged per user,with its card seated as last reported. This is an action/results record,not a request to rerun the helper. Use [current continuation](CONTINUE_ON_ANOTHER_PC.md) for the deferred header/soldering checkpoint.

The following preparation statements and commands belong to the earlier verified card connection; `/dev/sda` and its mounts are not assumed current.

## Why this step changed

The user is now at a **different router** and explicitly wants the Pi to use this laptop's current Wi-Fi. The old saved profile is for the previous location. Changing routers does not diagnose the earlier router's failure;this is a new connection target. Do not ask the user to reconnect to the old router.

Pi is off,card connected to Linux Mint22.3. Rootfs is verified at this project's `tmp/pi-rootfs` with `ro,relatime,norecovery`;bootfs is unmounted. Laptop currently has one active WPA/WPA2 personal connection. The user confirmed that this is the desired target. There is no reason to require a2.4GHz network when the chosen Pi4/router network supports5GHz.

## What the helper changes

`tools/change_pi_wifi.py` finds the one inspected Netplan file containing a single `wlan0` Wi-Fi profile. It replaces that profile's access-point name/password with this laptop's currently connected network and the password entered privately. Other fields,including DHCP and the country setting,are preserved. [Netplan documents the access-point/password format](https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-wifis).

The helper:

1. Verifies the exact current `/dev/sda` USB/removable card identity/capacity/layout and `/dev/sda2` read-only mount. It stops if a reconnection changed those identifiers.
2. Reads only the current laptop network's name/security;it does not retrieve its saved password. Names are hidden in output.
3. Finds exactly one existing wlan0/AP profile. It stops rather than guessing if the structure differs.
4. In apply mode,asks for the **current router's Wi-Fi password twice**,with typing hidden. It checks supported passphrase format;that does not establish correctness.
5. Displays the planned scope and asks for literal `YES` **before any card writes or mount changes**.
6. Unmounts the read-only rootfs and mounts the same verified partition normally with write access. This permits normal filesystem recovery/metadata writes;it does not run a filesystem repair program.
7. Saves a root-private original and target-path record under `/var/backups/sentrion-wifi/<UTC-time-random-id>/` **on the Pi card**. Files use mode0600 and backup directories0700. Originals contain private credentials;never copy them into Git/chat.
8. Atomically replaces only the selected YAML profile,verifies the written bytes,and tries to restore the original if replacement/readback fails. It then unmounts and restores the rootfs read-only with `ro,noload`.

There is no flashing,package installation,cloud-init instance-ID change,account/SSH change,or Pi executable run on the laptop. Do not run `netplan apply` on the laptop;the Pi uses its saved configuration when next booted.

The boot partition's original setup seed is intentionally unchanged. A later explicit reinitialization/instance-ID change could regenerate the previous seed's settings. This method updates the installed system's current network profile. The installed cloud-init code defaults to network generation on a new instance (`sources/__init__.py:278`);`stages.py:1078` skips network reapplication for an existing instance without an enabled update event. No general fix for the earlier router is claimed.

## Run in the laptop's own terminal

Keep Pi off and card connected. The required Python3/PyYAML and system tools are already available;no installation or dialout-group change is needed. The helper performs the exact guarded unmount/mount operations described above with root privileges,so this is a deliberate card-write action.

```bash
sudo python3 /home/hans/repos/cctv-smoke-detector/tools/change_pi_wifi.py --apply
```

- If sudo asks for a password,enter the **laptop login password** locally. It is not the Pi account password.
- At `Current router Wi-Fi password (hidden):`,enter the **new router's Wi-Fi password**. Repeat it when asked. Do not send either password to chat.
- Review the fixed scope. Type `YES` only to approve that card change. Anything else cancels before mount changes/writes.
- The command line contains no password;passwords remain out of shell history. No private configuration is copied into this project.

For an optional read-only preview instead,use the same command without `--apply`. It does not request a password,write files or change mounts.

Expected success messages include:

```text
Wi-Fi profile replaced; private on-card backup and readback verified.
Card root filesystem is mounted read-only again.
```

**Check before continuing:** send the summary or fixed error. Do not remove the card yet. Successful file readback does not prove the Pi can authenticate or connect. Safe removal,card return to the unpowered Pi,and power-on are separate checkpoints with actual physical confirmation.

If the helper reports a mount/rollback problem,leave the card connected and report the displayed message. Do not force an unmount,repair,format or reflash. Private parser/OS diagnostics are suppressed because they can embed credentials.

## Validation completed before use

Python syntax checked. Read-only real-device identity and supported active-Wi-Fi checks passed. Synthetic tests checked YAML punctuation handling,preservation of unrelated settings,private backup,atomic replacement/readback,rollback after a simulated post-replacement failure,and restoring read-only mount options. These tests used temporary fixtures with fake credentials and simulated mounts. **No real card file was written by these tests.** The actual user-run apply subsequently succeeded;see the update result below.

## Update result — 2026-11-06

User screenshot confirms --apply completed after hidden password entry and local YES. Profile replacement,on-card original backup and readback passed. Assistant independently verified rootfs mounted `ro,nosuid,nodev,relatime,norecovery`;bootfs is unmounted. No new Pi boot/authentication/IP/SSH result yet. Do not repeat the update merely to resume.

## Step21 — safely unmount before physical removal

Keep Pi off/card connected. In the laptop terminal run:

```bash
sudo umount /home/hans/repos/cctv-smoke-detector/tmp/pi-rootfs
```

This detaches the card filesystem so it can be removed safely;it does not erase it. Success usually prints nothing. Return the result before removing the reader/card. On a busy/error message,leave everything connected and report it;do not force unmount. Verify no card partitions remain mounted before the physical transfer checkpoint.

2026-11-06 result:user reports unmount done. Independent `lsblk` shows bootfs/rootfs both without mountpoints;safe-unmount check PASS. Card is still detected in the USB reader.

## Step22 — disconnect the reader

Unplug the USB card reader from the laptop. Keep the Pi powered off. Report that the reader is unplugged before the next physical card-transfer step. Reader unplugging/card transfer has not yet been confirmed.

2026-11-06 result:user confirms USB reader unplugged.

## Step23 — return the microSD to the unpowered Pi

Keep the Pi power supply unplugged. Remove the microSD from the disconnected reader,then gently slide it into the Pi microSD slot underneath the board. Use the same orientation as before;do not force it. Report that the card is seated before power-on instructions. No card seating or new boot is confirmed yet.

2026-11-06 result:user confirms card seated in unpowered Pi.

## Step24 — power on for the new-router test

Keep camera/sensor/GPIO circuits disconnected. Put Pi on a dry,stable,nonconductive surface. Connect the previously inspected5.1V/3A USB-C supply to the Pi power socket,then energize the adapter. Allow about2minutes for startup;this is an observation interval,not a guaranteed startup deadline. Report whether power is on and what the red power/green activity lights do. Keep Pi powered/card seated for subsequent network checks. Do not remove the powered card. Lights alone do not prove completed boot or network access.

Await actual powered/waited/LED report before live discovery. No fresh boot or new-router connection has yet been confirmed.

## Step25 — new-router discovery result

2026-11-06:user reports red power on,green activity blinked then off. Laptop Wi-Fi connected,IPv4 `192.168.100.152`,gateway `192.168.100.1`. Read-only hostname query resolves `sentrion-pi.local` to **192.168.100.211**. TCP22 accepts and returns `SSH-2.0-OpenSSH_10.0p2 Debian-7+deb13u4`. **Hostname discovery and SSH-listener checks PASS.** No SSH authentication or remote command attempted. Keep Pi powered/card inserted. Do not infer why the earlier router failed from this new-router success.

## Step26 — first SSH login

In the laptop terminal:

```bash
ssh sentrion@sentrion-pi.local
```

SSH opens a secure terminal connection to the Pi. On this laptop's first connection,it may display a host-key fingerprint and ask `Are you sure you want to continue connecting`. For the expected newly reached Pi,type `yes` to save its public identity in the laptop's SSH known-hosts file. If an existing-key-changed warning appears instead,stop and report it;do not delete keys blindly.

At the password prompt,enter the **Pi account password chosen during Imager setup**,not the laptop login or router password. Typing stays hidden. Never send the password to chat. A successful session should show a shell prompt such as `sentrion@sentrion-pi:~ $` (styling may differ).

**Check before continuing:** return the prompt/result or exact error,excluding passwords. First authenticated login and Pi model/RAM/time/temperature/power-health checks are still pending. If the name stops resolving,the last observed address is192.168.100.211;reverify before treating it as permanent.

2026-11-06 result:user screenshot confirms successful password-authenticated login and prompt `sentrion@sentrion-pi:~ $`. Banner shows kernel `6.18.50+rpt-rpi-v8`,architecture `aarch64`. This establishes boot/Wi-Fi/SSH access on the new router;not detector functionality or complete hardware health. Account password remains private.

## Step27 — read the Pi's basic health

Run these at the **Pi prompt** `sentrion@sentrion-pi`,inside the SSH session,not a separate laptop shell:

```bash
tr '\0' '\n' < /proc/device-tree/model
free -h
vcgencmd measure_temp
vcgencmd get_throttled
```

These commands read information without installing packages,changing settings or requiring sudo:

| Command | What it checks | Expected result / limit |
| --- | --- | --- |
| `tr` on device-tree model | Prints board model;replaces the special zero-byte terminator with a newline for readable output | Raspberry Pi4 ModelB,plus its board revision. Does not identify RAM size by itself. |
| `free -h` | Shows total/used/available system memory in readable units | Total should be consistent with the reported4GB board,allowing for reserved memory and display-unit differences. Available memory is not the installed total. |
| `vcgencmd measure_temp` | Reads the chip's internal temperature sensor | A numeric temperature in degrees Celsius. Return actual value;do not assume adequate cooling from a single idle reading. |
| `vcgencmd get_throttled` | Reads firmware power/temperature/frequency-limit flags | Desired output is `throttled=0x0`. Nonzero values require decoding,including current and previously occurred conditions;do not diagnose solely from the red LED. |

[Official Raspberry Pi vcgencmd reference](https://www.raspberrypi.com/documentation/computers/os.html#vcgencmd) defines temperature and throttle flags. This is an initial snapshot,not a load test or measured power-budget validation.

**Check before continuing:** send all four outputs. If a command is missing or denied,send the error instead of installing anything or adding sudo. Leave Pi powered/card seated. No live health outputs received yet.


2026-11-06 result:live board is Raspberry Pi4 ModelB Rev1.5. Memory total3.7Gi,available3.4Gi (consistent with4GB board);swap2.0Gi unused. Temperature38.4C. Firmware reports `throttled=0x0`. Initial idle checks PASS;not a load test,long-run reliability guarantee or measured power budget.

## Step28 — confirm running OS,clock and free storage

Inside the current Pi SSH session,run:

```bash
cat /etc/os-release
timedatectl
df -h / /boot/firmware
```

These are read-only and need no sudo or installation. The first identifies the running distribution/version rather than relying only on offline card metadata. The second reports time zone,clock and synchronization;expect Asia/Manila and correct local date/time before using timestamps or software repositories. Report an unsynchronized clock rather than changing it blindly. The last reports space on root `/` and boot `/boot/firmware`;inspect available capacity,not just card label,and return any missing-mount/error message.

**Check before continuing:** send all outputs. Do not install/update packages or alter time/filesystems automatically. Actual running OS/time/storage baseline remains pending.


2026-11-06 result:running OS Debian GNU/Linux13 Trixie,DEBIAN_VERSION_FULL13.7. Local clock11:51:53 on2026-11-06,Asia/Manila(PST,+0800),synchronized yes,NTP active. Root29G total/6.7G used/21G available(25%);boot505M total/88M used/417M available(18%). Baseline PASS;no time/storage edits or package installs needed to obtain these results.

## Step29 — next prototype readiness

Initial Pi setup is working on the new router:authenticated SSH,board/RAM,initial idle power/temperature flags,running OS,clock and available storage checked. This is not a complete detector prototype or long-run validation.

Next ask whether a USB camera is physically available and obtain its actual model/specifications before choosing the next test/software. Do not treat earlier store selections as proof of delivery or UVC compatibility. No project package installation,GPIO wiring or detector-code implementation has occurred. Exact sudo/install commands require applicable approval;Phase3 still requires successful prototype confirmation.


2026-11-06 result:user confirms USB camera physically available for next prototype check. This confirms availability,not delivered model,connector,power requirement or compatibility.

## Step30 — identify the actual camera

Request the camera's exact model or clear photo showing camera,label and cable plug. A matching store listing can help if the label has no model,but seller claims still need device testing. If not connected yet,leave it unplugged until identification. Keep Pi powered/current SSH session available. No camera connection or software installation has been confirmed. Do not assume either old A03 candidate is the delivered unit.
