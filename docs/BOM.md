# Sentrion SDS200 - reviewed bill of materials

PHASE 1: MATERIALS BUYING. Initial price check: 2026-10-22; A04–A12 quotes updated 2026-10-24, Asia/Manila. All costs are Philippine Peso (PHP).

This is the Phase1 BOM artifact;the project itself is now Phase2 initial setup/log diagnosis. See PROGRESS.md and docs/CONTINUE_ON_ANOTHER_PC.md for current progress. Table/workbook values remain reference allowances pending ownership reconciliation.

**Current budget: Table A PHP20,864.00; priced Table B items PHP1,155.00; known line sum PHP22,019.00 + B01 printing cost TBD.** Excel flags the final and grand totals as INPUT NEEDED until the printing cost is entered. B09 includes a provisional PHP98 screenshot quote; label suitability remains pending. Earlier dated amounts are historical; B03/B04/B08 candidate quotes and conditional allowances remain subject to their noted checks.

## Scope and architecture

### Conditional display accessory for current diagnosis — 2026-11-04

At the time of this candidate check,router admin was unavailable;user subsequently accessed router status/client pages without identifying Pi. Ethernet cable remains unowned. User has a monitor,but its input must be confirmed before buying anything. Cable remains an unselected alternative;current next step is Linux-laptop log reading. **Excluded from TableA/TableB/workbook totals**,not a permanent detector architecture change.

