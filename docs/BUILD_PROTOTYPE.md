# Prototype build guide

PHASE 2: PROTOTYPING — initial Raspberry Pi setup. Started 2026-11-04.

Current as of2026-11-05:initial Pi setup is authorized;Windows OS image writing and an approved2.4GHz configuration retry have been performed. No successful boot/network login,complete detector prototype or sensor wiring is claimed. This guide preserves sequential instructions/results;early pending checks are historical. **Resume at Step19 using docs/CONTINUE_ON_ANOTHER_PC.md and docs/READ_STARTUP_LOGS_LINUX.md**,not Step1. Remaining BOM issues stay in PROGRESS.md.

## Step 1 — Identify the hardware with power disconnected

**Before handling:** Keep the Pi's power supply unplugged from the wall and Pi. Hold the board by its edges. Place it on a clean, dry, nonconductive support; avoid exposed metal, loose screws and the outside of antistatic packaging. Do not open the mains adapter. Leave sensors, fan leads and the 40-pin connector disconnected for this first check.

The Raspberry Pi is the small computer that will eventually process the camera images. The microSD card stores its operating system (the software that starts and runs the computer). The reader lets Windows write that card. The USB-C supply powers the Pi; an identical-looking plug alone does not establish a suitable supply.

1. Read the model printed on the Pi board. Send the wording or a clear photo of its top side. If its box states the RAM capacity, include that label; RAM is the computer's temporary working memory. If the RAM cannot be identified yet, report it as unknown instead of removing any parts.
2. Read the power adapter's label. Send the brand/model and the line marked **OUTPUT**, including voltage in V and current in A, or a clear photo. The planned Pi4 supply is the official 15W USB-C unit, nominally 5.1V/3A; we must compare the actual unit before connection. An INPUT line such as 100–240V describes the wall supply, not the voltage going into the Pi.
3. Read the microSD card's brand, model and capacity (for example, 32GB). Say whether there are files on it that need to be kept, or whether it may already contain a Pi operating system. Do not format or write it. Writing a new OS replaces the card's contents; explicit permission for the identified card is needed first.

**Check before continuing:** Return the three results above. Keep the Pi unpowered while we check them. Reader availability has already been reported; no need to buy another reader unless the actual card/reader connection proves incompatible.

### Step 1 results — 2026-11-04

