# Prototype materials readiness

PHASE 1: MATERIALS BUYING. Prepared 2026-11-04, Asia/Manila. This checklist identifies materials to gather; it does not start Phase 2 or claim that selected parts have arrived.

## First Raspberry Pi boot and access check

| Gather | Quantity | Purpose / condition |
| --- | ---: | --- |
| A01 Raspberry Pi 4 Model B, planned 4GB | 1 | The computer being checked. Actual possession/model not yet confirmed. |
| A12 suitable Pi 4 USB-C supply | 1 | Planned official 15W, 5.1V/3A supply. Verify actual label and condition; the listing alone does not confirm authenticity. Round-to-flat plug adapter only if the actual supply/socket needs it. |
| A02 compatible microSD card | 1 | Stores the operating system. User owns a card, but model/capacity/condition remain unknown; do not assume it is suitable. BOM target is 32GB. |
| A16 compatible microSD reader, or existing compatible built-in slot | 1 | Allows the setup computer to prepare the card. |
| Existing Linux computer and network access | 1 computer | For preparing the card and remotely accessing the Pi over the same network. Wi-Fi avoids an Ethernet-cable purchase; Ethernet is an alternative. |

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

The selected A06 assortment contains the planned resistor quantities; no duplicate resistor kit is needed. The A07 purchase pack has six capacitors, of which two are allocated initially. Verify actual component labels before use. No wiring, installation, flashing or power-on steps have been performed.

## Items that can wait for the initial Pi check

The UPS remains required for later backup validation, but is not needed to establish a first boot on normal power. Final enclosure, perfboard, permanent harness connectors, GPIO ribbon extension, LED bezels, cable-entry hardware and B12 panel controls can wait. Do not treat these deferrals as deletion from the complete project BOM.

For the earlier physical-store list, the first Pi-only check may need the round-to-flat adapter and suitable board-support hardware. LEDs, tactile buttons, fuse and holder become relevant when external circuitry is added. Header strips are needed at prototype time only if a delivered module lacks the required header; permanent header-grid construction and soldered hookup wiring can wait.

## Sources and remaining confirmation

- Project quantities and selections: [BOM.md](BOM.md), Table A and physical-store list.
- Official setup prerequisites, Pi4 15W supply recommendation, remote-access option and micro-HDMI display connection: [Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/getting-started.html), checked 2026-11-04.
- Next confirmation: which of these items are physically on hand, especially the Pi model, power-supply label, microSD model/capacity and card reader. No purchases or ownership are inferred from earlier listing selections.
