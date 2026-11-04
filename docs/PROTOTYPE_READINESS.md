# Prototype materials readiness

Prepared 2026-11-04; current update2026-11-05,Asia/Manila. First-boot inventory and label checks are completed;OS card writing and a2.4GHz retry have been performed. This is now a reference checklist,not the next action. Current task is Phase2 Step19 Linux startup-log diagnosis;see [CONTINUE_ON_ANOTHER_PC.md](CONTINUE_ON_ANOTHER_PC.md). Later detector/final-build parts are not all confirmed owned.

## First Raspberry Pi boot and access check

| Gather | Quantity | Purpose / condition |
| --- | ---: | --- |
| A01 Raspberry Pi 4 Model B,4GB per user | 1 | Board model visible in photo;RAM awaits software verification. Physically on hand. |
| A12 Pi USB-C supply | 1 | Actual label KSA-15E-051300HU,5.1V/3A,flat pins. Load performance/authenticity untested;no round-to-flat adapter needed if plug fits normally. |
| A02 existing microSD | 1 | Actual Silvertec32GB microSDHC,UHS-I/A1/Class10. OS written;endurance/real capacity unverified. No new card needed for current log check. |
| A16 USB card reader | 1 | Used successfully on Windows for boot-file inspection,approved update and safe ejection. |
| Setup computer and network | 1 computer | Windows preparation completed;Linux laptop proposed for logs,distribution pending. No Ethernet cable reported. |

A19 Pi case or a secure non-conductive support protects the board. A10 fan and A11 heatsinks are planned for the sustained camera workload; they are not prerequisites for identifying a brief successful boot. Actual case fan contents, cooling clearance and current remain pending.

Remote/headless access means controlling the Pi from another computer, without a dedicated monitor, keyboard or mouse. If using a local desktop instead, gather a monitor, micro-HDMI-to-HDMI cable and USB keyboard/mouse. These are conditional alternatives, not new mandatory BOM purchases.

## Gather next for component prototyping

| Function | Existing BOM materials to gather |
| --- | --- |
| Camera check | A03 USB camera and USB cable; final selected model/compatibility still pending. |
| Breadboard connections | A14 one 830-point breadboard; A15 male-to-male, male-to-female and female-to-female 2.54mm jumper bundles. Male ends have pins; female ends have sockets. |
| Sensor readings | A04 one MQ-2 module; A05 one ADS1115 converter with soldered headers; two 10kΩ resistors from A06 for the voltage divider; two 100nF/0.1µF capacitors from A07. The converter makes the analog sensor reading readable by the Pi; the divider reduces its voltage. Do not directly connect MQ-2 analog output to a Pi input. |
| Alarm indication | A08 active buzzer module; one additional 10kΩ resistor from A06; A09 red/green LEDs, one each, with two 470Ω resistors from A06. Buzzer input/supply checks remain pending. |
| Prototype controls | A17 two 6×6mm normally-open momentary tactile buttons. B12 panel buttons are for the permanent build and can wait. |
| Peripheral protection and support | A18 inline holder and 500mA fast-blow fuse for the planned external 5V branch; A19 acrylic base, suitable nylon hardware/feet; A10/A11 cooling for sustained tests. |
| Bench checks | Multimeter; user-owned soldering equipment for loose headers. Other tool ownership/consumables remain to be confirmed. |

The selected A06 assortment contains planned resistor quantities;no duplicate kit needed. A07 pack has six capacitors,two allocated initially. Verify delivered labels before external wiring. Pi OS writing/power trials occurred;camera/sensor/GPIO circuits and detector application remain unbuilt/untested.

## Items that can wait for the initial Pi check

The UPS remains required for later backup validation, but is not needed to establish a first boot on normal power. Final enclosure, perfboard, permanent harness connectors, GPIO ribbon extension, LED bezels, cable-entry hardware and B12 panel controls can wait. Do not treat these deferrals as deletion from the complete project BOM.

For the earlier physical-store list, the first Pi-only check may need the round-to-flat adapter and suitable board-support hardware. LEDs, tactile buttons, fuse and holder become relevant when external circuitry is added. Header strips are needed at prototype time only if a delivered module lacks the required header; permanent header-grid construction and soldered hookup wiring can wait.

## Sources and remaining confirmation

- Project quantities and selections: [BOM.md](BOM.md), Table A and physical-store list.
- Official setup prerequisites, Pi4 15W supply recommendation, remote-access option and micro-HDMI display connection: [Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/getting-started.html), checked 2026-11-04.
- First-boot inventory/labels are recorded. Next:Linux laptop distro/version and current Pi power/card state. Do not repeat answered model/capacity/empty-card questions;do not infer full electrical/boot success from label/write checks.
