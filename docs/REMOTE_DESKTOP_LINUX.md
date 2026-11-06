# View the Pi desktop from the Linux laptop

PHASE2, Step45 complete — user reports desktop access worked,shut down and power unplugged,2026-11-06 (Asia/Manila).

The user deferred ADS1115 soldering and initially asked how to shut down, then explicitly selected setting up desktop access now. After the Step44 instructions, user reports desktop access working. Checkpoint read-only dpkg audit confirms laptop tigervnc-viewer1.13.1+dfsg-2build2 and both FLTK libraries1.3.8-6.1build2 installed;live Pi service state was not independently audited. User subsequently chose Shut Down and confirmed unplugging. No new install,desktop-setting change or power-on is needed to resume the chat.

## How it works

VNC shares the Pi graphical desktop in a laptop window, including mouse and keyboard control. The Pi runs the server and the laptop runs a viewer. SSH remains useful for terminal commands. This local-network setup needs both machines on the same router; no router forwarding or external account is needed. Raspberry Pi OS includes WayVNC according to its [official remote-access guide](https://www.raspberrypi.com/documentation/computers/remote-access.html#vnc). Check the actual installation/session before changes.

Read-only laptop checks found no remmina or vncviewer command and no installed tigervnc-viewer package. apt-cache currently offers tigervnc-viewer 1.13.1+dfsg-2build2 from Ubuntu noble/universe. This is local cached metadata, not an installation or guarantee about a future resolver. No apt update/install has run.

## Step43 — check the Pi through the existing SSH terminal

At `sentrion@sentrion-pi:~ $`, run:

```bash
dpkg-query -W -f='${Package} ${Version}\n' wayvnc raspi-config
systemctl get-default
systemctl is-enabled wayvnc
systemctl is-active wayvnc
pgrep -a labwc
```

These commands read installed package versions, the default boot target, whether the VNC service is enabled/running, and whether the labwc desktop process exists. They need no sudo and change no settings. A missing package/service, disabled/inactive result or blank process result is useful evidence, not a reason to install blindly. Send all output before choosing the enablement/session step. Step43 screenshot result: raspi-config20261026;wayvnc0.10.2-1+rpt1;graphical.target;wayvnc disabled/inactive. Process1282 is `/usr/bin/labwc -C /etc/xdg/labwc-greeter/`, indicating a greeter compositor, not proof of a logged-in sentrion desktop. No failure is diagnosed from this alone.

## Step44 — enable VNC and install the laptop viewer

User selected desktop setup now. These are user-operated commands with visible sudo/package prompts; assistant has not executed privileged or external-file mutations. Keep SSH available and Pi powered. Do not enable automatic desktop login or change display settings preemptively.

1. At the **Pi SSH prompt** (`sentrion@sentrion-pi`), run:

```bash
sudo raspi-config nonint do_vnc 0
printf 'VNC enable exit code: %s\n' "$?"
systemctl is-enabled wayvnc
systemctl is-active wayvnc
```

`0` means enable in raspi-config's noninteractive interface. This persistently enables and starts the installed WayVNC service. The checked upstream trixie function detects the running labwc compositor and uses installed WayVNC; current0.10.2 exceeds its required0.8. It can disable an older RealVNC service if installed and remove an older WayVNC autostart entry if present. No new Pi package is expected with these observed prerequisites; report unexpected install/error output. Enter the **Pi account password** locally if sudo asks. Expected exit0,enabled,active. If it errors or remains inactive, stop and return output before the viewer steps.

2. Open a separate **laptop terminal** with Ctrl+Alt+T, check its prompt is `hans@...`, then run:

```bash
sudo apt install tigervnc-viewer
```

Enter the **laptop login password** locally if prompted. The assistant's read-only resolver simulation found only3 new packages, no removals or upgrades: tigervnc-viewer1.13.1+dfsg-2build2 and libfltk1.3t64/libfltk-images1.3t64 version1.3.8-6.1build2. Review the actual apt proposal before accepting; stop and report unexpected removals/upgrades/errors. No `-y`, system upgrade, Java runtime or laptop VNC server is needed. Installation changes files outside the project through the package manager; it has not run yet. No dialout changes apply.

3. After the install succeeds, in that same **laptop terminal**, run:

```bash
vncviewer sentrion-pi.local
```

This is the already verified Pi hostname on the local router, not a public server. If asked for username/password, use `sentrion` and the **Pi account password**, entered locally. A graphical login screen may then require the same account again. Do not send passwords or bypass an unexpected certificate/identity warning; report the dialog for review. If the viewer reports a blank screen or error, preserve SSH and return that exact result before changing login/session settings. No router forwarding is needed.

**Check before continuing:** user returns a screenshot of the viewer desktop/login screen or exact error, plus any failed enablement/install output. The service, viewer installation and actual visible desktop remain pending until observed. Enabling the server alone is not a successful desktop-sharing test.

Sources: [official VNC guide](https://www.raspberrypi.com/documentation/computers/remote-access.html#vnc), [upstream raspi-config trixie implementation](https://github.com/RPi-Distro/raspi-config/blob/trixie/raspi-config). Service/setup behavior above is inferred from the screenshot and that implementation; verify actual results. The older upstream headless greeter issue2201 was found closed; do not assume it applies or enable autologin merely because the current process is a greeter.

## Configuration notes

The official interactive path is `sudo raspi-config`, then Interface Options > VNC > Yes. It changes persistent configuration and may depend on installed components; explain the actual scope before user execution. Do not assume a logged-in desktop exists from an SSH login alone. Display/session configuration should follow observed state; do not force X11, boot autologin, passwordless access or arbitrary display settings as a first step.

A native laptop viewer candidate is `sudo apt install tigervnc-viewer`; inspect the package resolver first and obtain applicable approval for installing outside the project. Do not install a VNC server on the laptop. No serial/dialout changes are relevant. Connect only to the verified Pi hostname/current IP after server readiness; enter Pi credentials locally and keep them out of chat/Git. Desktop viewing is not yet verified.

## Step45 — shut down from the VNC desktop

2026-11-06: user reports VNC works. Save any open Pi work. In the **Pi desktop displayed inside the viewer**, open the Raspberry Pi menu and select Shut Down, then confirm Shut Down if a dialog appears. Closing the viewer window or choosing Log Out does not shut down the Pi.

The viewer disconnecting is expected during shutdown but can also happen for other reasons. After actually requesting Shut Down, allow at least30 seconds and wait for the final green activity flashes to finish. If activity continues or an error appears, report it before unplugging. Once shutdown has finished, unplug the Pi USB-C power cable. Red power light and a directly powered fan may remain on until supply removal; do not require those to stop as proof before unplugging. Leave the microSD seated. Ask user to confirm power removed/all lights off. No actual shutdown/unplug result exists yet.

This follows the [official Raspberry Pi beginner guide's shutdown sequence](https://magazines-static.raspberrypi.org/books/full_pdfs/000/000/026/original/000_RPi_BeginnersGuide_DIGITAL.pdf). Using a viewer sends the same desktop action; the laptop remains running. Later, reconnect Pi power to boot, then reopen the laptop viewer once the Pi is ready.

## Terminal shutdown alternative

When user chooses to stop, save open Pi work and run `sudo poweroff` in the **Pi SSH terminal**, not the laptop shell. If sudo requests a password, enter the Pi account password locally. The SSH connection closing is expected. Allow shutdown to finish, observing the final activity indication and allowing at least30 seconds after disconnect before removing power; if command errors or disk activity continues, report it first. The red power light or a directly powered fan can remain on until supply removal; their staying on alone does not mean shutdown failed. Then unplug USB-C power, confirm all lights/fan off and leave the card seated. Do not move GPIO wiring while powered. This shutdown is documented only; it has not been performed or confirmed. [Official shutdown documentation](https://www.raspberrypi.com/documentation/computers/getting-started.html#shut-down-your-raspberry-pi).

## Resume hardware work

Step42 header dry-fit/solder preparation remains unfinished. No soldering, sensor/ADC wiring or electrical test was reported. Resume BUILD_PROTOTYPE.md after desktop access or at the user's chosen time; no repeated camera/card setup is needed.

2026-11-06 Step45 result so far: user selected Shut Down and viewer displayed connection reset by peer104 with a reconnect prompt. This is consistent with the VNC service stopping during shutdown, not proof of a completed halt by itself. Select No; allow at least30seconds after requested shutdown/disconnect and final green activity to stop, then unplug USB-C power. Do not treat the red light or a powered fan remaining on as a failure. Await unplug/all-lights-off confirmation; no restart/reconnect or additional software change is needed for this dialog alone.

## Final stopping point — 2026-11-06

User confirms Pi unplugged after the reported desktop shutdown and VNC disconnect. Step45 is complete as a user-reported physical action;all-lights-off was not separately reported. Earlier pending-shutdown statements are historical. The installed desktop-access path worked per user;subsequent checkpoint dpkg audit confirms tigervnc-viewer1.13.1+dfsg-2build2 and both FLTK libraries1.3.8-6.1build2. Leave Pi off until needed. Resume unfinished Step42 header fit/soldering through CONTINUE_ON_ANOTHER_PC.md when user is ready.