Board photo confirms Pi4 ModelB;4GB RAM is user-reported, not software-checked. Adapter label reads KSA-15E-051300HU,5.1V DC3.0A output,100–240V AC input; flat blades visible. Its output matches the [official Pi4 supply specification](https://www.raspberrypi.com/products/type-c-power-supply/), checked2026-11-04. Photo inspection does not verify authenticity or performance under load. No round-to-flat adapter is needed if its actual plug fits the intended socket normally; never force it.

Card is Silvertec32GB microSDHC, marked UHS-I/A1/Class10; user reports no files. Use it for initial setup; real capacity/reliability remain untested. No high-endurance claim is established, so it is not yet an approved equivalent to the BOM's SanDisk High Endurance card for continuous logging. No new card is needed for the first attempt. The empty-card report does not identify the Windows storage target; confirm that exact target before writing.

## Step 2 — Open Raspberry Pi Imager on Windows

Imager is the official application that writes the operating system to the card. Installing it on Windows and writing the Pi card are separate actions. This step stops before writing.

1. Keep the Pi unplugged and leave the microSD out of the reader for now.
2. Open the official [Raspberry Pi software page](https://www.raspberrypi.com/software/) on this Windows PC. Select **Download for Windows**. If already installed, open Imager instead.
3. Run the downloaded installer and follow its prompts. If Windows requests permission to make changes, verify it is the installer obtained from the official page before accepting. If an unexpected publisher or security warning appears, report its wording rather than bypassing protection.
4. Open **Raspberry Pi Imager** from the Start menu. Stop at the initial screen. Send a screenshot or its displayed version so subsequent instructions match the actual interface.

**Check before continuing:** Does Imager open successfully? Report any error. Also say whether the Pi will use the same home Wi-Fi as this PC or an Ethernet cable to the router; keep the password private. These are user-operated steps; no assistant-run installation has occurred. AGENTS.md requires permission before assistant-run installation or card writing.

### Step 2 result — 2026-11-04

User screenshot confirms Raspberry Pi Imager v2.0.12 open on Windows at **Select your Raspberry Pi device**. Opening succeeded; no need to reinstall. Device, OS and storage have not yet been selected in the supplied screen. Network choice remains pending.

## Step 3 — Select the Raspberry Pi 4 device

This selection tells Imager which family of boards to show compatible operating systems for. The Raspberry Pi4 entry includes the user's Pi4 ModelB; there is no separate 4GB RAM choice on this screen.

1. Click **Raspberry Pi 4**, the second entry in the supplied screenshot. Its description includes **Raspberry Pi 4 Model B**.
2. Click **NEXT** at the bottom right once the selection enables it.
3. Stop on the OS screen and send a screenshot showing the available operating systems. Do not choose or write an image yet; the next checkpoint will explain the OS choice using the actual options shown.

**Check before continuing:** Does the OS screen appear? Send it or report any error. Also confirm whether the Pi will use Wi-Fi or an Ethernet cable to the router. Do not send a password. Keep the Pi unplugged and the card out of the reader during this screen-selection step.

### Step 3 result — 2026-11-04

User screenshot shows the OS screen in Imager v2.0.12. First entry is Raspberry Pi OS(64-bit), Debian Trixie with Raspberry Pi Desktop, marked Recommended, release2026-10-06. OS is not yet selected in that screenshot.

## Step 4 — Choose the OS and connect the card reader

Recommended image: **Raspberry Pi OS (64-bit)**, the first entry shown. This is the standard desktop image, Debian13 Trixie, release2026-10-06. The [official downloads page](https://www.raspberrypi.com/software/operating-systems/), checked2026-11-04, lists compatibility with Pi4B. The desktop gives a visual interface for later camera-image inspection; this is an engineering choice for beginner prototyping, not a guarantee about an untested detector application. No project libraries have been installed or pinned yet.

**Before connecting storage:** Writing the wrong disk can erase unrelated files. This checkpoint only connects and identifies the intended card. Keep the Pi unplugged. Do not format a drive or start writing.

1. Click the first **Raspberry Pi OS (64-bit)** entry and click **NEXT** to reach Storage.
2. Insert the empty Silvertec32GB microSD into the compatible reader, then connect that reader to this Windows computer. Use the reader's marked orientation; do not force the card. If Windows offers to format a drive, choose **Cancel**; Imager will handle the card format during the eventual authorized write.
3. Send a screenshot of Imager's **Storage** screen showing detected devices and capacities. Do not select an uncertain disk or start writing. The reader may show its generic device name instead of Silvertec. We will compare its reported capacity and, if needed, its appearance/removal with the intended card before choosing it.

**Check before continuing:** Does the card appear in Imager? Return the Storage screenshot or exact device name/capacity/error. Do not connect the card to the Pi yet. Network choice is still pending and will be confirmed before network customization.

### Card-connection result — 2026-11-04

User reports the card is connected and asks for local inspection. Read-only Windows storage commands identify a USB **Mass Storage Device**,31,299,993,600bytes (about31.3GB decimal or29.2GiB), currently **disk2**. Its single FAT32 partition is **E:** and almost entirely free. The reader's generic name is normal; reported size is consistent with the labelled32GB card, but is not a full real-capacity/reliability test. No files were opened and no card was formatted or written.

Internal drives are WDC256GB (disk0,C:) and Kingston500GB (disk1,D:). Neither is the card. These disk numbers and letters are observations for this connection only; recheck if reconnected or before any write. The user-reported empty card plus reader connection and unique USB capacity identify the proposed target; actual selection in Imager remains unobserved.

## Step 5 — Select the identified storage in Imager

**Before selecting:** Choose only the USB reader/card around31.3GB, named **Mass Storage Device** or a matching generic USB-reader name. Do not choose the256GB/500GB internal drives. If Imager shows different capacity or ambiguous devices, stop and return a screenshot before continuing.

1. On Storage, select the USB **Mass Storage Device**, approximately31.3GB. Depending on units/rounding the application may show roughly29.2GiB or32GB instead. Confirm the size, not just the name.
2. Click **NEXT** to reach **Customisation**. Do not start writing.
3. Send the Customisation screenshot. Confirm Wi-Fi or Ethernet when we configure networking. Passwords should be entered locally and kept out of screenshots/chat.

**Check before continuing:** Confirm Customisation is displayed, or report a device mismatch/error. Keep the Pi unplugged. Card writing, hostname/account/network settings, remote access and first boot are still pending.

### Step 5 result — 2026-11-04

User screenshot confirms **Customisation: Choose hostname** is open. Storage selection advanced, but the selected device/image are not displayed here; review their actual summary before writing. No writing has occurred in the supplied screen.

## Step 6 — Set the hostname

A hostname is the Pi's name on the network, helping distinguish it from this Windows computer and other devices. Proposed project name: **sentrion-pi**. Use a different unique name if another device on the network already uses it, and record that change before later connection instructions.

1. Click **Enter your hostname** and type `sentrion-pi` using lowercase letters and the hyphen. Do not add spaces or `.local` to this field; enter only the hostname.
2. Click **NEXT**.
3. Return the **Localisation** screen so regional settings can be checked for the Philippines before continuing.

**Check before continuing:** Confirm Localisation is displayed or report any error. Keep the Pi unplugged. This setting names the Pi; it does not create an account, connect Wi-Fi or write the card. Proposed hostname is not yet confirmed entered.

### Step 6 result — 2026-11-04

User screenshot confirms **Customisation: Localisation** is displayed, with blank capital/time-zone/keyboard fields. Hostname entry has advanced, but the actual saved hostname is not shown; check `sentrion-pi` in a later review before using it in connection commands.

## Step 7 — Set Philippine regional preferences

These settings tell the Pi which local time to display and how to interpret keyboard keys. Correct local time matters for readable smoke-event timestamps; time-zone selection alone does not guarantee an accurate clock before network time synchronization.

1. Open **National capital** and select **Manila** for the Philippines. Selecting a capital here provides regional defaults; it does not mean you must live in that city.
2. Check **Time zone**. Use **Asia/Manila**, which is Philippine time, **UTC+08:00**. If Imager presents a friendly label such as Manila, choose the Manila entry. Change any different suggested zone.
3. For **Keyboard layout**, choose **us** if your physical keyboard has the standard US layout (for example Shift+2 produces @). The user's v2.0.12 screenshot confirms this version displays short layout identifiers such as `us` rather than full names such as English (US). These identify keyboard mappings, not faults or language-pack downloads. If your keyboard differs, choose its actual layout; do not select US merely because you live in the Philippines.
4. After all three fields are populated, click **NEXT** to reach **User**. If the keyboard dropdown is open with `us` already selected, click outside the list to dismiss it without changing the selection.

Checkpoint update2026-11-04: screenshot shows **Manila (Philippines)**, **Asia/Manila** and **us** selected, with the keyboard dropdown open. Regional fields are populated; `us` matches the proposed US layout, subject to the actual physical keyboard. User screen has not yet been reached in the supplied evidence. The technical identifiers come from the Linux keyboard-layout system; see [XKeyboardConfig naming documentation](https://xkeyboard-config.freedesktop.org/doc/symbols/).

**Check before continuing:** Confirm the User screen appears, or report unavailable choices/errors. Keep passwords private; do not send screenshots showing passwords or fill account credentials yet. Keep the Pi unplugged and do not start writing.

### Step 7 result — 2026-11-04

Latest screenshot confirms **Customisation: Choose username** reached, with Username, Password and Confirm password blank. Localisation previously showed Manila(Philippines),Asia/Manila,us. No account name/password is yet confirmed entered.

## Step 8 — Configure the Pi login account

The username names the account you will log in with. It is separate from the hostname, which names the computer on the network. Proposed values are account **sentrion** on computer **sentrion-pi**; these remain proposed until confirmed. This account is for the Pi, not your Windows account or an online Raspberry Pi account.

1. In **Username**, type `sentrion` (lowercase, no spaces). If choosing another username, report only that username so later connection instructions match it.
2. In **Password**, choose and enter a unique password you can keep safely. A long passphrase containing several unrelated words is one approach. Do not reuse your Windows or email password. Meet any requirements Imager displays.
3. In **Confirm password**, enter exactly the same password again. Both fields must match. Enter it locally; do not paste it into chat, project files or screenshots. Save it in your password manager or another private place you control.
4. Click **NEXT** to reach **Wi-Fi**. If Imager reports a mismatch, re-enter both password fields locally.

**Check before continuing:** Tell the assistant when the Wi-Fi screen appears and whether the Pi will use Wi-Fi or Ethernet to the router. No filled-account screenshot or password is needed. Keep Pi unplugged and do not start writing the card.

### Account/network checkpoint — 2026-11-04

Latest screenshot shows **Customisation: SSH authentication**. The account and Wi-Fi pages have been passed; actual account values are not visible here. User confirms Wi-Fi settings were entered. No SSID or password is requested or stored in the repository. Wi-Fi connection can only be verified after writing/first boot. The screenshot shows **Enable SSH** off; password authentication is selected but inactive until SSH is enabled.

## Step 9 — Enable local-network SSH access

SSH means Secure Shell: it gives an encrypted command-line connection from Windows to the Pi over the network, without a separate Pi keyboard/monitor. It does not by itself show a graphical desktop. Password authentication uses the Pi login account configured on the User page, not the Wi-Fi password. This follows the manufacturer's [remote-access instructions](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh), checked2026-11-04.

1. Click the **Enable SSH** switch so it turns on. It is off/grey in the supplied screenshot.
2. Keep/select **Use password authentication**. This uses the Pi account password entered earlier. Do not choose public-key authentication for this initial path; no project SSH key has been configured.
3. Click **NEXT** to reach **Raspberry Pi Connect**. Stop there and return that screen or confirm it appeared.

**Check before continuing:** SSH switch should be on and password authentication selected before leaving the page. Do not send the password. Keep this access on your trusted local network; router port forwarding is not needed for this setup. Keep the Pi unplugged. This only prepares Imager settings; the Pi's SSH server is not running or tested yet.

### Step 9 checkpoint — 2026-11-04

Latest screenshot shows **Raspberry Pi Connect**, with its Enable switch off. SSH instructions have been passed, but final SSH switch/authentication settings are not visible here; verify in the summary or revisit Remote access before any write. Wi-Fi settings were previously confirmed entered by the user; connection remains untested.

## Step 10 — Leave Connect off and review the summary

Raspberry Pi Connect is an optional online remote-access service linked to a Raspberry Pi account. Our initial route uses SSH over the local network, so account linking is unnecessary for this setup. Leaving Connect off does not disable separately configured SSH.

1. Leave **Enable Raspberry Pi Connect** **OFF**, as shown in the screenshot. Do not sign in or create a token for this route.
2. Click **NEXT** to reach **Writing**, which presents a **Summary** of choices. Official [Imager instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html), checked2026-11-04, describe a separate **Write** button followed by an erase/write confirmation.
3. Stop at the summary and send a screenshot. Hide any password or token if unexpectedly displayed. Do not click **Write** or confirm **I understand, erase and write** yet.

**Check before continuing:** Review device Pi4, Raspberry Pi OS64-bit desktop (Trixie release2026-10-06 proposed), USB card around31.3GB, hostname `sentrion-pi` and username `sentrion` (or user-chosen alternatives), Manila/Asia-Manila/us settings, Wi-Fi configured, and SSH enabled/password authentication. Connect should remain off. If the summary omits a needed setting, revisit that subtab; do not assume it from page navigation alone. Recheck card identity before destructive writing. Keep Pi unplugged.

### Step 10 result — 2026-11-04

User's Write image summary shows **Raspberry Pi4**, **Raspberry Pi OS(64-bit)** and **Mass Storage Device USB Device**. Customisations list hostname/localisation/user account/Wi-Fi configured and **SSH enabled**. Connect is not listed as enabled. Exact hostname/username and SSH authentication mechanism are not displayed; do not claim those values independently verified. Prior instruction was password authentication.

Before providing write instructions, the assistant repeated read-only Windows disk/partition inspection. The single USB Mass Storage Device is still31,299,993,600bytes (~31.3GB), disk2/E:, nonboot/nonsystem. Internal NVMe devices remain WDC256GB and Kingston500GB and must not be targeted. The summary's device name matches this sole USB device. OS64-bit selection and SSH enablement are now observed, not merely proposed.

## Step 11 — User confirms the card erase, writes and verifies

**Warning before proceeding:** Writing erases/replaces the entire selected card, including any partitions. The intended target is only the user's reported-empty Silvertec32GB card in the **Mass Storage Device USB Device** reader, about31.3GB. If disconnected/reconnected, if another USB disk was added, or if a warning names a different target, stop and recheck. Do not erase the internal256GB WDC or500GB Kingston drives.

These are user-operated instructions. The user reviews the erase warning and confirms the destructive action in Imager; no assistant-run flashing command or GUI action has been authorized or performed.

1. If ready to erase the identified empty card, click **WRITE** on the reviewed summary.
2. Review the erase warning. Confirm only if it names the intended Mass Storage Device USB Device and, where shown, the matching ~31.3GB capacity. Use **I understand, erase and write** to approve that card's erasure. If uncertain or mismatched, cancel and report the warning instead. If Windows requests administrator permission for this known Imager write, review that prompt before accepting it yourself.
3. Let Imager download the OS if needed, write it and then **verify** it. Verification reads back/checks the written image; do not choose Skip verification. Keep the reader connected and Windows awake; completion time depends on network/card speed, so there is no promised duration.
4. If Windows offers to format a partition after writing, **Cancel**. The Pi OS includes Linux partitions Windows cannot normally read; formatting would damage the installation.
5. Return the **Done/success** screen or the exact error. Leave the card/reader in place until success is confirmed; Imager may automatically eject the media when finished. Keep the Pi unplugged.

**Check before continuing:** Require successful write/safe-eject status before card removal, and verification-not-skipped confirmation before first boot. A successful image check does not establish full card endurance/capacity, Wi-Fi connectivity, a working detector or prototype completion. If writing fails, record the failure before retrying; do not repeatedly rewrite without checking the stated error.

### Step 11 result — 2026-11-04

Screenshot shows **Write complete!**, Raspberry Pi4, Raspberry Pi OS(64-bit), Mass Storage Device USB Device, and checkmarks for hostname/localisation/user/Wi-Fi configured and SSH enabled. Imager explicitly states storage was automatically ejected and can now be removed safely. This is confirmed user-operated write completion. The screenshot does not separately show verification status or whether Skip verification was used; ask the user once before first boot. Do not infer a successful boot or working network from image-write success.

## Step 12 — Insert the prepared card with power disconnected

**Before handling:** Disconnect the Pi's power cable; inserting USB-C power starts a Pi4 immediately. Hold the board by its edges over a clean, dry, nonconductive support. Leave sensors, camera and loose fan/GPIO leads disconnected for the initial boot. Do not remove or insert a card while the Pi is powered.

1. Click **FINISH** in Imager. The displayed automatic-ejection notice confirms the card can be removed safely.
2. Unplug the card reader from Windows, then remove the microSD card. If using a full-size SD adapter, remove the tiny microSD from it; only the microSD fits the Pi slot.
3. Find the **microSD slot on the underside of the Pi**, at the end opposite the stacked USB/Ethernet connectors. If the case hides it, stop and send a photo rather than pushing the card through an uncertain opening.
4. Gently slide the microSD into that slot with its **printed label facing away from the circuit board**. It slides to a stop; Pi4 does not require a spring-lock click. Do not force or bend it. See [official insertion instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html#inserting-a-microsd-card), checked2026-11-04.
5. Leave power disconnected and report whether the card is seated. If uncertain, send a photo of the slot/card, not account/password details.

**Check before continuing:** Is the card seated without force? Also confirm whether Imager finished verification without choosing Skip verification. Wait for these results before first power-on. If verification was skipped, record that fact and choose an appropriate verification/rewrite path with the user's approval; do not describe the card as verified.

### Step 12 result — 2026-11-04

User replies **yes, connected** after the card-seating and verification question. This confirms card insertion. It does not describe verification separately, so first-power instructions require the user to check that verification finished normally; stop/report if it was skipped or is uncertain. No power-on is yet reported.

## Step 13 — First power-on, then observe indicators

**Before power:** Confirm Imager's verification finished without being skipped. If it was skipped or you are unsure, stop and report that before powering on. Keep the card seated. Place the Pi/case on a dry, stable, nonconductive surface, with no loose metal touching the board or bare40-pin GPIO header. Leave camera, sensors, jumper wires and loose fan leads disconnected. This brief check uses only the Pi/card and its checked supply; sustained processing/cooling checks come later. No exposed mains wiring is involved; do not open the adapter.

1. With the adapter unplugged from the wall, insert its USB-C plug into the Pi4's **USB-C power socket**, next to the two small micro-HDMI sockets. Use the Raspberry Pi-labelled5.1V/3A adapter already inspected, not a USB port on this Windows PC. Do not connect power to the GPIO pins.
2. Plug the adapter into a suitable intact wall socket or power strip and switch it on if switched. The Pi4 starts when power is supplied; there is no separate onboard power button to press. Never force the flat blades into an incompatible outlet.
3. Leave it undisturbed for about **3minutes** as an initial observation period. First startup can take several minutes and may restart during setup; this is not a guaranteed completion deadline. Do not repeatedly unplug/replug it or remove the card.
4. Observe the onboard **red PWR/power** and **green ACT/activity** indicators without touching the powered board. A steady red light and green flashes during startup are typical, but lights alone do not establish a successful OS boot. Report off/steady/blinking states and whether any green blink pattern repeats.

**Check before continuing:** What are the red and green indicators doing after the initial wait? Leave it powered while awaiting the next network check if there is no electrical concern. If there is smoke, burning smell or sparking, switch off/unplug at the wall if safe and report it; do not handle a potentially hot/faulty board. Actual first-boot/network success will be checked after this physical observation.

The manufacturer's [headless setup instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html#headless-setup), checked2026-11-04, describe boot media before power and the first-boot Wi-Fi attempt using Imager settings. No Raspberry Pi shell command is run at this step.

### Step 13 result — 2026-11-04

User reports **red LED on, green LED flickering from time to time**. Consistent with power and card activity, but not proof of completed OS startup or Wi-Fi connection. Initial image verification was not separately described in the earlier brief reply. User subsequently explicitly confirms hostname **sentrion-pi**; username remains proposed as `sentrion` until confirmed.

## Step 14 — Find the Pi on the local network

Read-only checks on Windows found built-in SSH client available, PC on Wi-Fi192.168.1.48 with gateway192.168.1.1 at inspection. Lookup/ping of `sentrion-pi.local` failed at name resolution. Direct mDNS (local automatic device discovery) queries received no replies; a bounded TCP22 check on the current local192.168.1.0/24 found no SSH listener. These results do not distinguish unfinished boot, incorrect Wi-Fi settings, a different/isolated network, filtered discovery/SSH, or an OS problem. Do not rewrite the card solely from this result.

1. Leave the Pi powered and allow about5minutes total for the first startup. Do not repeatedly power-cycle it. If that time has already passed, simply report it; this is an observation interval, not a guaranteed startup deadline.
2. On Windows, open the taskbar Wi-Fi menu and compare the connected network name with the one entered in Imager. Report whether they are the same. No password is needed. A guest network, router client isolation or different subnet can block local access even when both devices have internet.
3. If you have router access, open `http://192.168.1.1` (the gateway observed on this PC) and sign in privately. Find **Connected devices**, **Client list**, or **DHCP clients**; router wording differs. Look for **sentrion-pi** or a Raspberry Pi entry, and report its local IP address. Do not change router settings or send administrator credentials. If access is unavailable or no matching device appears, report that instead.

**Check before continuing:** Obtain same-network confirmation and any matching router entry/IP (or absence/access failure). The next action depends on that evidence: direct SSH reachability if an IP is found, or targeted Wi-Fi/boot diagnosis if not. Do not attempt passwords against unverified devices. The [official remote-access guide](https://www.raspberrypi.com/documentation/computers/remote-access.html#find-the-ip-address-of-your-raspberry-pi) describes router-client-list discovery.

### Step 14 diagnostic update — 2026-11-04

User cannot access router administration, so do not keep requesting the router client list. User confirms Pi's configured Wi-Fi name matches the Windows connection; this does not yet prove the Pi successfully associated. Hostname lookup remains unsuccessful after additional startup time. Standard UDP5353 multicast discovery (active-interface membership,TTL255) received no replies; targeted TCP22 probes of known neighbors found no listener. No firewall/router changes or additional full-subnet scan were performed.

User has a monitor but lacks a cable described as mini-HDMI. **Pi4 uses micro-HDMI (TypeD), not mini-HDMI (TypeC).** For an HDMI monitor, the display path requires micro-HDMI-to-full-size-HDMI cable or a correctly matched adapter plus HDMI cable. Confirm actual monitor input before purchase. No extra cable quote, purchase or BOM cost is recorded yet. See the official getting-started display-connection table.

Next ask whether an **Ethernet/LAN cable with RJ45 plugs** and an accessible spare **router LAN port** are available. Router admin credentials are not needed for physically attaching Ethernet. A cable is not yet confirmed owned, and no new connection has been instructed or performed. If it is available, guide the physical connection, wait for user confirmation, then perform fresh discovery. If unavailable, source the correct display connection or choose another evidence-based diagnostic; do not rewrite solely because discovery failed.

### Display-route update — 2026-11-04

User confirms no Ethernet cable. Monitor is owned, but its actual model/input is still unknown. Next obtain monitor model or photo of input sockets before specifying a cable. For a confirmed full-size HDMI input, candidate is one micro-HDMI(TypeD) male to full-size HDMI(TypeA) male cable. Circuitrocks [direct product page](https://circuit.rocks/products/micro-hdmi-to-hdmi-cable-for-raspberry-pi-4) displays PHP137,SKU2698 with1m black/2m white options as checked2026-11-04; confirm intended variant/checkout amount. Collection page showed conflicting price/SKU, so do not promise that quote or stock. No purchase or additional display connection has occurred.

If the monitor has only VGA/DisplayPort/USB-C, do not buy this cable on that assumption; identify the correct input and any required active, directional conversion first. An existing TV with HDMI is another usable display if available. See docs/BOM.md conditional diagnostic accessory; excluded from current totals/workbook until selected.

### Explicit discovery retry — 2026-11-05

At user's request, repeated discovery on the verified current PC subnet192.168.1.0/24 (PC192.168.1.48). Neither `sentrion-pi.local` nor `sentrion-pi` resolved. A bounded ping/SSH22 check with longer TCP timeout found8ping-responsive addresses including gateway but no SSH listener. No authentication was attempted. Known neighbors' globally assigned manufacturer prefixes, checked against the official [IEEE MA-L registry](https://standards-oui.ieee.org/oui/oui.csv) in memory, did not identify Raspberry Pi; locally administered addresses remain inconclusive.

This establishes unsuccessful discovery from this PC, not proof of a faulty Pi/card or absence from Wi-Fi. Next confirm the Pi is still powered now with red LED on (last physical observation was2026-11-04). Further troubleshooting should use that result; do not repeat subnet scans without new evidence or treat buying a display cable as the only conceivable next action. Any card inspection requires a safe physical power/card-handling step and must not expose saved Wi-Fi/account credentials. No physical changes, rewrite or installation performed in this retry.

### Current LED and retained-settings check — 2026-11-05

User confirms still powered; green initially described as not lighting, then only a little light. The faint light's color/position is unclear. Ask for red-versus-green identification or a close-up photo of indicators before interpreting brightness. Leave card inserted and power alone for observation. The green ACT light indicates storage activity and may be off when idle; off/dim alone does not establish a fault. Repeating error flashes need their actual pattern counted, not guessed. See [official LED guidance](https://www.raspberrypi.com/documentation/computers/configuration.html#led-warning-flash-codes).

Read-only Windows retained-Imager-settings check confirms `sentrion-pi`, username `sentrion`, SSH enabled with password authentication, Asia/Manila, keyboard us, Manila capital, recommended Wi-Fi country PH, hidden false and mode secure. Saved SSID was compared locally with current Windows Wi-Fi SSID and matches exactly. SSID text and passwords were not displayed or copied into deliverables; password fields were checked only for presence. No registry value was changed. These are PC-side retained settings and are not proof of successful Pi boot or applied files. Do not ask the user to resupply the confirmed account name or SSID.

### LED photo result — 2026-11-05

New photo shows red illumination through the black case near the power cable; the green LED is not discernible. Exposure/glare prevents brightness or supply-voltage judgments. A still photo cannot show whether a light is steady or flashing. No specific boot/power fault is diagnosed from it.

## Step 15 — Prepare an existing-reader boot-file check

Proposed next diagnostic uses the existing Windows card reader, with no additional cable purchase or image rewrite. Reading the card's Windows-accessible boot partition can check whether boot files and any setup markers exist; it cannot by itself guarantee a readable Linux root filesystem or completed boot. No promise of full Linux-log access on Windows.

**Before physical action:** Request the user's agreement for one power-off/card transfer. We cannot issue a clean OS shutdown because SSH is unreachable. Cutting power to a running Pi can corrupt card files even if ACT is currently dark. Explain that risk rather than implying a dark LED guarantees safe power loss. Do not power-cycle repeatedly or describe this check as risk-free.

After agreement, guide one physical checkpoint at a time:

1. User disconnects supply at the wall; keep card in place until all lights are off. Wait for confirmation before proceeding.
2. Only with all power disconnected, remove card gently and reconnect it through existing reader to Windows. Cancel any format/repair/initialize offer; report connection before tools inspect it.
3. Re-identify disk/partitions read-only; do not assume old E:/disk2 still applies after Linux image writing. Inspect relevant boot-file names and safe, allowlisted settings/markers without printing raw setup scripts, network config or passwords. Never execute a setup script from the card on Windows.
4. Report actual findings before choosing a repair or rewrite. Any write/install/external file change needs applicable approval. Keep the original card unchanged during inspection.

**Authorization update2026-11-05:** User says proceed after risk explanation, authorizing one power-off/card transfer and read-only inspection. No need to ask that permission again. First instruction is unplug adapter from wall, leave card inserted, wait about10seconds, then confirm all lights off. Actual power-off/removal/inspection remains unconfirmed. No rewrite or installation authorized.

### Router route resumed and 5GHz question — 2026-11-05

User said **wait before that** before confirming power-off, and opened the router in a browser. Hold the Step15 card-transfer plan and keep Pi powered/card inserted. Firefox window title indicates HG8145V5. Computer-use state capture stopped because browser URL-policy enforcement is unsupported for this Windows browser; no router contents were observed and no settings/login were automated. Use a user-supplied screenshot to identify the client-list menu; do not bypass the tool restriction.

User asks whether connecting to a5G-named Wi-Fi network could explain the failure. [Official Pi4 specifications](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) confirm2.4GHz and5GHz802.11ac support. A router's5G label typically refers to5GHz Wi-Fi,not cellular5G. Band support alone does not guarantee a particular connection. Official [WLAN-country guidance](https://www.raspberrypi.com/documentation/computers/configuration.html#enable-wireless-networking-set-wlan-country) explains that country controls allowed channels. Retained Imager recommendation is PH; actual running Pi country/application is unverified.

Filtered read-only Windows check shows current PC connection802.11ac,5GHz,channel149,WPA2-Personal,CCMP,signal88%. This is PC-side information and does not measure Pi signal or prove its association. Channel/country/connection issues are hypotheses,not a diagnosed cause; do not claim channel149 is invalid or change router security/country without evidence. Next inspect router client list before choosing a2.4GHz test or returning to the approved-but-deferred card inspection. No setting change/rewrite has occurred.

### Router screenshot navigation — 2026-11-05

User screenshot confirms authenticated PLDT/Huawei HG8145V5 router UI on **WLAN > 2.4G Basic Network Settings**. This is a configuration form, not the device list. Do not change SSID/password/security, click Apply/Delete/New, or start WPS. Do not treat the editable Number of Associated Devices limit as a measured live client count. Password remains hidden; no SSID/password text is copied to these notes.

Next click the observed **Status** tab in the top navigation, immediately left of **WAN**, and return a screenshot of the resulting page/sidebar. Identify the actual device-list submenu from that screen rather than inventing a path. Keep Pi powered/card inserted and do not resume deferred power-off/card transfer. Current Windows browser automation cannot inspect the page due its URL-policy restriction; use screenshots without bypassing it.

### Status sidebar result — 2026-11-05

Screenshot now shows **Status > Home Network Information**. Sidebar includes **User Device Information**, immediately below **Device Information**, and **DHCP Information** above it. Current central table is about external access points, not proof that no Pi is connected.

Next click observed **User Device Information** and send the resulting device list. Look for `sentrion-pi` and its local IP address. Do not change/block/delete clients or modify settings. If the table does not identify the Pi, inspect actual entries before choosing the visible DHCP Information fallback. No Pi address has been observed yet. Keep the Pi powered/card inserted.

### All router device pages reviewed — 2026-11-05

User supplied pages1/4 through4/4 of User Device Information. No entry is named `sentrion-pi` or explicitly identified as Raspberry Pi. **Hans192.168.1.48** is this Windows computer. An online unnamed device at **192.168.1.128** has no type; a different unnamed entry reports Android. Do not guess Pi identity from an empty hostname.

Targeted read-only TCP22 check of192.168.1.128 was **actively refused**. No login or credential attempt. This does not identify its OS or prove whether it could be a Pi with SSH off; it is not a confirmed Pi address.

Next click the observed **DHCP Information** item in the Status sidebar and return the lease table. DHCP is the router service that assigns local IP addresses; its table may supply hostname/lease evidence absent from the prior view. Inspect evidence without deleting/blocking clients or changing network settings. If no usable identity appears, return to the previously approved card-check plan with separate power-off/removal confirmations. Keep Pi powered/card inserted for this remaining router check.

### DHCP review completed; return to Step 15 — 2026-11-05

DHCP Information screenshot shows14Wi-Fi leases,239addresses remaining and no `sentrion-pi` or confirmed Pi identity. Address-pool exhaustion is not supported. Unknown192.168.1.128 seen earlier is absent from this lease table; do not treat it as the Pi. Router evidence plus failed discovery leaves actual association/boot unconfirmed; it does not establish faulty hardware.

The router inspection that deferred card handling is now complete. Resume the user's existing authorization for one power-off/card transfer/read-only inspection,without asking for the same permission again. First instruction only: **unplug the Pi adapter from the wall,leave the microSD inserted,wait about10seconds,and confirm all LEDs off**. Wait for physical confirmation before removal/reader transfer. No power-off/removal or card inspection has happened as far as reported. No router settings were changed.

### Step 15 power-off confirmed — 2026-11-05

User answered yes to all-lights-off checkpoint. Leave the Pi supply unplugged. Next gently pull the microSD straight out of the Pi's slot (Pi4 has no push-to-release latch),place it in existing reader and connect reader to Windows. If a full-size SD adapter is used,seat microSD in adapter before inserting that into compatible reader. Cancel any Windows format,repair or initialize offer so inspection does not change the card.

**Check before continuing:** User reports reader/card connected before tools inspect. Then re-identify current disk/partitions read-only;do not rely on earlier E:/disk2,which may change after image writing/ejection. No transfer or file inspection result yet. Keep Pi unpowered throughout inspection;no rewrite authorized.

### Step 15 inspection result — 2026-11-05

User confirms reader connected. Inspection completed read-only;see [CARD_INSPECTION.md](CARD_INSPECTION.md) for evidence and limitations. Pi4 boot files and actual card setup fields are present,including matching network name,PH and SSH activation command. Windows denies unelevated raw access to Linux startup logs;boot cause remains unknown. Bootfs warning was recorded without repair. No card files changed.

Proposed next step is a2.4GHz experiment without erasing OS,using supported cloud-init configuration files and a new matching instance ID to rerun setup. This requires a separate explicit card-write approval,exact2.4GHz network name and same/different-password confirmation. Do not request a password in chat,copy secret-bearing config into Git,or make changes under the old read-only approval. Keep Pi unpowered/card in reader while deciding.

## Step 16 — Approved 2.4 GHz retry configuration

2026-11-05: User authorizes proposed card change using this PC's current network and confirms same Wi-Fi password. Preflight confirms Windows is on **2.4GHz,channel4**,with a distinct network name from the original5GHz target. Card identity checked again:sole matching USB31.3GB,bootfs512MiB,not Windows/system disk.

Executed [Set-PiWifi24Retry.ps1](../tools/Set-PiWifi24Retry.ps1) first without arguments for read-only preview,then `-Apply` under approval. No packages/privileged access required. Script uses current connected SSID,retains original password line,changes network-config access-point key and refreshes consistent NoCloud instance IDs in meta-data/cmdline.txt. This requests initial setup again;user-data/account settings remain unchanged. No image rewrite/format/repair or root-partition modification. All changed files were read back and matched prepared content. Originals are backed up on the same card in `.sentrion-before-wifi24-b5e24c57`;that folder contains private configuration and must not be copied into Git.

### Return card to Pi before the retry boot

1. Keep Pi power disconnected. In the Windows taskbar notification area,use **Safely Remove Hardware and Eject Media** (USB icon;may be under the small up-arrow for hidden icons),then eject the **Mass Storage Device** card reader. If Windows says it is in use,stop and report;do not force removal. Cancel any format/repair offer.
2. After Windows confirms safe removal,unplug reader,remove microSD and return it to the Pi's underside slot. Printed label faces away from the circuit board;slide gently without forcing. Pi remains unpowered during this card transfer.
3. Report card seated before connecting power. No need for a monitor/Ethernet purchase to perform this experiment.

**Check before continuing:** Safe ejection/card seating user-confirmed;then guide power-on and wait for physical result before rediscovery. Readback success establishes only the prepared setup files,not that Pi boots or connects. The source of the earlier failure remains unproven.

### Safe ejection completed without a visible menu — 2026-11-05

User reports no eject option. Recheck found bootfs had no drive letter and identified exact USB reader via disk-to-PnP mapping. Executed [Eject-PiReader.ps1](../tools/Eject-PiReader.ps1),using Microsoft's [CM_Request_Device_EjectW](https://learn.microsoft.com/en-us/windows/win32/api/cfgmgr32/nf-cfgmgr32-cm_request_device_ejectw) standard safe-removal API on the verified reader parent. Windows accepted;matching card no longer appears in Get-Disk. Reported SafeToUnplug true,ForceUsed false. No administrator elevation,disable,forced dismount or formatting.

The user can now unplug the reader physically and transfer microSD back into the still-unpowered Pi. Wait for seated confirmation before power-on. Do not ask them to find the missing eject menu again or confuse safe Windows ejection with a successful Pi boot.

## Step 17 — Retry boot with the prepared 2.4 GHz card

2026-11-05: User confirms card is seated after successful safe ejection. No retry power-on yet reported.

**Before power:** Keep Pi on stable,dry,nonconductive support;no loose metal or jumper leads touching pins. Leave camera/sensor/GPIO circuits disconnected. Use the previously inspected5.1V/3A USB-C supply. Do not move/remove microSD while powered.

1. With adapter unplugged from wall,connect its USB-C plug to Pi4 power socket beside the micro-HDMI sockets. Then plug adapter into suitable wall socket/power strip and switch on. Pi4 starts automatically.
2. Allow about **5minutes** for setup to run again. This is an observation interval,not a promised completion deadline;it may restart during provisioning. Leave power/card connected and avoid repeated unplugging.
3. Observe red power and green activity lights. Report that power is on,the wait completed,and light behaviour. Lights alone do not prove Wi-Fi/OS success. Keep Pi powered while the next Windows/router discovery runs.

**Check before continuing:** Await user physical result before network probing. PC should remain on intended2.4GHz network;recheck current connection before discovery. If there is smoke/sparking/burning smell,switch off at wall if safe and report rather than handling a faulty board. Otherwise do not unplug simply because ACT becomes idle.

## Step 18 — Check the 2.4 GHz retry result

2026-11-05: User reports green light gone again and explicitly confirms at least5minutes continuously powered since retry. Green ACT can be idle;the light alone does not decide boot success. PC rechecked on2.4GHz/channel4,WPA2,192.168.1.48/24. Neither hostname form resolves. Fresh bounded ping/SSH22 scan after this network change found6ping-responsive addresses including gateway and no SSH listener. No login attempted. Switching network has not restored access from this PC;actual Pi association/boot still not established.

Keep Pi powered/card seated. On router,reopen **Status > DHCP Information** and refresh with **F5** (or reselect the page if it does not refresh). Send current lease-table screenshot;the earlier table predates the modified card's boot. Look for `sentrion-pi` or evidence identifying a new lease. Do not modify/delete clients or change router settings.

**Check before continuing:** Determine whether a newly identified Pi lease exists despite SSH being unavailable. If yes,check that exact address. If not,obtain actual boot/log evidence through display or a suitably approved Linux reader rather than repeatedly rewriting/scanning or declaring5GHz the sole cause. No extra card/network change has been made at this checkpoint.

### Alternate checks after the retry — 2026-11-05

User asks whether another connectivity check is possible. Tried IPv6 local-neighbor discovery and an all-nodes query on the active Wi-Fi interface. PC has no IPv6 address and its `ms_tcpip6` binding is disabled;transmit fails locally. This test is unavailable on this PC,not evidence the Pi is offline. No binding/security/firewall setting changed. IPv4 mDNS query for Pi hostname plus SSH/workstation service announcements returned no replies. No package installed.

Next distinct check is router **Status > WLAN Information**,an actual sidebar item observed in user screenshots. Request that screen and inspect available radio/station tables before inventing a further submenu. Wi-Fi association (joining the radio network),DHCP lease (receiving an IPv4 address) and SSH (a remote command service) are separate stages. An association table may show a station even without a lease;unknown client identity still needs evidence. Do not change router settings or make an unsupported claim that Pi is present/absent from name alone.

If this adds no usable evidence,choose actual boot/log observation rather than another unchanged scan:local display with suitable cable or an explicitly approved suitable reader for Linux logs. Existing Windows raw access was denied without elevation. Do not install software,enable IPv6,modify router/card or power-cycle merely to try alternatives without applicable authorization.

## Step 19 — Prepare Windows access to Linux startup logs

User asks how to enable log checks. Follow [READ_STARTUP_LOGS_WINDOWS.md](READ_STARTUP_LOGS_WINDOWS.md). No installed suitable reader found in checked paths/no registered WSL distro. Official free Linux Reader5.3 installer downloaded into ignored project tmp/downloads and Authenticode signature verified Valid;not executed or installed. Explicit installation approval is pending because this installs outside the project.

Normally the task is reading logs already produced if startup reached cloud-init,not enabling logging from Windows. Targets are `/var/log/cloud-init.log` and `/var/log/cloud-init-output.log` on ext4,not bootfs. After reader setup,guide another controlled power-off/transfer with physical confirmations;do not remove currently powered card. No log access/export or diagnosis yet. Raw logs must remain private/ignored and be sanitized before tool/chat display.

### Linux laptop option for Step 19 — 2026-11-05

User asks if their Linux laptop would be easier. Recommended for native ext4/startup-log inspection;Windows Reader installation is now deferred and remains unexecuted. Follow [READ_STARTUP_LOGS_LINUX.md](READ_STARTUP_LOGS_LINUX.md). First obtain distribution/version (`cat /etc/os-release`,read-only,no sudo). Do not move the currently powered card or guess mount commands/device names. Mounting/permissions and physical handling follow after actual laptop details. Using laptop just for diagnosis does not require migrating this repository/chat or installing Pi development software.

## What follows this checkpoint

Current continuation is Linux-laptop log access:obtain distribution/version and reconfirm hardware state before power-off/card handling,device identification or mount commands. OS64-bit image was written and2.4GHz retry tested without restoring access;running release/boot remains unverified. Do not repeat completed setup/scans or automatically rewrite the card. No detector application/sensor circuit is implemented.

Headless access means operating the Pi from this computer over the local network without a separate Pi monitor or keyboard. Wi-Fi settings are now reported entered; actual connectivity remains to be tested after boot. Keep Wi-Fi/account passwords private and enter them locally, outside project files and chat.

No Linux setup commands or `dialout` group changes apply to preparing the card on this Windows PC. The user operated Imager to install the OS; the assistant ran only read-only local storage checks and project-file edits, with no assistant-run package installation or flashing. Any later Linux commands target the Pi and will be explained before use.

## Official references

Checked 2026-11-04. The manufacturer describes boot media, model-specific power supplies and headless setup in [Getting started](https://www.raspberrypi.com/documentation/computers/getting-started.html). The Windows installer is linked from the official [Raspberry Pi software page](https://www.raspberrypi.com/software/). Use the official download when we reach the software step.