| Item | Exact connection / quantity if selected | PH price evidence | Purpose and buying condition |
| --- | --- | --- | --- |
| Micro-HDMI-to-HDMI display cable | Micro-HDMI(TypeD) male at Pi4 to standard HDMI(TypeA) male at monitor;1 cable,1m candidate | [Circuitrocks direct listing](https://circuit.rocks/products/micro-hdmi-to-hdmi-cable-for-raspberry-pi-4),PHP137 displayed,SKU2698,checked2026-11-04;1m black/2m white options. Collection/search render conflicted(PHP105/SKU2612); verify exact variant,price,stock and shipping before purchase | Shows actual boot screen/errors when network diagnosis is inconclusive. Only fits this route if monitor has full-size HDMI input. Obtain monitor model/input photo first. If a regular HDMI cable is already owned, a micro-HDMI male to HDMI female adapter is an alternative, not an additional duplicate purchase; exact PH adapter quote not researched. |

Pi4 uses micro-HDMI rather than mini-HDMI; manufacturer connection guidance is in [Getting started](https://www.raspberrypi.com/documentation/computers/getting-started.html). Borrowing a compatible cable/display is sufficient for diagnosis. No purchase, extra cost in totals or completed screen test is claimed.

**Physical inventory, 2026-11-04:** User confirms Pi4 ModelB4GB (model visible; RAM per user), a supply labelled KSA-15E-051300HU/5.1V3A with flat pins, and an empty Silvertec32GB microSDHC marked UHS-I/A1/Class10. Use this card for the initial setup attempt; no new card needed for this step. High-endurance suitability, real capacity and reliability remain unverified. Actual HU supply supersedes earlier HE assumption: **do not buy the A12 round-to-flat adapter if its flat plug fits the intended socket normally.** Table/workbook amounts remain the saved purchase-plan reference, not remaining purchases or actual spending. Reconcile A02 and the obsolete PHP39 plug allowance together with the workbook after initial setup; no workbook prices/quantities have yet changed.

The user confirmed that **camera detection, MQ-2 sensing and battery backup are required**. The paper specifies one indoor Raspberry Pi 4 system using Python and OpenCV (a library that processes images), with a USB/IP camera, audible/visual alerts, Wi-Fi and event snapshots. This BOM budgets a USB camera because no existing CCTV model or stream was supplied. A Raspberry Pi is a small Linux computer; its USB and network interfaces suit this software better than an Arduino/ESP32 microcontroller. An ADS1115 analog-to-digital converter (ADC) translates the MQ-2 voltage into numbers the Pi can read.

**Recommended backup:** a closed, ready-made external CyberPower VP700ELCD UPS (uninterruptible power supply) powers the official Pi USB-C adapter. Its battery and charger are already inside. The existing router/ONT can also be plugged into suitable battery-backed outlets, subject to connector and load checks. This adds size and cost but avoids a beginner assembling loose lithium cells. The UPS stays outside the detector enclosure. This recommendation awaits BOM approval; it is not a purchase.

Assumptions:one indoor camera and existing network. Windows used for initial OS setup;Linux laptop now proposed for logs,distribution pending. Current tables/workbook remain a dated purchase-plan reference with owned project parts not yet reconciled. Budget,deadline,room size and backup duration remain unspecified. Camera/frame rate,detection method and alarm logic still need validation;buying parts does not establish performance.

## Price basis and buying checks

**LISTED** means a retailer price was observed; it is not a guaranteed available offer. **ESTIMATE** means no exact current Philippine quote was verified and you must confirm the amount. Shipping, unknown import costs, tools, installation labour, router/ONT purchases and certified smoke alarms are excluded from materials totals. Do not count workshop tools or optional alternatives in the grand total.

The exact Makerlab 4GB Pi listing is PHP 10,449.00 and unavailable; e-Gizmo lists PHP 4,800 including VAT, also unavailable. The higher observed listing is used as a cautious reference while sourcing. The original official-adapter reference is out of stock; TECHDIY now supplies a PHP 660 screenshot quote, pending actual label/plug confirmation. A08 now uses the user-sourced ENG LAB.ph listing; confirm live checkout stock/price. The camera is an estimate. Obtain live quotes before ordering. A PHP 699 Makerlab adapter listing currently selects OKDO despite its official-Pi title; it is not silently substituted.

## Table A: Prototype phase materials

These are purchases made during Phase 1 for Phase 2 prototyping. Camera, backup and cooling are included now so all required functions can be tested before final construction.

| # | Item name | Exact model/spec | Qty | Est. unit price (PHP) | Subtotal (PHP) | Where to buy (PH) | Why it is needed and how it makes the project work |
| --- | --- | --- | --- | ---: | ---: | --- | --- |
| A01 | Raspberry Pi 4 Model B | 4GB RAM; 40-pin header; USB, Wi-Fi and microSD; board only | 1 pc | 10449.00 (LISTED / OUT OF STOCK) | 10449.00 | Makerlab PH; quote first | Runs Linux and OpenCV to analyse video and control alerts. A small microcontroller cannot run this chosen software stack. |
| A02 | High-endurance microSD | SanDisk High Endurance 32GB SDSQQNR-032G; genuine card | 1 pc | 1395.00 (LISTED) | 1395.00 | DataBlitz PH | Stores the operating system, program, logs and snapshots. Without a boot card, the Pi cannot run the detector. |
| A03 | USB camera board and cable | Waveshare OV2710 2MP USB Camera (A), SKU 14121; 1080p, USB 2.0 UVC, 145° diagonal; cable included | 1 set | 2500.00 (ESTIMATE) | 2500.00 | Baseline: PH importer quote pending. [Shopee generic alternative, PHP 268 — UNVERIFIED](https://shopee.ph/USB-Camera-For-Raspberry-Pi-2-Model-B-B-A-3-3B-Pc-i.20469516.1308983059?extraParams=%7B%22display_model_id%22%3A32045113822%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-22120-n6s1qjrv7okv60) | Provides the video frames for smoke analysis from the first prototype. Reuse the same camera so final lens and exposure behaviour stay consistent. Candidate alternative is not yet confirmed equivalent; see review below. |
| A04 | MQ-2 sensor module | MQ-2 on assembled 4-pin board; VCC/GND/AO/DO required; nominal 5V heater; ENG LAB.ph MQ-2 variation | 1 pc | 89.00 (SCREENSHOT QUOTE) | 89.00 | [ENG LAB.ph / Shopee — select MQ-2](https://shopee.ph/ENGLAB%E2%98%85MQ-Series-Gas-Sensor-Detection-Modules-for-Gas-Detection-Smog-Alcohol-Methane-Carbon-monoxide-AIR-Quality-Hydrogen-Propane-Detection-Sensor-MQ-2-3-4-5-6-7-8-9-135-i.1021339444.17295791325?extraParams=%7B%22display_model_id%22%3A231949058250%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbk0-lks54h6z1irc91) | Adds a local gas/smoke response alongside vision. Its heated sensing element needs clean airflow and cannot detect smoke remotely across the camera view. Verify delivered pin labels before wiring. |
| A05 | ADS1115 ADC breakout | ADS1115 16-bit, 4-channel I2C; 3.3V in this design; ADDR to GND = 0x48; loose header shown, solder before use | 1 pc | 49.00 (LISTED / SCREENSHOT) | 49.00 | [Circuitrocks / Shopee — ADS1115](https://shopee.ph/ADS1115-16-Bit-ADC-Module-4-Channel-Programmable-Gain-Amplifier-I2C-Arduino-ESP32-Raspberry-Pi-i.20469516.936425709?extraParams=%7B%22display_model_id%22%3A80024629775%2C%22model_selection_logic%22%3A3%7D&image_ids=a5c8493527960af4d0ba9397035849d5) | Converts the MQ-2 analog voltage to digital readings the Pi can use. The Pi has no built-in analog input; a level shifter alone cannot do this. |
| A06 | Resistor assortment | 300 Pcs Box; 1/4W metal-film axial resistors; ±1% listed; 30 values × 10 each, including 470Ω and 10kΩ | 1 pack | 68.00 (SCREENSHOT QUOTE) | 68.00 | [fulabs.ph / Shopee — 300 Pcs Box](https://shopee.ph/300pcs-600pcs-1-4W-Resistance-1-30-Kind-Each-10pcs-20pcs-Film-Resistor-Assorted-Kit-with-box-i.1367148707.26913804058?extraParams=%7B%22display_model_id%22%3A246760953056%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134253-8260z-mkwpstqtmxhf04&rModelId=246760953056&vItemId=53656276135&vModelId=282412317684&vShopId=1257811163) | Two 10kΩ resistors halve MQ-2 AO; one additional 10kΩ pulls buzzer I/O to 3.3V for off bias. Two 470Ω resistors limit LED current. The kit has enough of each. |
| A07 | Ceramic capacitors | 100nF = 0.1µF (104); 50V ceramic disc, two wire leads; sold per piece; minimum six | 6 pcs | 3.00 (SCREENSHOT QUOTE) | 18.00 | [The Library / Shopee — 100nF/0.1uF](https://shopee.ph/330pF-0.1uF-Ceramic-Capacitor-50V-Capacitors-DIY-Electric-Electronics-Project-i.172443349.5245020841?extraParams=%7B%22display_model_id%22%3A70500893090%2C%22model_selection_logic%22%3A3%7D&image_ids=d62780b8b873ab4dfe2f9f6dfaf28c0e) | Filters small voltage disturbances at the ADC supply and divided sensor input. Two allocated, four spares; without filtering, noise can disturb measurements. |
| A08 | Active buzzer module | ENG LAB.ph Active variant; seller 3.3–5V, LOW trigger; use 3.3V VCC in this design; onboard transistor visible; current/SPL unverified | 1 pc | 65.00 (SCREENSHOT QUOTE) | 65.00 | [ENG LAB.ph / Shopee — Active](https://shopee.ph/ENGLAB%E2%98%85Active-And-Passive-Buzzer-Module-Low-Level-Trigger-Beeper-Alarm-Module-i.1021339444.23679828092?extraParams=%7B%22display_model_id%22%3A109001349855%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbky-llh8n5fwik38f4) | Built-in oscillator produces the alarm tone; onboard driver switches buzzer current. GPIO carries the I/O control signal only. LOW on, HIGH off. Validate current, startup and loudness. |
| A09 | Red and green LEDs | Two separate 5mm diffused LEDs, one red and one green; bare LEDs with two wire leads | 1 pair | 10.00 (ESTIMATE) | 10.00 | PHYSICAL STORE — user preference; shop and quote pending; see shopping table below | Shows alarm versus operating state even when the buzzer is quiet. Each LED needs its own 470Ω resistor from A06. |
| A10 | 5V cooling fan | 30×30×10mm DC 5V selected; connector/two-wire arrangement to inspect; rated current pending; retain 0.20A planning allowance | 1 pc | 64.00 (SCREENSHOT QUOTE) | 64.00 | [Welcome Home & Living Store / Shopee — 30×30×10mm, DC 5V](https://shopee.ph/Mini-Quiet-Ventilador-120mm-90mm-80mm-70mm-60mm-50mm-40mm-30mm-Fans-DC-12v-24v-5v-Sleeve-Bearing-Industrial-Cooling-Computer-Accessories-12v-Fan-12v-DC-5V-Fan-i.284375657.24893871579?extraParams=%7B%22display_model_id%22%3A224083610443%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7ras8-m80hc172zealc5) | Moves air over the Pi during continuous video processing. Inadequate cooling can reduce processor speed and delay frame analysis. |
| A11 | Pi 4 heatsink set | Circuitrocks Pi 4B kit, four pieces; Blue selected; listed sizes 14×14×6, 14×10×6, 9×9×5mm; adhesive included, thermal type to confirm | 1 set | 18.00 (SCREENSHOT QUOTE; CHECKOUT CHECK) | 18.00 | [Circuitrocks / Shopee — Pi 4 kit, Blue](https://shopee.ph/Circuitrocks-Heatsink-Kit-For-Raspberry-Pi-4-With-Adhesive-i.20469516.3716155051?extraParams=%7B%22display_model_id%22%3A62448204981%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-22120-51eyur5oxkkve0) | Transfers heat from chips into the fan airflow. Confirm thermal mounting pads and safe clearance before installation; inspect actual fit and test cooling. |
| A12 | Official Pi supply + plug adapter | Official Pi 15W USB-C, 5.1V/3A, 100–240V AC, HE round-pin; plus OMNI WRA-001 round-to-flat plug, 6A 250V AC | 1 set | 699.00 (660 screenshot + 39 listed reference) | 699.00 | [TECHDIY supply](https://shopee.ph/Raspberry-Pi-4B-5V3A-TYPE-C-Interface-15W-Power-Suitable-for-Raspberry-Pi-4th-Generation-B-Type-Official-Power-Supply-i.306592453.21811688321?extraParams=%7B%22display_model_id%22%3A180662749854%2C%22model_selection_logic%22%3A3%7D&image_ids=a5d1d0de2c898f4eb1de453426844e3b); [plug reference — buy in person](https://www.officewarehouse.com.ph/product/9476/) | Stable Pi/peripheral power; plug adapter fits round-pin supply to flat-pin socket. Reuse both with UPS. Actual supply label/identity and physical plug fit pending. |
| A13 | Packaged external UPS | CyberPower VP700ELCD; PH 230V version, 700VA/390W, internal battery, USB HID data cable and mains cord | 1 unit | 4650.00 (LISTED / CONFIRM VARIANT) | 4650.00 | PC Express / CyberPower PH | Keeps the Pi adapter powered during an outage. Its packaged charger and battery avoid building a lithium charging circuit; it can also supply the existing router. |
| A14 | Solderless breadboard | MB-102 style, 830 tie points; check split power rails; no plug-in power regulator needed | 1 pc | 120.00 (ESTIMATE) | 120.00 | Makerlab / Circuitrocks / Shopee PH | Holds the ADC, resistors and LED circuits while connections are checked. Route only small peripheral currents here, never the Pi main supply. |
| A15 | DuPont jumper bundles | 40 wires per bundle, 20cm, 2.54mm; one each M-M, M-F and F-F | 3 bundle | 50.00 (ESTIMATE) | 150.00 | Makerlab PH / Shopee PH | Connects the Pi header, modules and breadboard. All three end types avoid forcing incompatible pins together during component tests. |
| A16 | USB microSD reader | C286 USB microSD reader; Makerlab MLE03098; host-computer use | 1 pc | 50.00 (LISTED) | 50.00 | Makerlab PH | Lets the Linux computer write the operating system to the card. Without a compatible reader or built-in card slot, the Pi cannot be prepared. |
| A17 | Momentary push buttons | 6 × 6mm, normally open tactile switches; prototype shutdown/test inputs | 2 pc | 5.00 (ESTIMATE) | 10.00 | Physical store — shop/quote pending; see shopping table | Provides deliberate test and safe-shutdown requests for later software. These inputs avoid routinely pulling power from a running microSD system. |
| A18 | Peripheral fuse and holder | Inline low-voltage holder + 500mA fast-blow fuse; covers 5V fan and MQ-2 branch only; buzzer now on 3.3V | 1 set | 60.00 (ESTIMATE) | 60.00 | Physical store — shop/quote pending; see shopping table | Limits fault current in the external 5V peripheral wiring. It does not carry the Pi main input and is not a replacement for safe wiring. |
| A19 | Prototype base and Pi case | Acrylic10×12in×3mm + MakerLab Pi4 black case (fan contents unconfirmed) + base/case screws, insulating spacers and feet | 1 set | 400.00 (base150 + case150 + hardware100 ESTIMATE) | 400.00 | [Selected MakerLab case](https://shopee.ph/Raspberry-Pi-4-Black-Case-with-Fan-i.18252381.11504087990?extraParams=%7B%22display_model_id%22%3A82034797060%2C%22model_selection_logic%22%3A3%7D&image_ids=527f288ec8b8b1a2df7f1ac2e7440e96); acrylic link in review; physical-store mounting hardware; shop/quote pending | Supports and protects Pi/prototype boards. User will inspect bundled fan on arrival; retain A10 standalone fan until contents are known. Check fit and wire access before assembly. |

**Table A total: PHP 20,864.00**

## Physical-store shopping table

The physical-store list covers **A09 LEDs, the A12 plug adapter, A17 push buttons, A18 fuse/holder, A19 mounting hardware, B03 header strips, B05 wire and B12 panel buttons** (2026-10-24). These items are already included once in their respective Table A or Table B rows. Shop, actual price and purchase status are not yet confirmed. The Excel workbook has the same list on its **Physical Store** sheet.

| BOM item | Part to ask for | Exact specification | Qty | Status |
| --- | --- | --- | ---: | --- |
| A09 | Red LED | 5mm diffused red indicator LED, bare through-hole part with two wire leads | 1 pc | To buy in a physical store |
| A09 | Green LED | 5mm diffused green indicator LED, bare through-hole part with two wire leads | 1 pc | To buy in a physical store |
| A12 (plug) | Historical round-to-flat plug reference | OMNI WRA-001 / WRA-001-PK,6A250V AC;original HE-supply plan | 1 pc reference | NOT NEEDED for actual HU flat-pin supply if it fits socket. PHP39 remains only in unreconciled workbook/reference totals;do not buy for current setup. |
| A17 | Momentary tactile push buttons | 6×6mm, normally open, through-hole, 4 wire legs; one TEST and one SHUTDOWN | 2 pc | To buy in physical store; PHP5 each / PHP10 total ESTIMATE |
| A18 | Inline fuse holder + matching fuse | 5×20mm inline holder with insulated wire leads + 500mA (0.5A) fast-blow fuse; confirm 5V DC suitability and fit | 1 set | To buy in physical store; PHP60/set ESTIMATE |
| A19 (hardware) | Nylon mounting kit | Assorted M2.5/M3 spacers/standoffs with matching screws/nuts; actual sizes/lengths matched to case/layout | 1 set | To buy in physical store; part of combined PHP100 allowance |
| A19 (hardware) | Adhesive rubber feet | Self-adhesive rubber feet for acrylic base; size/height to suit layout | 4 pc | To buy in physical store; part of same PHP100 allowance |
| B03 (female strip) | Female PCB header strip | 1×40 sockets, single row, straight through-hole solder legs, 2.54mm pitch | 1 strip | To buy in physical store; actual price/shop pending; included in full B03 kit allowance |
| B03 (male strip) | Male PCB header strips | 1×40 pins each, single row, straight through-hole,2.54mm; one forms2×20 GPIO grid, second other connections/spares | 2 strips | To buy in physical store; shop/price pending; included in same full B03 allowance |
| B05 | 22AWG stranded copper, silicone | Red1m + black1m + orange1m; noCCA | 3m total | Physical store; part of B05 combined150estimate |
| B05 | 24AWG stranded copper, silicone | Yellow0.5m + green0.5m + blue0.5m + white0.5m; noCCA | 2m total | Physical store; same combined150estimate, not extra |
| B12 | Panel push buttons | Non-illuminated, momentary normally open, 2 terminals, panel mount with nut/hardware; one TEST and one SHUTDOWN; colour optional | 2 pc | Physical store; PHP25 each / PHP50 total ESTIMATE, already in B12 |

**A19 hardware allowance: PHP100 COMBINED for the kit and four feet, ESTIMATE, already included in A19 PHP400.** Case and acrylic stay online purchases. Actual shop/quote pending; reconcile reusable hardware before buying B06 extras.

**A17 allowance: PHP10 total (2 × PHP5), ESTIMATE, already included once in Table A.** Shop/actual quote pending. Update Excel I22 with the actual unit price; G22 stays 2.

**Allowance for both: PHP 10 total, ESTIMATE.** This is not an additional charge or a verified store quote. After obtaining a quote, update the price for the pair in Excel **BOM Summary I14**, keeping quantity G14 at one pair. Each LED uses its own 470Ω resistor from the already-listed A06 kit. Reuse these same LEDs in the final build with B07 holders.

Tell the shop: “One red and one green 5mm diffused indicator LED, each with two wire leads.”

## Table B: Main product phase materials - additional items only

Purchase these for Phase 3 after the prototype succeeds.

| # | Item name | Exact model/spec | Qty | Est. unit price (PHP) | Subtotal (PHP) | Where to buy (PH) | Why it is needed and how it makes the project work |
| --- | --- | --- | --- | ---: | ---: | --- | --- |
| B01 | Custom 3D-printed enclosure | User-owned printer; custom shell/lid, material/dimensions/filament use TBD; cooling vents, sensor air access and cable entries required | 1 pc | TBD — input needed | TBD | Print in-house; printer available, consumables unconfirmed | Protects and mounts final electronics. Fit around delivered Pi case/boards; verify material heat suitability, airflow and mounting after prototype testing. |
| B02 | FR4 perfboard | 7×9cm, double-sided FR4; approx. 2.54mm pitch and 1mm holes (seller claims); inspect pad isolation and hole plating | 1 pc | 48.00 (SCREENSHOT QUOTE) | 48.00 | [fulabs.ph / Shopee — select 7×9cm](https://shopee.ph/FR4-Universal-Protoboard-PCB-Double-Sided-i.1367148707.27114059630?extraParams=%7B%22display_model_id%22%3A217878076022%2C%22model_selection_logic%22%3A2%7D&image_ids=cn-11134207-7ras8-m2bws329golab1) | Replaces breadboard contacts with soldered connections for the low-current interface. An unsecured breadboard is unsuitable for a permanent installation. |
| B03 | Socket/header kit | 2.54mm: one1×40 female strip, two1×40 male strips (one forms two1×20 GPIO rows); F-F cablecandidate; boxed header optional | 1 set | 150.00 (FULL-KIT ESTIMATE) | 150.00 | Strips: physical store; [GPIO cablecandidate94](https://shopee.ph/Raspberry-Pi-40-Pin-GPIO-Cable-Male-to-Femal-Or-Female-to-Female-Extension-Cable-Adapter-for-Orange-Pi-Raspberry-Pi-5-4B-3B-3B-i.52451576.27677996896?extraParams=%7B%22display_model_id%22%3A195834642636%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rd5u-m6sex0xahcwr15) | Makes the sensor board replaceable; two aligned male20-pin rows form the cable interface. Correct spacing, pin fit and orientation checks required. |
| B04 | Locking low-voltage harnesses | Five mating prewired pairs; pin counts per harness; ≥1A assembly rating required (candidate unverified); candidate3P30cmTOTAL | 1 kit | 120.00 (ESTIMATE; REPRICE) | 120.00 | [B&K.ph candidate: 3P /1Set45 per pair](https://shopee.ph/30cm-JST-SM-2P-3P-4P-5P-6P-Automobile-Quick-Connect-Wire-Connector-Male-and-Female-Plug-Kit-Motorcycle-i.526902221.15291436961?extraParams=%7B%22display_model_id%22%3A164120865679%2C%22model_selection_logic%22%3A3%7D&image_ids=ff5becaf471caeb9890aa1dd59d398a2) | Connects sensor, buzzer, buttons and LEDs securely for maintenance. Locking pairs resist accidental unplugging; wire gauge/current and final mix need verification. |
| B05 | Copper hookup-wire assortment | Stranded copper, silicone:22AWG red/black/orange1m each;24AWG yellow/green/blue/white0.5m each;5m total | 1 set | 150.00 (ESTIMATE) | 150.00 | Physical store; exact shopping list below / Excel Physical Store | Carries peripheral power and signals over short internal runs. Copper and suitable insulation reduce voltage drop and accidental shorts; Pi keeps its USB-C supply. |
| B06 | Additional board mounting parts, if needed | Nylon M2.5 for Pi, M3 where module holes permit; spacers, washers, screws/nuts; reuse A19 first | 1 allowance | 120.00 (CONDITIONAL ESTIMATE) | 120.00 | Check A19 kit first; source only missing final pieces | Supports final boards clear of enclosure floor. Exact additional pieces depend on reusable kit and final layout; do not automatically buy a second identical kit. |
| B07 | 5mm LED holder pack | Black plastic unpowered clips/bezel, selected0(5MM); advertised20pieces,2used/18spares; panel-hole/thickness to verify | 1 pack | 69.00 (SCREENSHOT QUOTE) | 69.00 | [universing.ph / Shopee — 5MM](https://shopee.ph/UVIG-20PCS-3-5-8-10mm-LED-Plastic-Lamp-LED-Diode-Holder-Black-Clip-Bezel-Mount-i.172102548.2698466736?extraParams=%7B%22display_model_id%22%3A6363764858%2C%22model_selection_logic%22%3A3%7D&image_ids=11934a8753699745866131e6cd1f6dc1) | Holds existing red/greenLEDs securely in panel; protects LED leads from mounting stress. Actual cutout and panel thickness must suit holder. |
| B08 | Grommets and cable clamps | TwoUSB entries + two screw-mountedclamps; actualplug/cable/wallfit pending. Rubber-linedmetalclip and membranegrommet candidates recorded | 1 kit | 100.00 (ESTIMATE; reprice when selected) | 100.00 | [P-clip candidate92–245range](https://shopee.ph/5pcs-Rubber-Lined-Clips-6-60mm-R-type-STainless-Steel-304-Wiring-Hose-Clamp-Cable-Mounting-Fix-Fastener-Hardware-Electrical-Fittings-Water-Pipe-Bracket-Sasa-Hardware-i.1212696620.26268127323?extraParams=%7B%22display_model_id%22%3A311364363257%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7ras8-m2t2dx94d7tz16); grommet link in review below | Entrygrommets protect cable jackets; separately sizedclamps resist pulls reaching Pi connectors. Verify grip, metalclearance and printedmount support. |
| B09 | Wire label/tag pack (provisional) | Selected mixed 10±2pcs pack; writable surface and dimensions unverified. Heat-shrink, ties and mounts USER-OWNED; reuse | 1 pack | 98.00 (PROVISIONAL SCREENSHOT QUOTE) | 98.00 | [Shopee Choice Global — selected 10±2pcs mixed, PHP98](https://shopee.ph/Colorful-Self-Adhesive-Cable-Labels-Nylon-Wire-Stickers-for-Easy-Identification-Ideal-for-Home-Office-i.196214868.43608162560?extraParams=%7B%22display_model_id%22%3A285688745424%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-823qo-mom4ttqfrx8u9c) | Identifies wires/harnesses for maintenance; verify writable surface and thin-wire fit before buying. Existing heat-shrink, ties and mounts reused. |
| B10 | Camera bracket and protective surround | 38mm camera-board bracket/standoffs, lens opening and small impact guard | 1 set | 150.00 (ESTIMATE) | 150.00 | Local maker / hardware shop; quote | Locks the lens direction and protects the exposed camera PCB. Movement changes the scene and can invalidate the tested detection behaviour. |
| B11 | Fan guard and vent mesh | 30mm fan guard, vent mesh and MQ-2 protective standoff/guard with open airflow | 1 set | 100.00 (ESTIMATE) | 100.00 | Hardware / Shopee PH; quote | Keeps fingers and loose wires out of the fan while preserving cooling and sensor airflow. Blocking vents can cause overheating or slow gas response. |
| B12 | Panel push buttons | Two non-illuminated momentary normally open (NO), 2-terminal panel-mount buttons, with mounting nuts/hardware; TEST and SHUTDOWN; mounting dimensions pending | 2 pc | 25.00 (ESTIMATE) | 50.00 | Physical store — user preference; shop/model/quote pending; see shopping table | Replaces bench tactile buttons with accessible panel controls. Momentary contacts send TEST/SHUTDOWN software requests; these do not directly cut the Pi power. |

**B12 sourcing (2026-10-24):** Search `momentary push button normally open 2 pin panel mount`. Buy two non-illuminated switches with two terminals, one for TEST and one for SHUTDOWN. Momentary means the contact closes only while pressed and opens when released; avoid latching/self-locking variants. Red for TEST and black for SHUTDOWN are optional identification choices; labels establish their functions. Choose mounting-hole diameter and supported panel thickness from the actual listing before enclosure design. PHP25 each / PHP50 total remains an estimate, not a verified quote. User chose to proceed to this last row; B10/B11 remain pending, not removed.

**Table B total: PHP1,155.00 in priced items + B01 printing cost TBD (INPUT NEEDED).**

**Reused from prototype:** Reuse A01-A13 electronics, camera/cable, cooling and power/UPS; A06-A07 resistors/capacitors; A09 LEDs; A18 peripheral fuse/holder; and A19 bracket where it fits. Breadboard, jumpers and reader remain workshop tools. Bench tactile buttons are replaced by panel buttons.

**Grand total: PHP22,019.00 in known line values + B01 printing cost TBD (INPUT NEEDED).**

The prototype switches become bench spares when panel switches are installed. This mechanical upgrade is explicit; all reusable sensing, compute, indicator and power parts are purchased only once.

## Price evidence by item

- **A01 Raspberry Pi 4 Model B - LISTED / OUT OF STOCK:** Exact 4GB variant MLE00956: PHP 10,449, unavailable. e-Gizmo shows PHP 4,800 including VAT, also out of stock. Do not treat the lower old listing as an available offer. Sources: [1](https://makerlab.ph/products/raspberry-pi-4-model-b), [2](https://e-gizmo.net/gizmoshop/index.php?product_id=1471&route=product/product)
- **A02 High-endurance microSD - LISTED:** Observed PHP 1,395; confirm genuine stock and final checkout price. SD adapter is not a USB reader. Sources: [1](https://ecommerce.datablitz.com.ph/products/sandisk-high-endurance-32gb-microsdhc-card-with-adapter-for-dash-cams-home-security-cameras)
- **A03 USB camera board and cable - ESTIMATE:** PHP 2,500 allowance, estimated range PHP 2,000-3,500. Manufacturer model/spec verified; no exact PH seller price or stock verified. 145° diagonal replaces the unspecified 120° camera; validate room coverage before ordering. Sources: [1](https://www.waveshare.com/product/ov2710-2mp-usb-camera-a.htm)
- **A04 MQ-2 sensor module - SCREENSHOT QUOTE:** PHP 89 for selected MQ-2, quantity 1, in the user screenshot (2026-10-24). Accessible Shopee page confirms seller/listing and PHP 89–99 range across variants; final checkout price and shipping are unverified. Replaces Makerlab PHP 75 reference (+PHP 14). Exact module pin order/current and sensor manufacturer are not established. Inspect VCC/GND/AO/DO labels and nominal 5V rating on delivery. Use planned ADS1115 and divider; DO unused. Sources: [Shopee](https://shopee.ph/ENGLAB%E2%98%85MQ-Series-Gas-Sensor-Detection-Modules-for-Gas-Detection-Smog-Alcohol-Methane-Carbon-monoxide-AIR-Quality-Hydrogen-Propane-Detection-Sensor-MQ-2-3-4-5-6-7-8-9-135-i.1021339444.17295791325?extraParams=%7B%22display_model_id%22%3A231949058250%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbk0-lks54h6z1irc91), [standard MQ-2 manufacturer reference](https://www.winsen-sensor.com/product/mq-2.html?by=mq-sensor).
- **A05 ADS1115 ADC breakout - LISTED / SCREENSHOT:** PHP 49 in user screenshot and accessible Shopee page (2026-10-24), replacing Makerlab PHP 500 reference, saving PHP 451. Photo shows ADS1115-labelled breakout and loose header strip. Confirm header included; user has soldering equipment, so pre-soldered headers are not required. Verify delivered board, pull-ups and operation before use; exact chip authenticity and breakout schematic are not established by the listing. Sources: [Shopee](https://shopee.ph/ADS1115-16-Bit-ADC-Module-4-Channel-Programmable-Gain-Amplifier-I2C-Arduino-ESP32-Raspberry-Pi-i.20469516.936425709?extraParams=%7B%22display_model_id%22%3A80024629775%2C%22model_selection_logic%22%3A3%7D&image_ids=a5c8493527960af4d0ba9397035849d5), [TI ADS1115](https://www.ti.com/product/ADS1115).
- **A06 Resistor assortment - SCREENSHOT QUOTE:** PHP 68 for selected 300 Pcs Box, quantity 1, in user screenshots (2026-10-24). Enlarged chart lists 470R = 470Ω and 10K = 10,000Ω, ten of each. Listed 1/4W, 1% metal-film kit meets the intended specification; inspect/measure delivered resistors before use. Accessible Shopee page confirms seller and PHP 68–102 range across variants. Replaces PHP 69 reference, saving PHP 1. Shipping/final checkout price unverified. Source: [Shopee](https://shopee.ph/300pcs-600pcs-1-4W-Resistance-1-30-Kind-Each-10pcs-20pcs-Film-Resistor-Assorted-Kit-with-box-i.1367148707.26913804058?extraParams=%7B%22display_model_id%22%3A246760953056%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134253-8260z-mkwpstqtmxhf04&rModelId=246760953056&vItemId=53656276135&vModelId=282412317684&vShopId=1257811163).
- **A07 Ceramic capacitors - SCREENSHOT QUOTE:** PHP 3 each for selected 100nF/0.1uF; screenshot requires minimum six pieces, so six cost PHP 18 provisionally. Two allocated and four spares. Listing title rates 50V; ceramic disc with two leads fits intended use. Separate wholesale text says PHP 3 at quantity ≥7: confirm six-piece unit price at checkout. Accessible Shopee page confirms seller The Library, PHP 3–5 range and wholesale tier. Replaces PHP 20 ten-piece estimate. Source: [Shopee](https://shopee.ph/330pF-0.1uF-Ceramic-Capacitor-50V-Capacitors-DIY-Electric-Electronics-Project-i.172443349.5245020841?extraParams=%7B%22display_model_id%22%3A70500893090%2C%22model_selection_logic%22%3A3%7D&image_ids=d62780b8b873ab4dfe2f9f6dfaf28c0e).
- **A08 Active buzzer module - SCREENSHOT QUOTE:** PHP 65 for selected Active variant in screenshot (2026-10-24). Seller image says 3.3–5V and LOW trigger; pins GND/I/O/VCC and switching transistor visible. Plan 3.3V supply, LOW on/HIGH off and extra 10kΩ I/O pull-up from A06 kit. Exact schematic, input/supply current and sound pressure are unverified; do not copy AF170 values. Web confirms seller and PHP 59–65 mixed-variant range. Replaces PHP 55 reference (+PHP 10). Source: [Shopee](https://shopee.ph/ENGLAB%E2%98%85Active-And-Passive-Buzzer-Module-Low-Level-Trigger-Beeper-Alarm-Module-i.1021339444.23679828092?extraParams=%7B%22display_model_id%22%3A109001349855%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbky-llh8n5fwik38f4).
- **A09 Red and green LEDs - ESTIMATE / PHYSICAL STORE:** User will buy in person; shop not chosen. PHP 10 allowance for one red/green pair remains unverified. See the physical-store shopping table and Excel sheet. Reuse these LEDs with holders in the final enclosure; price is counted once in Table A.
- **A10 5V cooling fan - SCREENSHOT QUOTE / CURRENT PENDING:** Follow-up screenshot (2026-10-24) visibly selects 30×30×10mm and DC 5V at PHP 64, quantity 1. Replaces PHP 75 Makerlab reference, saving PHP 11. Seller drawing shows 30mm frame, 10mm thickness and a 200mm lead illustration; actual connector and mounting-hole pitch unverified. Obtain rated current at 5V or label/specification photo before completing electrical acceptance. Retain 0.20A engineering allowance, not a seller rating. Source: [supplied Shopee link](https://shopee.ph/Mini-Quiet-Ventilador-120mm-90mm-80mm-70mm-60mm-50mm-40mm-30mm-Fans-DC-12v-24v-5v-Sleeve-Bearing-Industrial-Cooling-Computer-Accessories-12v-Fan-12v-DC-5V-Fan-i.284375657.24893871579?extraParams=%7B%22display_model_id%22%3A224083610443%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7ras8-m80hc172zealc5).
- **A11 Pi 4 heatsink set - SCREENSHOT QUOTE:** Selected Circuitrocks four-piece Pi 4B kit, Blue, at PHP 18 in screenshot (2026-10-24). Description explicitly names Pi 4B and lists 14×14×6, 14×10×6 and 9×9×5mm sizes; quantity per size not specified. Adhesive/back glue advertised; thermal conductivity and insulation not specified, so confirm proper thermal tape before fitting. Browser-readable Shopee page returned PHP 55 without a selected colour; confirm Blue checkout price. Budget uses the user screenshot quote, replacing PHP 120 reference and saving PHP 102. Earlier BuildCore.Tool candidate is not selected. Source: [Shopee](https://shopee.ph/Circuitrocks-Heatsink-Kit-For-Raspberry-Pi-4-With-Adhesive-i.20469516.3716155051?extraParams=%7B%22display_model_id%22%3A62448204981%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-22120-51eyur5oxkkve0).
- **A12 supply + plug set — PHP 699:** PSU PHP 660 screenshot quote + OMNI WRA-001-PK plug PHP 39 [listed reference](https://www.officewarehouse.com.ph/product/9476/). User accepts HE with plug adapter. Actual supply label/identity, checkout price/stock and physical fit pending; HU not required solely for plug shape. Prior generic offer excluded.
- **A13 Packaged external UPS - LISTED / CONFIRM VARIANT:** PC Express lists PHP 4,650. Obtain PH outlet/input-cord confirmation. Manufacturer global page shows a different regional socket. Battery and USB cable are included; do not buy loose cells. Sources: [1](https://pcx.com.ph/collections/uninterruptible-power-supply-ups), [2](https://www.cyberpower.com/global/en/product/sku/vp700elcd)
- **A14 Solderless breadboard - ESTIMATE:** PHP 120 allowance, estimated PHP 80-150. Variant-specific 830-point price not verified. Confirm with the suggested Philippine store.
- **A15 DuPont jumper bundles - ESTIMATE:** PHP 50 per bundle; listings start at PHP 39 but exact end-type variant not verified. Total buys 120 wires, not 3 individual wires. Sources: [1](https://makerlab.ph/collections/wiring)
- **A16 USB microSD reader - LISTED:** PHP 50, available in product data. Set quantity to zero if a working reader is already owned. Sources: [1](https://makerlab.ph/products/micro-sd-card-to-usb-adaptor-reader-c286)
- **A17 Momentary push buttons - ESTIMATE / PHYSICAL STORE:** User will buy two in person; PHP 5 each. Functions are software requests; never treat a button alone as a safety-rated alarm control. Confirm with the suggested Philippine store.
- **A18 Peripheral fuse and holder - ESTIMATE / PHYSICAL STORE:** User will buy one set in person; PHP 60 per holder/fuse set. Confirm rating and holder fit. Final fuse behaviour must be tested against measured start-up current. Confirm with the suggested Philippine store.
- **A19 Prototype base and Pi case — PHP400:** Selected acrylic150 + MakerLab case150 screenshot quotes + base/case mounting hardware100 ESTIMATE. Fan contents will be checked on arrival per user; separate A10 fan64 remains budgeted. No standalone bracket purchase specified; actual mount fit/clearance and hardware quote pending.
- **B01 Custom 3D-printed enclosure — USER PRINTER / COST TBD:** User elects in-house printing. Retail PHP365 box quote superseded; filament/material, mass and print cost unknown, not0. Enter cost in I29. Original retailer source remains history; no unsupported IP/flame claim.
- **B02 FR4 perfboard — SELECTED:** fulabs.ph 7×9cm variation, PHP48 screenshot quote. Shopee inaccessible; verify checkout price/stock. Approx.2.54mm pitch; inspect delivered pad isolation and through-hole continuity. Previous Makerlab PHP45 reference superseded.
- **B03 Socket/header kit - ESTIMATE:** PHP150 for the complete kit, not just the female strip. One straight 1×40, 2.54mm female strip assigned to physical-store shopping; shop/quote pending. Male strip now also assigned to physical store; Pi connector remains pending. Confirm Pi-header orientation and cable length. No UPS HAT occupies the GPIO header in this design. Confirm with the suggested Philippine store.
- **B04 Locking low-voltage harnesses - ESTIMATE:** PHP 120 allowance for five matched pairs with leads. Match pitch, pin count and polarity; the name JST alone does not identify a compatible connector. Confirm with the suggested Philippine store.
- **B05 Copper hookup-wire assortment - ESTIMATE:** PHP 150 for the specified 5m assortment. Keep Pi power on the adapter cable; this wire is not a mains wiring kit. Confirm with the suggested Philippine store.
- **B06 Board standoffs and screws - ESTIMATE:** PHP 120 per mixed small kit. Confirm screw diameter and clearance rather than forcing M3 screws into Pi mounting holes. Confirm with the suggested Philippine store.
- **B07 LED holders — SELECTED:** one advertised20-piece5MM pack atPHP69 screenshotquote;2used/18spares. Replaces20total estimate. Confirm pack contents/checkout price, barrel/cutout and panel thickness; existing LEDs reused.
- **B08 entry/clamp kit — ESTIMATE:** fullkit100 retained. Generic cross-membrane grommetcandidate74–126range with no diameterselected; exactpackprice/quantityunknown. Seller size referspanelhole, notcablediameter. Chart/groovewidth/panelthickness and USBplug/cablefit needed; clamps remain separate.
- **B09 finishing items — PARTLY OWNED / PROVISIONAL SCREENSHOT QUOTE:** heat-shrink, ties and mounts owned; no duplicate purchase. Follow-up screenshot selects one mixed 10±2pcs label/tag pack at PHP98. This is not a promise of twelve pieces. Writable surface, dimensions and suitability remain unverified; checkout price/contents require confirmation.
- **B10 Camera bracket and protective surround - ESTIMATE:** PHP 150 allowance. Confirm mounting-hole drawing and leave the lens unobstructed; camera A03 is reused. Sources: [1](https://www.waveshare.com/product/ov2710-2mp-usb-camera-a.htm)
- **B11 Fan guard and vent mesh - ESTIMATE:** PHP 100 allowance. Reuse A10 fan; separate the warm MQ-2 from Pi heat exhaust. Confirm with the suggested Philippine store.
- **B12 Panel push buttons - ESTIMATE / PHYSICAL STORE:** PHP25 each / PHP50 total. User will buy two non-illuminated, momentary normally-open, two-terminal panel buttons in person, with mounting nuts/hardware. Shop/model/actual quote pending; confirm hole diameter, supported panel thickness and low-current signal suitability. A17 bench switches remain spares. Count this shopping list once through B12.

## Store-link verification — A03, 2026-10-23

**Status: candidate only; suitability is not yet confirmed.** The user supplied a Circuitrocks Shopee listing titled “USB Camera For Raspberry Pi 2 Model B/B+/A+ 3 3B+ Pc” and two screenshots showing PHP 268. The seller's [matching direct listing](https://circuit.rocks/products/usb-camera), SKU AG039, also shows PHP 268. Shopee could not be independently accessed; its price and selected variant are recorded from the supplied screenshots and URL. Prices can change at checkout.

This is a generic USB webcam, distinct from the named Waveshare OV2710 camera. Neither supplied description nor the matching seller page establishes Linux UVC support (the standard driverless USB webcam interface), native sensor resolution, live-video modes/frame rates, field of view (how wide an area the lens sees), or maximum USB current. A “5.0M pixels” claim and list of output sizes do not confirm native 5MP video or 1080p at 30 frames per second. The phrase “8cm to infinity” describes focus distance, not the lens's optical focal length. Its low-light performance and actual smoke-detection performance remain untested.

**Budget treatment:** keep A03 at the existing PHP 2,500 baseline estimate. Record PHP 268 as the candidate quote only; do not replace the camera specification or deduct PHP 2,232 until the alternative is accepted. Table A remains PHP 20,564.00; Table B PHP 1,470.00; grand total PHP 22,034.00. If a different camera is accepted, recheck B10's camera bracket, which currently assumes the Waveshare board.

Copy this question to the seller:

> Will this exact camera work on Raspberry Pi 4 running Raspberry Pi OS using the standard UVC driver, without extra drivers? What is the exact sensor/model, native resolution, supported video resolutions and frame rates, viewing angle, and maximum USB current? If possible, please send its Linux `v4l2-ctl --list-formats-ext` output.

The Excel A03 source cell and Review Notes store-link entry contain native clickable Shopee links; Review Notes also links to the seller's direct specifications. These links identify an unverified candidate, not an approved purchase.

## Store-link verification — A03 second candidate, 2026-10-24

**Status: promising candidate; specifications still pending.** The user supplied [Actual Shop's generic USB webcam listing, selected 2K variant](https://shopee.ph/2K-Full-HD-Webcam-With-Microphone-4-Million-Pixels-USB-Web-Camera-Adjustable-FOV-Noise-Canceling-i.1080991217.21486145835?extraParams=%7B%22display_model_id%22%3A157101677860%2C%22model_selection_logic%22%3A3%7D&image_ids=ph-11134207-7rasi-m52oa72gyqmb0a&rModelId=157101677860&vItemId=40110614131&vModelId=300892483736&vShopId=1257811163). Two user screenshots show the 2K variation selected and **PHP 433 after voucher**. Regular price, voucher eligibility and shipping are unknown. The 720P and 1080P options are different variations; the quote must not be applied to them. Shopee could not be independently accessed, so this review relies on the supplied screenshots.

The description explicitly claims **Linux compatibility and USB plug-and-play without extra drivers**. That makes it a more promising compatibility candidate than the earlier listing, whose description did not explicitly name Linux. This is a seller claim, not proof of operation on Raspberry Pi OS. The exact manufacturer/model, UVC support, sensor/native resolution, supported live-video resolutions and frame rates, numeric viewing angle and maximum USB current remain unconfirmed. “2K” and “4 million pixels” alone do not establish actual video modes. “Adjustable FOV” in the title does not establish a wide-angle lens or optical zoom; adjusting the mounting angle changes where the camera points, not necessarily how much of the room it sees. Its microphone is not needed for smoke detection.

Ask the seller:

> For the selected 2K variant, is it UVC compatible on Raspberry Pi 4 running Raspberry Pi OS, without extra drivers? Does it provide 1920×1080 live video at 30fps? What are the actual supported video modes, viewing angle, exact model and maximum USB current?

The 1080p/30fps question requests a useful comparison mode; it is not a measured detector requirement or performance guarantee. Record the seller's actual modes if different. Existing software, coverage and low-light performance still need prototype tests.

**BOM treatment:** retain both candidates for comparison. The main A03 clickable source now opens the newer 2K listing, with the earlier Circuitrocks link preserved in Review Notes. The PHP 433 voucher quote is excluded from totals while verification is pending. Baseline camera specification, PHP 2,500 allowance and PHP 22,034.00 grand total remain unchanged. If this enclosed webcam is accepted, revise B10's mounting specification to suit its clip/body rather than assuming a 38mm board.

## Store-link verification — A04, 2026-10-24

Selected ENG LAB.ph MQ-2 module matches the required assembled module type. Screenshot shows MQ-2 selected at PHP 89; retain that exact variation rather than other MQ models in the listing. The board and sensor are supplied together. Confirm delivered pin labels VCC/GND/AO/DO, pin order and nominal 5V supply before connection. Standard MQ-2 specifications do not prove this seller uses a Winsen-made sensor. The planned ADS1115 and two-resistor divider remain required; never apply a 5V module output directly to Raspberry Pi GPIO. Sensor conditioning/calibration and functionality remain untested. This is a component selection, not a certified smoke alarm.

A04 increased by PHP 14 from the prior reference. After the subsequent A05 saving, current prototype subtotal is PHP 20,564.00; final additions PHP 1,470.00; grand total PHP 22,034.00, excluding shipping/tools. Earlier candidate-review totals above now reflect current A04–A12 quotes.

## Store-link verification — A05, 2026-10-24

Selected one Circuitrocks ADS1115 16-bit, four-channel I2C breakout at PHP 49. The screenshot and accessible Shopee listing agree on price. The photo shows a loose header strip alongside the board; confirm it is included and solder it before breadboard use. The user already owns soldering equipment, so a pre-soldered option is unnecessary. Tools remain excluded from materials totals; solder/flux consumables have not been confirmed owned.

The ADS1115 is an analog-to-digital converter: it turns the sensor voltage into numbers the Pi can read. In this design its supply and I2C pull-ups must be at 3.3V. Set ADDR to ground for I2C address 0x48. The MQ-2 signal still passes through the two equal 10kΩ resistors before reaching AIN0. Selecting a wider programmable gain range does not allow an analog input above the chip supply voltage. [TI's ADS1115 documentation](https://www.ti.com/product/ADS1115) supports the intended IC capabilities; it does not verify this generic board's exact schematic or chip authenticity. Inspect and test the delivered module in Phase 2.

A05 reduces the earlier PHP 500 reference by PHP 451. Current prototype subtotal: PHP 20,564.00; final additions: PHP 1,470.00; grand total: PHP 22,034.00. Earlier candidate-review totals above now reflect the current A04–A12 quotes.

## Store-link verification — A06, 2026-10-24

Selected one fulabs.ph 300 Pcs Box at PHP 68. The supplied enlarged chart shows thirty values with ten resistors each, including both required values: 470R (470Ω) and 10K (10,000Ω). The title claims 1/4W and 1% tolerance; photo describes metal film. These specifications fit the two-resistor MQ-2 divider and two LED current-limiting resistors. The 300-piece box provides sufficient spares; neither 600-piece variation is necessary. Check delivered resistance values with a multimeter before use; the seller claims are not independent measurements.

A06 changes from PHP 69 to PHP 68. Current prototype subtotal: PHP 20,564.00; final additions: PHP 1,470.00; grand total: PHP 22,034.00.

## Store-link verification — A07, 2026-10-24

Selected 100nF/0.1uF, 50V through-hole ceramic capacitors. These are the same capacitance (commonly marked 104); 50V exceeds the 16V minimum in the previous BOM. That rating is a voltage limit, not a supply requirement. The photo shows two wire leads suitable for our breadboard/perfboard approach. Exact dielectric grade and tolerance are not supplied, and delivered parts remain untested.

The screenshot explicitly says sold per piece and minimum purchase quantity six. Buy six: two for the current ADC supply/sensor-input filtering plan, plus four spares. At displayed PHP 3 each, line total is PHP 18. There is a separate wholesale tier at seven pieces; confirm PHP 3 still applies to six at checkout before ordering. Replaced the PHP 20 ten-piece pack estimate with a six-piece purchase, saving PHP 2. Current prototype PHP 20,564.00; final additions PHP 1,470.00; grand PHP 22,034.00. Shipping excluded.

## Store-link verification — A08, 2026-10-24

Selected one ENG LAB.ph Active buzzer module at PHP 65. Screenshot shows Active selected, GND/I/O/VCC pins, 3.3–5V operating range and LOW-level trigger. Active means a tone oscillator is built in; LOW trigger means a low control signal turns it on. This replaces the former 5V HIGH-trigger AF170 plan. Use the selected module at 3.3V, with LOW on/HIGH off, and allocate an extra 10kΩ I/O pull-up to 3.3V from the existing resistor kit. Input/supply current, exact schematic, startup behaviour and audible coverage still need prototype verification. A 5V supply would require another interface review.

Updated the fuse description: its 5V branch covers fan/MQ-2; the buzzer now loads the 3.3V rail. Retained the conservative combined 0.05A input allowance for buzzer/LEDs/ADC pending measurements. No new resistor purchase is required. A08 adds PHP 10; current prototype PHP 20,564.00, final additions PHP 1,470.00, grand PHP 22,034.00.

## Store-link verification — A10 selected size/voltage and quote, 2026-10-24

The follow-up screenshot confirms 30×30×10mm, DC 5V, quantity 1, at PHP 64. These are now recorded in the BOM and existing review entry. The earlier PHP 62–145 mixed-variant range is superseded by this selected quote. The previously supplied URL is retained; explicitly select both options when reopening it.

Current rating remains missing. Ask for rated current at 5V (A or mA), ideally a fan-label/specification photo. Confirm two power leads, connector/polarity and actual mounting fit. The seller drawing shows nominal 30mm frame and 10mm thickness with a 200mm lead illustration; it does not establish airflow/noise or mounting-hole pitch. Keep the 0.20A planning allowance until the rating and startup measurements are known; revise the power plan if needed. Old Makerlab current/power figures do not apply to this fan. Test actual cooling and bracket/guard fit during prototyping.

A10 is budgeted at PHP 64, a PHP 11 saving. Current prototype PHP 20,564.00; final additions PHP 1,470.00; grand PHP 22,034.00, excluding shipping/tools. Recording the quote does not establish electrical acceptance or mean a purchase was made. A09 remains on the Physical Store sheet.

## Earlier A11 candidate — not selected (2026-10-24)

User screenshot shows BuildCore.Tool aluminium heatsink set with adhesive, titled three pieces, at PHP 18. This is the right general type of cooling accessory, but no length/width/height measurements, explicit Pi 4 Model B fit or adhesive specification are shown. Generic Raspberry Pi / Orange Pi wording is insufficient to confirm the exact fit. Three pieces are not automatically unsuitable; piece count alone does not determine cooling compatibility.

Ask the seller: “What are the length × width × height of each heatsink? Does this set fit Raspberry Pi 4 Model B, and is the included adhesive thermally conductive mounting tape?” Confirm that each intended sink fits its chip without bridging nearby components and leaves room for the fan/enclosure. The project does not currently use a GPIO HAT, but any later HAT would also need clearance. Do not infer a thermal tape specification from ordinary adhesive wording. Actual cooling performance remains untested.

This describes the earlier BuildCore.Tool candidate, now superseded by the selected Circuitrocks Pi 4 kit below. Its link remains in Review Notes for history only and adds no cost. The PHP 120 reference has now been replaced by the Circuitrocks screenshot quote.

## Selected A11 — Circuitrocks Pi 4 kit, 2026-10-24

Select one four-piece Circuitrocks heatsink kit explicitly sold for Raspberry Pi 4B. Screenshot shows Blue selected at PHP 18 while the main gallery image is black. The seller describes four pieces for CPU, RAM, USB and LAN chips, and lists three unique sizes: 14×14×6mm, 14×10×6mm and 9×9×5mm. It does not state the quantity of each size; inspect contents rather than inventing that breakdown. Listed heights are 5–6mm; final clearance depends on actual positioning, fan bracket and enclosure.

This is a suitable procurement selection based on the Pi 4B claim and dimensions. The exact adhesive is described only as adhesive/back glue; confirm thermally conductive mounting tape and check insulation/clearance before installation. Seller compatibility is not a physical fit test or a guarantee of thermal performance. Check temperature/throttling under the real workload later.

**Price discrepancy:** the user screenshot shows Blue at PHP 18; the browser-readable page returned PHP 55 without identifying a selected colour. Use PHP 18 as a clearly labelled screenshot quote and confirm Blue checkout price before ordering. If the actual selected quote differs, update I16; do not assume the lowest colour/variation price. This selected kit replaces the PHP 120 reference (PHP 102 saving) and is the only heatsink purchase budgeted. Prototype PHP 20,564.00; final PHP 1,470.00; grand PHP 22,034.00.

## Store-link verification — A12 generic adapter, NOT SELECTED (2026-10-24)

User screenshot shows wuzhihui2020.ph's generic adapter, selected 5V 3A US, advertised 100–240V AC input, USB-C captive lead, at PHP 18. Accessible Shopee page returned PHP 138 without identifying plug selection. Record both as source observations rather than an accepted quote. No official Raspberry Pi product identity is established by the supplied title/photo; the cable watermark is not proof of manufacturer identity.

Nominal 5V/3A and the USB-C plug are plausible for a Pi 4; 5V versus 5.1V alone does not prove incompatibility. However, no exact manufacturer/model datasheet or evidence of sustained output regulation, ripple, cable drop, protections or product compliance was available. This review does not establish that the adapter is unsafe or counterfeit. It establishes insufficient evidence to recommend this exact product for the current design, which specifies the official supply.

[Raspberry Pi's official 15W USB-C supply](https://www.raspberrypi.com/products/type-c-power-supply/) is recommended by the manufacturer for Pi 4/400 and specifies 5.1V/3A output, 100–240V AC input and a 1.5m 18AWG captive cable. Continue sourcing a genuine unit with suitable PH/UPS plug compatibility. Use only the closed approved adapter; no mains construction is part of this project.

Earlier review: generic adapter not selected; the then-current PHP 1,237.60 allowance has now been superseded by the provisional TECHDIY PHP 660 quote below. Generic price remains excluded.

## Compatibility and power review

### Recommend external UPS

Use the packaged 230V CyberPower VP700ELCD with the official Pi adapter. It is larger and costs more than a bare HAT, but avoids user-built lithium charging and can also power existing networking.

Reference: Recommendation; https://www.cyberpower.com/global/en/product/sku/vp700elcd

### Regional plugs and battery outlet

Require the PH version, suitable mains input cord, battery-backed outlet(s) compatible with the adapter, internal battery and USB data cable. Do not order a 120V version. Keep the UPS external and closed.

Reference: Purchase check; https://www.cyberpower.com/global/en/product/sku/vp700elcd

### Runtime and shutdown are untested

No backup duration was specified. Test changeover, low-load behaviour, low-battery reporting, clean Pi shutdown and restart after mains returns. Generic USB-HID support suggests NUT, but exact delivered firmware must be tested.

Reference: Manufacturer HID specification; https://networkupstools.org/docs/man/usbhid-ups.html

### Compact alternative, excluded from totals

Waveshare UPS HAT (B) needs two matched <67mm 18650 cells and the matched 8.4V/2A charger. Its 5V/5A output rating is not its charger power: 8.4V×2A is only 16.8W before losses and charging. Prove no battery drain under sustained mains load.

Reference: Alternative only; https://www.waveshare.com/wiki/UPS_HAT_(B)

### Replace logic converter with ADC

Use ADS1115 at 3.3V and read AO through two equal 10kΩ resistors. This makes about 2.5V from 5.0V, or 2.55V from 5.1V. Leave DO unused. A BSS138 digital converter is not an ADC or an analog attenuator.

Reference: Design calculation; https://www.ti.com/lit/ds/symlink/ads1115.pdf

### Heat, conditioning and placement

Budget up to 0.20A for the module. Heater element specification is up to 0.95W at 5V. Allow initial conditioning of at least 48 hours per Winsen, then establish a stable clean-air baseline. Do not present raw readings as calibrated ppm.

Reference: Sensor manufacturer; https://www.winsen-sensor.com/product/mq-2.html?by=mq-sensor

### Measure supply at the module

Winsen specifies 5.0V±0.1V for the heater. The official Pi adapter is nominally 5.1V. Measure the delivered voltage at the sensor under load; outside 4.9-5.1V, revise the supply branch before connecting it.

Reference: Compatibility check; https://www.winsen-sensor.com/product/mq-2.html?by=mq-sensor

### 3.3V logic only

Pi GPIO inputs are not 5V tolerant. Supply ADS1115 and its I2C pull-ups from 3.3V; share ground. Use two separate current-limited LED outputs and a verified 3.3V-trigger buzzer module.

Reference: Manufacturer documentation; https://www.raspberrypi.com/documentation/computers/raspberry-pi.html

### No GPIO resource conflict identified

Preliminary allocation: GPIO2/3 for I2C ADS1115, GPIO17 buzzer control (LOW on/HIGH off for selected module), GPIO27 red LED, GPIO22 green LED, GPIO23 test, GPIO24 shutdown. USB handles camera and UPS. Final pin table/code belong to Phase 2.

Reference: Design allocation; no wiring is authorised yet

### Capacitors and divider loading

Use 100nF at ADC supply and at divided AO. The two 10kΩ resistors load AO with 20kΩ; calibrate with this divider attached and keep analog leads short. Select ADC range ±4.096V but keep physical input below 3.3V.

Reference: Design choice; https://www.ti.com/lit/ds/symlink/ads1115.pdf

### Remove unsupported 90dB claim

ENG LAB.ph Active module is selected at PHP 65, advertised for 3.3–5V with LOW-level trigger. Plan 3.3V VCC so the control circuit shares Pi voltage levels. I/O LOW turns sound on; HIGH turns it off. Add a 10kΩ pull-up from I/O to 3.3V using an A06 spare, and test boot/shutdown behaviour. Power the module from a 3.3V power pin, never a GPIO output. Before direct GPIO connection, measure I/O voltage and current: keep voltage within 0–3.3V and use a conservative 3mA control-current target. Measure total 3.3V load and actual module supply draw; if requirements exceed the plan, revise the driver/supply before connection. Do not assume a 5V-powered LOW-trigger module is safe for direct Pi control. No current or loudness rating is verified for this selected module; AF170 figures are superseded.

Reference: User screenshot and [selected ENG LAB.ph listing](https://shopee.ph/ENGLAB%E2%98%85Active-And-Passive-Buzzer-Module-Low-Level-Trigger-Beeper-Alarm-Module-i.1021339444.23679828092?extraParams=%7B%22display_model_id%22%3A109001349855%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbky-llh8n5fwik38f4)

### Included in prototype and reused

Use a low-profile Pi 4 heatsink and 30mm fan, supported by a bracket. Selected fan current is not supplied; retain 0.20A as a provisional allowance until rating and startup/operating current are checked. Do not substitute the Pi 5 active cooler.

Reference: Follow-up user screenshot and [selected fan listing](https://shopee.ph/Mini-Quiet-Ventilador-120mm-90mm-80mm-70mm-60mm-50mm-40mm-30mm-Fans-DC-12v-24v-5v-Sleeve-Bearing-Industrial-Cooling-Computer-Accessories-12v-Fan-12v-DC-5V-Fan-i.284375657.24893871579?extraParams=%7B%22display_model_id%22%3A224083610443%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7ras8-m80hc172zealc5)

### Combined limit still applies

Pi 4 USB ports share a 1.2A total allowance. Reserve 0.50A for camera and 0.05A for UPS data interface pending measurement. Keep other power-hungry USB devices off the Pi.

Reference: Manufacturer documentation; https://www.raspberrypi.com/documentation/computers/raspberry-pi.html

### Separate main and peripheral power

Keep the Pi main input on the official USB-C cable. Use the 500mA fuse only in the small external 5V sensor/fan branch; buzzer now uses the 3.3V power rail. Never route the Pi supply through breadboard contacts or tiny jumper leads.

Reference: Design requirement

### No unsupported flame claim

Selected ABS box is sold as IP65 when unmodified; no flame-retardant material certificate was found. Added vents invalidate any claim that the complete assembly is IP65. Confirm fit and heat before final assembly.

Reference: Supplier enclosure listing; https://makerlab.ph/products/weatherproof-enclosure-ip65-nema-4-abs-large

### Research system only

Keep an independently certified smoke alarm in service. This research prototype has not demonstrated certified fire-alarm performance, room coverage, false-alarm rate or 24/7 reliability. Do not create a fire or release flammable gas for testing.

Reference: Project scope and physical testing limits

### Outage alerts

The USB camera continues locally if Wi-Fi is down. Remote alerts need router/ONT and any upstream connection to stay available. The UPS can supply existing network adapters; their loads and plugs must be checked.

Reference: System dependency; router and ONT assumed already owned

### 5V rail planning budget

These are design allowances, not measured current ratings. The computer allowance includes its microSD and radio; the separate camera allowance must not be counted inside it again.

| Load | Current allowance (A) | Basis |
| --- | ---: | --- |
| Pi 4 board under load | 1.50 | Engineering allowance, not a measured maximum; verify under the actual video workload |
| USB camera | 0.50 | Conservative allowance; exact delivered camera draw to be checked |
| MQ-2 module | 0.20 | Includes 0.95W heater allowance plus module electronics |
| Cooling fan | 0.20 | Provisional allowance; selected fan current/rating not yet supplied |
| Buzzer, LEDs and ADC | 0.05 | Combined conservative 5V-input allowance; includes selected 3.3V buzzer load, not a verified module current rating |
| UPS USB data interface | 0.05 | Allowance pending enumeration/measurement |
| Total | 2.50 | Approximately 12.75W at 5.1V |
| Adapter capacity | 3.00 | Official 5.1V/3A USB-C adapter |
| Reserved margin | 0.50 | 16.7% of rated output |

Acceptance condition: measure the actual video-processing workload with camera, Wi-Fi, fan, heater and alarm active. Keep sustained current within 2.5A and short peaks below the adapter's 3A rating, with no undervoltage or thermal throttling. If measurements exceed this plan, revise the power architecture (for example an independently powered USB hub) before the final build; that contingent hardware is not priced as if already required. The UPS 390W AC rating does not increase the Pi adapter's 3A DC limit. Check sensor supply is 4.9-5.1V at its pins. The Pi 4 USB aggregate limit remains 1.2A, and camera plus UPS data allowances total 0.55A.

The UPS can provide ordinary outage backup but no runtime is promised. Manufacturer runtime at half rated load is not a valid prediction for this much smaller load. Test it with the detector and any networking equipment actually connected. USB HID is a reporting interface, not a 5V high-current Pi power socket.

## Cheaper or better alternatives

- If a genuine 4GB Pi can be supplied at e-Gizmo's listed PHP 4,800 including VAT, it would save PHP 5,649 from this reference budget. That listing is currently out of stock; confirm price and stock first. Do not buy a different RAM variant based on a multi-variant search headline.
- A working existing Linux-UVC USB camera can replace A03, saving the camera allowance; check scene coverage, focus, exposure and Linux support. An existing IP camera is only a substitute after its accessible RTSP/ONVIF stream, power and network path are confirmed. An analog BNC camera needs a compatible USB capture device, which is not included.
- A generic 1080p UVC PCB camera may cost less, but no exact PH model/price was verified. Keep the same purchase requirements and measure current. The named Waveshare camera provides a documented baseline.
- A05 now uses the Circuitrocks ADS1115 listing at PHP 49; loose headers are acceptable because the user owns soldering equipment. Confirm inclusion, delivered device and 3.3V operation before use.
- Existing USB reader, wire assortment, buttons or cooling can be deducted by setting their quantities to zero in Excel after confirming suitability. A blank price means missing information, not zero cost.
- A compact Waveshare UPS HAT (B) is an alternative only. Estimate PHP 3,000-4,500 for board, matched charger and two genuine cells; no current exact PH bundle quote was verified. It would replace the external backup arrangement after a power and safety review. Do not buy both designs or add its estimate to the total.

## Tools you may need

These are workshop purchases, **excluded from A/B and the project-materials grand total**. All tool prices below are ESTIMATES; verify with Makerlab, Alexan, Circuitrocks, local hardware stores or reputable PH sellers. Borrow tools where practical.

| Tool | Specification | Estimated PHP range | Why needed |
| --- | --- | ---: | --- |
| Digital multimeter | DC voltage, continuity and resistance; insulated probes | 500-1000 | Checks supply voltage and unpowered wiring before connecting the Pi. |
| USB-C power meter | Inline USB-C pass-through, at least 5V/3A; preserves CC connections; no forced PD voltage | 300-800 | Measures Pi input voltage/current without cutting the adapter cable. Use undervoltage logs as well; cheap meters may miss fast peaks. |
| Soldering iron/station | Already owned (user, 2026-10-24); exact equipment specification not supplied | 0 new purchase | Used for loose module headers and permanent perfboard work. Confirm solder/flux supplies separately. |
| Solder, flux and cleaning supplies | Electronics solder, flux and tip cleaner; ventilated workspace | 200-400 | Creates durable joints; fumes need ventilation and hands need washing. |
| Wire stripper and flush cutter | For 22-26AWG copper and short component leads | 200-400 | Prepares wires without nicking conductors or leaving stray strands. |
| Small screwdrivers and pliers | Suitable for M2.5/M3 hardware and connectors | 150-300 | Secures boards without improvising tools that slip into live circuits. |
| Drill/step bit, ruler and eye protection | Borrow where possible; measure the delivered enclosure | 300-700 | Creates safe, accurately sized enclosure openings. |
| Linux computer and router | Existing items assumed; replacement price not estimated | Already-owned assumption; no price | Used for OS preparation, programming and network alerts; confirm availability. |

## Phase boundary

No wiring, flashing or package setup is performed in this review. Phase 2 will provide exact Linux setup commands, wiring pin tables, code and component-by-component checks. Ask before installing packages, using sudo, flashing anything or changing files outside the project. Use only closed approved mains adapters/UPS products; do not open or wire 220-230V circuits. Keep an independent certified smoke alarm in service.

Are you happy with this BOM? Should I proceed to Phase 2?

## A12 TECHDIY official-supply quote — label/plug pending (2026-10-24)

[TECHDIY listing](https://shopee.ph/Raspberry-Pi-4B-5V3A-TYPE-C-Interface-15W-Power-Suitable-for-Raspberry-Pi-4th-Generation-B-Type-Official-Power-Supply-i.306592453.21811688321?extraParams=%7B%22display_model_id%22%3A180662749854%2C%22model_selection_logic%22%3A3%7D&image_ids=a5d1d0de2c898f4eb1de453426844e3b): PHP 660 for one white advertised official Raspberry Pi USB-C supply, from user screenshot. Shopee could not be independently accessed; price/stock and delivered authenticity remain unverified. The PSU-only quote replaced the PHP 1,237.60 reference. Current A12 also includes the PHP 39 plug adapter, totalling PHP 699 (PHP 538.60 below original reference). Prototype PHP 20,564.00; final additions PHP 1,470.00; grand PHP 22,034.00, excluding tools/shipping.

The [official product brief](https://datasheets.raspberrypi.com/power-supply/usb-c-power-supply-product-brief.pdf) specifies 5.1V/3A output, 100–240V AC input and a 1.5m 18AWG captive USB-C cable. KSA-15E-051300HE is the European round-pin mains version; KSA-15E-051300HU is the US flat-pin version. The image banner says KAS rather than KSA, possibly a graphic typo; it does not establish a counterfeit. Request a photo of the actual adapter label and plug, confirming output 5.1V/3A. Update: user accepts HE with a round-to-flat plug adapter; confirm physical fit, actual PSU label and identity. Its voltage range covers PH mains; physical plug fit is a separate check.

Main F17 and Review Notes F154 open this listing; F147 retains the earlier generic NOT SELECTED candidate. I17 records the provisional PHP 660 quote and source note. No purchase, physical test or Phase 2 approval has occurred.

## A12 plug adapter accepted — physical-store purchase (2026-10-24)

User accepts the European round-pin HE supply with a round-to-flat mains plug adapter. No need to source HU solely for plug shape. Add one OMNI WRA-001 / WRA-001-PK, rated 6A 250V AC, to the Physical Store list. [Office Warehouse reference](https://www.officewarehouse.com.ph/product/9476/) lists PHP 39 including VAT; actual branch quote, stock and physical fit remain pending. This is a plug-shape adapter. The [official Pi supply](https://www.raspberrypi.com/products/type-c-power-supply/) accepts 100–240V AC, so no voltage converter is needed for that supply on PH mains.

A12 is one reusable set: PHP 660 TECHDIY supply screenshot quote + PHP 39 plug reference = PHP 699. The physical-store shopping table does not add this cost a second time. Prototype PHP 20,564.00; final additions PHP 1,470.00; grand PHP 22,034.00. Actual supply output label (5.1V/3A) and identity still require confirmation. This decision resolves plug sourcing only; no purchase or physical test has occurred.

## A17 — physical-store purchase (2026-10-24)

User will buy two 6×6mm normally open momentary tactile push buttons in person. Ask for through-hole, four-leg switches suitable for breadboard use: one TEST and one SHUTDOWN. Physical Store rows22:27 list the purchase; main F22 points to it. Shop, actual quote and purchase remain unconfirmed. Retain PHP5 each, PHP10 total ESTIMATE, already counted once in Table A. Enter actual unit price in I22, with quantity G22=2. Project total remains PHP22,034.00; no other item was moved or removed.

## A18 — physical-store purchase (2026-10-24)

User will buy one matching set in person: a 5×20mm inline fuse holder with insulated wire leads and a 500mA (0.5A) fast-blow cartridge fuse. For the 5V MQ-2/fan branch only. Confirm exact models, physical fit and 5V DC suitability before buying; final start-up behaviour requires testing. Shop, actual quote and purchase remain unconfirmed. Retain PHP60/set ESTIMATE, counted once in Table A. Physical Store rows29:34 list the purchase; main F23 points to it. Update I23 actual set price; G23 remains1. Prototype PHP20,564; final PHP1,470; grand PHP22,034 unchanged.

## A19 base-plate candidate — incomplete mounting set (2026-10-24)

[User Shopee listing](https://shopee.ph/Breadboard-Plastic-Mounting-Plate-with-Rubber-Feet-Arduino-Uno-Compatible-Prototype-Base-DIY-i.20469516.827108383?extraParams=%7B%22display_model_id%22%3A72043513800%2C%22model_selection_logic%22%3A3%7D&image_ids=64fa7b72bd218887a6b5837880b350c3): Circuitrocks plastic mounting plate with rubber feet, PHP25 in screenshot. Shopee could not be independently opened. The [matching Circuitrocks direct page](https://circuit.rocks/products/arduino-plastic-mounting-plate-breadboard-rubber-feet), SKU AC071, lists PHP55, 120×83mm, 3mm clear acrylic, designed for an Arduino Uno plus 400-point breadboard. It lists screws, nuts and rubber bumpers; exact Shopee package contents and checkout price need confirmation. Do not transfer specifications from other similar brands.

This plate is only a possible base, not a fan bracket or a complete A19 substitute. A14 specifies an 830-point breadboard; its attachment/footprint and Pi4 mounting-hole compatibility are not established for this plate. A larger nonconductive mounting base and separate 30mm fan bracket remain to be sourced unless a suitable layout is confirmed. Images showing Arduino/breadboard do not establish those are included or required purchases.

Saved clickable main F24 and review F169 links, with seller specifications and price discrepancy in Review Notes A167:F172. Retain original A19 fan bracket/screws/base requirement and PHP100 set estimate. Candidate PHP25 is excluded from totals. Prototype PHP20,564; final additions PHP1,470; grand PHP22,034 unchanged. No purchase or fit test performed.

## A19 raw acrylic sheet candidate — exact variant pending (2026-10-24)

[Signako D.I.Y. Signage listing](https://shopee.ph/Clear-Acrylic-Sheet-%E2%80%93-Pre-Cut-or-Custom-Size-Plexiglass-Perspex-Plate-i.313399881.6369735167?extraParams=%7B%22display_model_id%22%3A90257365187%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134253-822wz-mhzlwy0wm4g369&rModelId=90257365187&vItemId=40813509667&vModelId=301118864715&vShopId=1257811163): user screenshot selects 297×420mm_2mm (A3), one at PHP200. Shopee could not be opened independently. The quote applies only to this selected size/thickness; do not apply it to another variant.

Acrylic is suitable as a nonconductive prototype base material. This A3 sheet is larger than the compact build needs; a 2mm unsupported sheet may flex, so 3mm is the engineering preference, not a mandatory electrical specification. Ask for a custom 200×150×3mm base, or check the listed 10×12in_3mm option (254×304.8mm). Their prices/stock are unknown; these are proposed dimensions, not a verified drilling/layout plan. The selected 2mm sheet is not declared electrically incompatible and could be used with adequate support. Holes, mounting spacers, feet and a separate 30mm fan bracket remain unconfirmed/unpriced.

Saved main F24/new review F176 clickable links and updated I24 note. Earlier small Circuitrocks plate remains in F169. Current PHP100 A19 allowance stays provisional, not a quote for this PHP200 sheet. Candidate price is excluded from totals. If accepted, PHP200 sheet alone exceeds that allowance before mounting hardware, so reprice the whole A19 set. Prototype PHP20,564; final additions PHP1,470; grand PHP22,034 unchanged. No purchase or fit test.

## A19 selected base — 10×12in, 3mm acrylic (2026-10-24)

Follow-up screenshot confirms selected 10x12in_3mm clear acrylic, one sheet, PHP150. Nominal dimensions are 254×304.8×3mm. Seller shown is spartan-888 Trading, unlike the previous Signako D.I.Y. Signage screenshot. Shopee remains inaccessible independently. [Saved listing](https://shopee.ph/Clear-Acrylic-Sheet-%E2%80%93-Pre-Cut-or-Custom-Size-Plexiglass-Perspex-Plate-i.313399881.6369735167) omits the old variation/referral query: manually select 10x12in_3mm and confirm seller and checkout price.

This is the chosen base material/size. Raw sheet does not establish included holes, feet, insulating spacers, screws or the separate 30mm fan bracket. Final mounting pattern, clearances and stability require verification. No purchase or physical test has occurred.

Reprice A19 as one mounting set: PHP150 sheet screenshot quote + PHP100 ESTIMATE for remaining fan bracket and mounting hardware = PHP250. The PHP100 is an engineering allowance requiring a quote, not an observed store price, and now excludes the sheet. This replaces the original PHP100 complete-set allowance, increasing the budget by PHP150. Prototype PHP20,714; final additions PHP1,470; grand PHP22,184, excluding shipping/tools. Earlier A3/2mm PHP200 option and small Uno plate are not selected; their records remain history. Existing Review Notes174:179 and main row24 updated without duplicate purchase rows.

## A19 automotive bracket — NOT SELECTED (2026-10-24)

[phadvanceautoshop auxiliary fan bracket pair](https://shopee.ph/Auxiliary-Fan-Bracket-for-Auxiliary-Fan-(PAIR)-i.419983478.17769717845?extraParams=%7B%22display_model_id%22%3A190222631984%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-824iz-mdznzdhz96h33a): screenshot PHP150 for one pair, listed under Automotive Parts / Engine Parts. Shopee inaccessible independently. The image shows slotted metal mounting straps. Exact length, hole diameters, spacing and fixings are not supplied, so fit to our30×30×10mm fan above the Pi4 heatsink is not established. Do not buy it for this build without a separately verified adaptation; automotive category alone does not prove physical impossibility.

Recorded as NOT SELECTED in Review Notes181:186, clickable F183. MainF24 keeps the selected acrylic link. Automotive PHP150 quote is excluded. A19 remains PHP250 = selected3mm acrylic150 + remaining bracket/mount hardware100 ESTIMATE. Prototype20714, final1470, grand22184 unchanged. Continue looking for a30mm/3010 electronics fan holder, ideally with dimensions, or a locally fabricated mount.

## A19 Pi4 case/fan candidate — confirm package (2026-10-24)

[MakerLab Shopee case listing](https://shopee.ph/Raspberry-Pi-4-Black-Case-with-Fan-i.18252381.11504087990?extraParams=%7B%22display_model_id%22%3A82034797060%2C%22model_selection_logic%22%3A3%7D&image_ids=527f288ec8b8b1a2df7f1ac2e7440e96): screenshot PHP150, titled Raspberry Pi4 Black Case with Fan. Shopee inaccessible independently. [Makerlab direct page](https://makerlab.ph/products/raspberry-pi-4-black-case-with-fan), MLE01114, says Black Case with Fan Mount, PHP149, package inclusion one case only. These may be different bundles; do not assume fan, heatsinks or fasteners are included from the photos. Direct product/collection stock descriptions also differ; confirm checkout.

Direct seller describes Pi4-compatible black snap-fit ABS case, external93.7×62.6×31.5mm. This is a promising replacement for the separate fan support, provided package and access checks pass. Ask: does PHP150 include fan and fixing screws? What are fan voltage/current/dimensions? Is there space for our6mm-high heatsinks, and can external GPIO wires/ribbon exit with the lid closed? GPIO means the Pi's40-pin connector used by our ADC, sensors and controls. Do not use a product image as the wiring pinout.

Saved candidate in Review Notes188:193, clickable F190. MainF24 remains selected acrylic link. No price/quantity substitution: A10 separate fan64 remains budgeted; A19 base150 + mounting100 ESTIMATE remains250; grand22184 unchanged. If bundle is accepted, remove duplicate standalone fan and separate fan-bracket requirement, confirm heatsink contents/clearance, and reassess final outer enclosure/ventilation without doubling cases or blocking MQ-2 airflow. No physical cooling/access test.

## A19 Pi case selected — inspect fan on arrival (2026-10-24)

User explicitly chooses to buy the [MakerLab Pi4 black case listing](https://shopee.ph/Raspberry-Pi-4-Black-Case-with-Fan-i.18252381.11504087990?extraParams=%7B%22display_model_id%22%3A82034797060%2C%22model_selection_logic%22%3A3%7D&image_ids=527f288ec8b8b1a2df7f1ac2e7440e96) at PHP150 and will report whether a fan is included when it arrives. Record SELECTED TO BUY / FAN CONTENTS UNCONFIRMED. This selects the buying-list item; no online order, payment or receipt is claimed. The earlier seller-description discrepancy remains documented, but a seller reply is no longer a prerequisite for this selection.

A19 now one set: acrylic10×12in3mm150 + Pi4case150 + remaining base/case mounting screws, insulating spacers and feet100 ESTIMATE = PHP400. The case provides the intended fan mount; no standalone bracket is currently specified for purchase. Check compatibility with the actual fan,6mm heatsinks, GPIO wire exit and final enclosure ventilation on arrival. Mounting hardware100 remains an allowance needing an actual quote.

Keep A10 separate5V fan PHP64 and A11 heatsinks PHP18 budgeted; included fan/heatsinks have not been established. Once a suitable bundled fan is confirmed, reduce any unpurchased duplicate fan order if appropriate. If both fans are already bought, record one as a spare without erasing its purchase cost. Plan one operating fan; no increased load assumed for running two.

Prototype PHP20,864; final additions PHP1,470; grand PHP22,334 (+PHP150 case). MainF24 and ReviewF190 open the selected case; acrylic remains clickable in F176. Existing review188:193 updated without another purchase row. No assembly or physical acceptance tests performed.

## A19 mounting hardware — physical-store purchase (2026-10-24)

User assigns the remaining A19 nylon spacers/standoffs, matching screws/nuts and adhesive rubber feet to physical-store shopping. Plan one small M2.5/M3 nylon kit plus four feet; exact kit contents, screw lengths/diameters and foot dimensions depend on delivered case/layout and must be matched before buying. Shop, actual quote and purchase remain unconfirmed.

Physical Store rows36:44 list the hardware with one COMBINED PHP100 ESTIMATE covering kit and feet together. This is already included once in A19 PHP400 = acrylic150 + case150 + hardware100. The case and acrylic remain online purchases; mainF24 keeps the clickable case source. After quote, update I24 to base price + case price + combined actual hardware cost. Reuse suitable hardware in the final build and reconcile B06 extras against actual kit contents before buying another kit.

Prototype PHP20,864; final additions PHP1,470; grand PHP22,334 unchanged. No physical assembly or orders performed.

## B01 — custom 3D-printed enclosure (2026-10-24)

User has a3D printer and will use it for B01. Remove the retail Makerlab MLE00652 ABS enclosure PHP365 quote from the active buying budget; the original entry remains history. Keep one custom enclosure required, sourced in-house. Printer ownership does not establish filament/material availability or zero cost. Material, print dimensions, mass/support waste and cost remain TBD. Fasteners remain A19/B06 resources, with inserts only if the eventual design needs them; no duplicate fastener charge added now.

I29 is intentionally blank, not0. J29 and the final-additions/grand-total cells show INPUT NEEDED until an enclosure printing cost is entered. Prototype total PHP20,864 remains unchanged. Known final additions excluding B01 total PHP1,105; known priced materials are PHP21,969 plus printing costTBD. Do not report that known sum as a complete project total. Enter the actual materials cost (or explicit confirmed0 if supplied without new spend) later.

Final custom design must accommodate delivered Pi case/boards, ventilation, MQ-2 air access, cable entries and mounting clearance; material/thermal suitability must be checked. No IP/flame rating is claimed. Design/printing belongs after prototype success; no CAD/print, package installation or hardware operation performed. Next buying item B02: one7×9cm double-sidedFR4 perfboard,2.54mm pitch.

## B02 — selected FR4 perfboard (2026-10-24)

Selected [fulabs.ph 7×9cm double-sided FR4 perfboard](https://shopee.ph/FR4-Universal-Protoboard-PCB-Double-Sided-i.1367148707.27114059630?extraParams=%7B%22display_model_id%22%3A217878076022%2C%22model_selection_logic%22%3A2%7D&image_ids=cn-11134207-7ras8-m2bws329golab1), one board at PHP48 from the user screenshot. This supersedes the Makerlab PHP45 reference (+PHP3). Shopee was inaccessible; checkout price and stock remain unverified. The seller photo specifies 70×90mm, approximately 2.54mm hole pitch and 1mm holes. This matches the intended permanent low-voltage interface board. Double-sided pads do not independently establish plated-through barrels: inspect delivered pad isolation and hole continuity before assembly. It needs soldered wire connections rather than push-in breadboard contacts.

Saved native clickable links in BOM Summary F30 and Review Notes F197, updated I30 to48 and retained quantity1. Prototype PHP20,864 unchanged; known final additions PHP1,108 and known materials PHP21,972 plus B01 printing costTBD. Final/grand totals remain INPUT NEEDED. No purchase or physical assembly performed.

## B03 female header — physical-store purchase (2026-10-24)

User will buy the female header strip in person: one straight, single-row 1×40 female PCB header, 2.54mm pitch, through-hole solder legs, for the removable ADS1115 connection. Physical Store rows46:52 contain the shopping entry. Shop and actual price remain unknown. Male header strips and the 2×20 keyed Pi ribbon/header connection remain sourcing-pending.

Keep PHP150 as the existing estimate for the FULL B03 kit, counted once. It is not a quote for the female strip. After all constituent prices are known, update main I31 with their combined cost. Main F31 points to this procurement split; I31 source note updated. Prototype PHP20,864 and known final additions PHP1,108 remain unchanged; enclosure printing cost remains TBD and final/grand totals INPUT NEEDED. No purchase or physical assembly performed.

## B03 male header — physical-store purchase (2026-10-24)

User will buy one straight single-row 1×40 male PCB header strip, 2.54mm pitch, through-hole solder legs, in a physical store. Added Physical Store rows54:58 and updated main F31/I31 note and female-strip context at rows50/52. Both header strips are now physical-store items; only the Pi ribbon/header connection remains sourcing-pending. Check whether the ADS1115 includes its own header before buying a duplicate for that module.

Shop and actual strip prices are unknown. PHP150 remains the estimate for the entire B03 kit, counted once. No total or quantity change to main B03; printing cost remains unknown and final/grand totals INPUT NEEDED. No purchase or assembly performed.

## B03 GPIO ribbon cable candidate (2026-10-24)

User supplied [bopultd.ph 40-pin GPIO cable](https://shopee.ph/Raspberry-Pi-40-Pin-GPIO-Cable-Male-to-Femal-Or-Female-to-Female-Extension-Cable-Adapter-for-Orange-Pi-Raspberry-Pi-5-4B-3B-3B-i.52451576.27677996896?extraParams=%7B%22display_model_id%22%3A195834642636%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rd5u-m6sex0xahcwr15), selected Female to Female (rainbow), quantity1 at PHP94 screenshot quote. Correct connector gender for intended Pi-to-PCB arrangement; Shopee inaccessible. Confirm 2×20 arrangement,2.54mm pitch, length, pin-for-pin wiring and actual keying before accepting. Pi-case cable exit and fan-power access also need checking. The screenshot does not prove keying or a supplied circuit-board connector.

A separate matching 2×20 male PCB header (preferably shrouded/keyed and compatible with this housing) is still required; the previously assigned single-row1×40 male strip is a different part. Both single-row strips remain physical-store purchases. Full B03 kit stays PHP150 ESTIMATE, not PHP94. Accepting the94 cable would leave PHP56 of that allowance for strips and PCB header;56 is a budget remainder, not a quote, and actual cost may exceed150. No separate cable charge or purchase recorded.

Saved native links mainF31 and Review NotesF204; candidate review202:207. All totals unchanged; B01 printing price stillTBD and final/grand INPUT NEEDED.

## B03 connector simplification — two single-row sections (2026-10-24)

Yes: a 2×20 pin grid can be formed from two straight1×20 male sections on the2.54mm perfboard. One1×40 breakaway strip supplies those40pins. The pin centres must be2.54mm apart along each row and between the two rows; pin size, exposed mating length and cable-housing clearance must also match. This is a geometric substitute, not a verification of the unmeasured Shopee cable. [Adafruit breakaway-header reference](https://www.adafruit.com/product/400) describes adjacent0.1-inch grids; [GPIO cable reference](https://www.adafruit.com/product/1988) describes a2×20 cable interface. No claim that those references authenticate the Shopee part.

Separate boxed/shrouded header is OPTIONAL, not required. Earlier separate-header-required entries are superseded. Housing/keying helps alignment but does not make bare Pi mating foolproof. Two single rows have no polarisation; later markpin1, provide strain relief and check mapping/alignment/shorts with power disconnected. Reversed or offset mating can put5V onto a GPIO signal and damage the Pi. No physical assembly started.

Physical Store male1×40 quantity changed1→2: first for the two20-pin rows, second for other connections/spares. Female1×40 stays1. Full B03 kit150 ESTIMATE unchanged; cablecandidate94 leaves56 allowance for strips, not a verified quote. Actual combined cost still pending. MainD31/F31/I31 note, review206/207 and physical rows50/56:58 updated. All32 native hyperlinks, unrelated cells/validation/panes, calculations and missing-print-cost flags preserved.

## B04 locking pigtail candidate (2026-10-24)

User supplied [B&K.ph SM-style prewired connectors](https://shopee.ph/30cm-JST-SM-2P-3P-4P-5P-6P-Automobile-Quick-Connect-Wire-Connector-Male-and-Female-Plug-Kit-Motorcycle-i.526902221.15291436961?extraParams=%7B%22display_model_id%22%3A164120865679%2C%22model_selection_logic%22%3A3%7D&image_ids=ff5becaf471caeb9890aa1dd59d398a2). Screenshots select **3P (Total length30cm), Size1 Set, quantity1, PHP45**. Image shows one mating male/female pair, locking clip, wires on both halves. This matches the required connector style, but1Set is not five pairs.30cm is advertised total length, not30cm for each half. Shopee inaccessible; live checkout and package count remain unverified.

Description does not state wire gauge/AWG, conductor material or assembled continuous-current rating. Retain ≥1A acceptance requirement as unverified, not an assigned rating. Ask seller for wire gauge, copper material, continuous rating and5Set contents/price. [Genuine JST SM reference](https://www.jst-mfg.com/product/index.php?lang=2&series=238) gives2.5mm pitch and3A family rating; neither establishes this generic assembly rating or authenticity. Treat as a supplied mating pair, not interchangeable with every connector sold as JST; wires still need termination onto the circuit/module. Check delivered contact mapping/polarity and label different harnesses.

B04 still requires five pairs in the final chosen pin-count mix. Main I32 stays120 full-kitESTIMATE, flagged for repricing; candidate45 is per3Ppair, not the kit price. Five individually purchased1Set units at45 would total225, exceeding120 by105; this is arithmetic, not a5Setpackquote, and other pin-count prices are unknown. No candidate acceptance, purchase or assembly recorded. MainF32 and ReviewNotesF211 link to listing; review209:214. Totals unchanged pending complete quote; B01 printing input remains unknown.

## B05 wire — physical-store purchase list (2026-10-24)

Buy flexible stranded copper hookup wire with silicone insulation; tinned copper is acceptable, copper-clad aluminium (CCA) is not the specified material. Choose24AWG for signals from the earlier24–26AWG range; no separate26AWG purchase needed. Gauge describes conductor size, not insulation diameter. This is a five-metre buying allowance for short internal low-voltage wiring; final cut lengths depend on the tested layout.

| Variant | Colour | Length | Planned colour convention |
| --- | --- | ---: | --- |
| 22AWG stranded copper, silicone | Red | 1m | 5V peripheral supply |
| 22AWG stranded copper, silicone | Black | 1m | Ground/return |
| 22AWG stranded copper, silicone | Orange | 1m | 3.3V supply |
| 24AWG stranded copper, silicone | Yellow | 0.5m | I2C clock/SCL |
| 24AWG stranded copper, silicone | Green | 0.5m | I2C data/SDA |
| 24AWG stranded copper, silicone | Blue | 0.5m | Analog sensor signal |
| 24AWG stranded copper, silicone | White | 0.5m | Labelled control/LED signals |

Total3m22AWG +2m24AWG =5m. Colours are our planned labels, not a pinout or proof of a prewired connector's polarity. Label each white lead separately. Keep Pi power on its USB-C adapter cable; this is not a mains-wire purchase. If shop minimum is1m per colour, four signal colours become1m each:7m total; record the changed lengths/actual price rather than reporting5m.

Assigned Physical Store rows60:72 with native length sum5m and linked full-setPHP150 estimate. Shop and actual per-metre/combined price remain unknown; update I33 with combined assortment cost, counted once.

B06: reuse suitable A19 nylon mounting parts first. The120 additional allowance is conditional, not an instruction to purchase a duplicate kit. Choose missing quantities/sizes only after actual kit/layout is known. Next new buying item B07: two unpowered5mm LED panel holders for the existing LEDs. No purchase or assembly performed.

## B07 selected LED-holder pack (2026-10-24)

Selected [universing.ph UVIG plastic LED holders](https://shopee.ph/UVIG-20PCS-3-5-8-10mm-LED-Plastic-Lamp-LED-Diode-Holder-Black-Clip-Bezel-Mount-i.172102548.2698466736?extraParams=%7B%22display_model_id%22%3A6363764858%2C%22model_selection_logic%22%3A3%7D&image_ids=11934a8753699745866131e6cd1f6dc1), variation **0(5MM)**, quantity1, **PHP69 screenshot quote**. Title advertises20PCS; verify selected pack contents and checkout price. Record one20-piece pack: two holders for the existing red and green5mm LEDs,18spares if20delivered. No additional LEDs purchased. Shopee was inaccessible; quote is screenshot evidence rather than independently verified live stock/price.

Black plastic unpowered clips/bezel match the intended mounting type. The nominal5mm refers to the LED size, not a specified panel-hole diameter. Actual barrel/cutout dimensions, supported panel thickness and LED fit must be checked before CAD, printing or drilling. No voltage requirement applies to the bare holder itself.

Replaces2pcs at10each(20total) with1pack69, +49. MainG35 now1,H35pack,I35/J35=69; saved native linksF35 and ReviewNotesF218 with review216:221. Prototype20864 unchanged; known final additions1157 + B01printingTBD; known materials22021 + printingTBD. Final/grand totals remain INPUT NEEDED. Shipping/tools excluded. No purchase/assembly performed.

## B08 membrane grommet candidate (2026-10-24)

Saved [user-supplied grooved rubber grommet listing](https://shopee.ph/Groove-Rubber-Grommet-16-60mm-Blanking-Hole-Wiring-Cable-Gasket-Rubber-Seal-Assortment-Set-For-Protects-Wire-Cable-Hardware-Tool-i.1234447918.25424636102?extraParams=%7B%22display_model_id%22%3A245648335336%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7r98o-lu797has8o6rb7) as candidate only. Screenshot shows PHP74–126 RANGE, no selected diameter. No exact pack price or buying quantity entered into review. Visible16/20/22mm variants advertise10pieces;25–42mm displayed variants5pieces;47mm2pieces with larger options. Description says syntheticrubber, black, round, size means **mounting-hole diameter**, and package2/5/10pieces according to choice. Title16–60mm versus description16–100mm is not evidence that every size is offered. Shopee inaccessible; live specs/price/stock unverified.

Cross-shaped centre membrane and intact outside ring differ from a radial split grommet that wraps around an already-terminated cable. It may be usable if actual USB plug passes appropriately or the enclosure entry design accommodates it, but no fit is established. Need legible dimension chart showing cutout/groove dimensions and supported panel thickness, plus actual USBplug/cabledimensions. Do not select16mm just because it is the smallest option, infer a16mm cable opening, force a plug or assume pull restraint/sealing. Internal clamps remain separate components. No material/certification/IP claim beyond seller description is established.

Retain B08 whole entry/clampkit100ESTIMATE; it is neither an exact grommet-packquote nor inclusive of verified clamp purchases. MainF36 and ReviewNotesF225 clickable; review223:228. All budgets unchanged, B01 printing input remains unknown. Sizing chart has now been supplied; see follow-up below. Actual cableplug dimensions and enclosure wall/seat still needed before choosing variant. No purchase, CAD, cutting, printing or assembly performed.

## B08 sizing-chart clarification (2026-10-24)

The user supplied a legible seller chart. From the drawing, A is nominal inner diameter, B mounting-hole/groove diameter, C flange outer diameter, D panel-groove width and E overall height; all millimetres. These are interpreted seller dimensions, not measured fit or guaranteed cable/plug ranges.

| Listing option / B | Inner A | Flange C | Groove D | Overall E |
| --- | ---: | ---: | ---: | ---: |
| 16mm | 14 | 21 | 2.5 | 9.5 |
| 20mm | 15 | 26 | 2 | 9 |
| 22mm | 18 | 28 | 2.5 | 9.5 |
| 25mm | 20 | 33 | 2.5 | 11 |
| 27mm | 22 | 34 | 2 | 9 |
| 30mm | 25 | 40 | 3 | 10 |

The16mm option therefore has nominal14mm inner diameter and2.5mm groove; it is not a16mm cable-size specification.20mm has a2mm groove, not3mm. A is the inner region of a membrane part, not proof that any plug of that nominal width will pass without damage. Need actual moulded USBplug/cable dimensions and chosen entry-wall/seat geometry. No size selected yet; no need to request this chart again. A custom printed seat can later match the chosen groove, rather than choosing an oversized grommet solely for wall thickness.

Updated existing B08 mainD36, I36 evidence and review226:228, retaining linksF36/F225. Price/quantity for candidate remain unknown; kit100estimate, all budgets and printed-enclosure INPUT NEEDED flags unchanged. Separate cable clamps still required. No purchase/physical design or assembly.

## B08 rubber-lined metal P-clip candidate (2026-10-24)

Recorded [SasaHardware titled rubber-lined clip listing](https://shopee.ph/5pcs-Rubber-Lined-Clips-6-60mm-R-type-STainless-Steel-304-Wiring-Hose-Clamp-Cable-Mounting-Fix-Fastener-Hardware-Electrical-Fittings-Water-Pipe-Bracket-Sasa-Hardware-i.1212696620.26268127323?extraParams=%7B%22display_model_id%22%3A311364363257%2C%22model_selection_logic%22%3A3%7D&image_ids=cn-11134207-7ras8-m2t2dx94d7tz16) as candidate only. Screenshot advertises304stainlesssteel with rubber liner, five clips per displayed diameter pack, and CLIPONLY / CLIP+BOLT+NUT options. Neither type nor size selected; PHP92–245 is a range, not an exact quote.6mm appears greyed in this view,8mm is next visible option; do not infer live stock or approve8mm without measuring. Shopee inaccessible. Exact price, size, package hardware and purchase quantity remain unknown.

Screw-mounted lined P-clips can restrain cables if fitted to each jacket diameter snugly without crushing. These are metal rather than the originally suggested nylon: keep conductive metal/fasteners clear of exposed circuitry and support the printed mounting area appropriately. Linedinside dimensions, boltthread/length and tested restraint load are not established by screenshot. Larger clamp diameter is not automatically better; a loose clip does not provide dependable pull restraint.

Need two installed clamps, one per USBlead. A fivepiece pack could supply2used/3spares only if one size suits both, which is not yet established. Both grommet and clamp selections remain pending actual cable/plug and enclosure dimensions; grommet chart has already been supplied. Keep B08 combined100estimate pending complete quote; these candidatepacks may exceed that allowance and need repricing once selected. No duplicate item or range entered into budget. MainF36 opensclip; earlier grommetF225 retained; newreview230:235/F232. No purchase, CAD or assembly.

## B09 heat-shrink and cable ties already owned (2026-10-24)

User confirms existing heat-shrink tubing and cable ties. Reuse these: zero new purchase for those components; do not buy another full finishing bundle. Exact stock sizes and quantities were not specified and can be checked during assembly. Ownership of tie-mount bases and wire labels was not confirmed.

Main B09 now covers **remaining tie-mount bases and labels only**. Original100estimate covered the combined bundle without per-component prices, so neither exact savings nor remaining purchase price can be inferred. I37 is blank, not0; J37 INPUT NEEDED. Later enter actual combined cost for mounts/labels. Owned items are mentioned explicitly in the specification and review; no duplicate expense.

Known priced final additions1057, prototype20864, known sum21921 plus both B01enclosureprinting and B09mount/label costsTBD. Final/grand totals remain INPUT NEEDED. This is not a complete project quote or a claim of100savings. Existing39 storelinks retained, no invented storelink added for owned materials. Mainrow37/review237:242 updated. Next source small tie-mount bases with slots matching owned ties; labels afterward. No purchase or assembly.

## B09 tie-mount bases also owned (2026-10-24)

User confirms existing tie-mount bases as well as heat-shrink tubing and cable ties. Reuse all three; no duplicate purchase. Exact slot/fixing sizes and inventory can be checked during assembly. B09 buying row now WIRE LABELS ONLY, price/pack stillTBD. I37 remains blank; J37/final/grand INPUT NEEDED, not a zero-cost claim for labels.

MainC37:F37, existing review237:242 and I37 note updated. Known priced additions1057 and line sum21921 unchanged; remaining unpriced items B01printing and B09wirelabels. All39 links, unrelated cells/validation/panes and formulas preserved; affected renders reviewed. No purchase/assembly. Next: small write-on wire/cable labels, preferably self-laminating; one small pack sized to thin hookup wire, exact contents/quote pending.

## B09 nylon label/tag candidate (2026-10-24)

Saved [ShopeeChoiceGlobal coloured nylon cablelabel/tag listing](https://shopee.ph/Colorful-Self-Adhesive-Cable-Labels-Nylon-Wire-Stickers-for-Easy-Identification-Ideal-for-Home-Office-i.196214868.43608162560?extraParams=%7B%22display_model_id%22%3A285688745424%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-823qo-mom4ttqfrx8u9c) as candidate only. Screenshot shows PHP98–242range with no packselected; options display10±2pcs/30±2pcs/50±2pcs wording. Do not turn this into an exact98quote or assume each selected packcount/contents. Title claimsnylon/selfadhesive. Photo appearsfabric/strapstyletag, not confirmedsmallself-laminatingwrite-onlabel. Shopee inaccessible.

Needs write-on surface/compatiblepen confirmation and dimensions/closurestyle. Could work for identifying bundled cables if suitable, but bulk/fit on thin22/24AWGindividualleads unknown. Ask seller whether a permanentmarker can write legibly and stay attached, and request actual tagdimensions. No handwritability, waterproofing or printercompatibility established by screenshot.

MainD37/F37 and I37evidence updated; newreview244:249 with linksF37/F246. Ownershipreview237:242 unchanged: heatshrink,ties,mounts alreadyowned, no duplicates. I37blank/J37INPUTNEEDED, B01printing alsoTBD. Knownfinal1057/combined21921 unchanged; no candidateprice or purchase entered.41native links and original cells/validation/panes verified; affected renders reviewed.

## B09 selected label/tag pack quote (2026-10-24 follow-up)

The follow-up screenshot explicitly selects **10±2pcs mixed**, quantity one, at **PHP98**. Record one pack at PHP98 provisionally; the displayed tolerance is not a promise of twelve pieces. This supersedes the earlier unselected PHP98–242 range for the current budget. Writing surface, compatible pen, tag dimensions/closure and fit on thin hookup wire remain unverified. Existing heat-shrink tubing, cable ties and tie-mount bases are reused.

Updated main row37 and existing review244:249, plus ownership summary237:242. B09 now PHP98; prototype PHP20,864; priced final additions PHP1,155; known line sum PHP22,019 plus B01 printing TBD. Final/grand totals remain INPUT NEEDED for printing. Verified rendered changes, formulas, 41 native clickable links, unrelated cells, validations and frozen panes. No purchase, physical assembly or phase change.

Next is B10, the camera bracket/protective surround. Exact geometry must match the final A03 camera; the original 38mm board bracket is not automatically suitable for an enclosed webcam. A custom printed mount is an option because the user has a 3D printer, but no B10 printing choice or cost change is assumed. Design and fabrication follow prototype success.

## B12 panel buttons assigned to physical store (2026-10-24)

User will buy two panel-mount push buttons in a physical store. Ask for non-illuminated, normally open (NO), momentary switches with two terminals and mounting nuts/hardware included: one labelled TEST and one SHUTDOWN. Momentary means contact closes only while pressed and opens when released. Avoid latching/self-locking types. Colour is optional; labels establish functions. These are low-current software inputs, not a mains connection or direct power cut-off.

Check actual mounting-hole diameter, supported panel thickness and suitability for low-current signal contacts before enclosure design. No exact diameter or switch model has been selected. Physical Store rows74:81 list separate TEST/SHUTDOWN quantities of one each; F80 links to existing B12 subtotal J40. PHP25 each / PHP50 total remains an estimate, not a verified shop quote. Update I40 with actual unit price when obtained; G40 stays2. No duplicate expense or purchase claimed.

Prototype PHP20,864; priced final additions PHP1,155; known sum PHP22,019 plus B01 printing TBD. Existing 41 online hyperlinks and unrelated worksheet cells/formulas/validation/panes remain preserved. B10/B11 and other recorded verification questions remain pending; reaching the final row does not approve Phase2.


## Delivered camera visual check — 2026-11-06

User confirms camera available and supplies photo showing an enclosed black webcam with clip,molded USB-A plug,and front text WEBCAM/2K QUAD HD. No exact manufacturer/model or electrical rating is visible. This does not prove native2K resolution,UVC compatibility,FPS,current draw,or identity as either earlier store listing. Proceed with individual USB detection/capture testing in [CAMERA_CHECK.md](CAMERA_CHECK.md);port connection is in [WIRING.md](WIRING.md). No replacement purchase is requested. Receipt price is unknown;A03 reference allowance,all totals and the existing workbook are unchanged pending coordinated reconciliation. B10 mount must suit the delivered enclosed webcam/clip if accepted;do not assume Waveshare board mounting holes.

2026-11-06 follow-up:USB connection user-confirmed after black-Pi-USB2 instruction. Linux identification/driver/video modes and current remain pending;no price/workbook/budget change.

2026-11-06 enumeration:actual camera reports USB349c:3307 Generic HD video;Linux uvcvideo driver bound and camera video nodes created. UVC enumeration works. Advertised formats/native sensor resolution,image streaming and actual current still pending;budget/workbook unchanged.

2026-11-06 capability query:video0 is image capture,video1 metadata. Existing v4l2-ctl1.30.1 reports MJPG output up to2560x1440 at30/20fps. This establishes advertised modes,not native sensor resolution,achieved streaming rate or image quality. Next modest stream test;no A03 price/workbook change.

2026-11-06 initial stream:640x480 MJPG with30fps requested completed exit0,reported~25.3fps. Pi flags0x0/temp38.4C afterward. Basic transport works;no decoded image/native sensor/high-resolution/actual-current result yet. Budget/workbook unchanged.

2026-11-06 snapshot:one640x480 RGB JPEG transferred/decoded/viewed successfully. Basic UVC/VGA capture works;controlled high-resolution image quality,coverage,native sensor resolution and actual power draw remain pending. Existing webcam is being tested;no duplicate camera purchase or budget/workbook change.

2026-11-06 higher-output still:actual2560x1440 RGB JPEG transferred,fully decoded and viewed successfully;box lettering readable,some highlights washed out. This confirms1440p output,not native sensor resolution or sustained high-resolution FPS. Higher-mode streaming/power tests pending;no price/workbook/budget change.

## Existing case/fan reported — 2026-11-06

User reports Pi already installed in its case/box with a connected fan and now confirms it is spinning. Exact fan identity, bundled/separate purchase, voltage/current and power pins remain unverified. Do not request a duplicate fan. A10/A19 receipt-cost/workbook reconciliation awaits evidence; no prices or workbook values changed. Short camera stream result~15.1fps (20requested),exit0,throttled0x0,38.9C applies to this reported assembly.

## Delivered sensor/ADC visual inspection — 2026-11-06

Photos show both modules physically present. MQ-family Flying-Fish/MQ Sensor board has fitted four-pin header (VCC/GND/DO/AO); exact MQ-2 can marking is unreadable. Bagged board is printed ADS1115/16Bit I2C ADC+PGA and includes a separate straight header; soldering is needed before reliable jumper connections. No duplicate module/header purchase requested. Actual chip function, rating/voltage tests, tools readiness and receipt costs remain unverified; prices/workbook unchanged.
