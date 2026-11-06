# Prototype connections

PHASE2: current connection scope2026-11-06. Pi setup/basic camera tests passed. Pi is already in its case with fan connected and spinning per user. Exact fan power pins/rating remain unknown; do not assume all GPIO pins are free. Step41 photos received; Step42 ADC header fit/soldering is deferred and unconfirmed. Step45 shutdown/power removal is user-confirmed;leave the Pi unplugged until needed. No sensor/ADC/alarm connection has been made. Final wiring remains deferred until prototype success/Phase3 approval.

## Assembled cables and ports

These are complete keyed connectors,not individual pins to solder. Use their existing cables;do not expose or reconnect individual USB contacts. No GPIO pin assignment is needed for a USB webcam.

| Component connector | Raspberry Pi connection | Cable color / identification | Purpose and status |
| --- | --- | --- | --- |
| Inspected5.1V/3A supply's USB-C plug | Pi4 USB-C power input | Existing supply cable;identify by connector and label rather than assuming wire color | Powers Pi. Already used successfully;idle throttle flags0x0,not a full load/power-budget test. |
| Silvertec32GB microSD | Pi microSD slot under board | No jumper wire | Holds operating system and saved configuration. Installed and booted. Never remove while powered. |
| Delivered webcam's molded USB-A plug | One black Pi4 USB2.0 port | Existing black camera cable seen in photo | Carries USB power and video data. USB/UVC and basic capture/stream checks passed; actual electrical rating remains unverified. |
| Existing case fan cable | Connected per user; exact connector/pins unknown | Label/connection photo pending; do not infer polarity from wire colors alone | Already installed with Pi in case; spinning user-confirmed. Voltage/current and power pins remain unverified. Leave live wiring in place. |
| Laptop network link | Pi Wi-Fi through current router | Wireless;no GPIO wire | SSH terminal access as sentrion;authenticated login passed. IP can change. |

```text
Inspected external5.1V/3A supply --> Pi4 USB-C power input
Silvertec microSD --------------> Pi4 microSD slot
Webcam USB-A cable ------------> Pi4 black USB2.0 port [user-confirmed connection]
Laptop -- current router/Wi-Fi --> Pi4 [SSH tested]
```

Before connecting the webcam,read [CAMERA_CHECK.md](CAMERA_CHECK.md). Keep the board stable and away from loose metal;match USB plug orientation without force. Other detector GPIO circuits remain disconnected. Do not infer any resistor/ADC/sensor pinout from this port table.

## Delivered module labels — inspection only, 2026-11-06

No module is connected to the Pi. Header preparation is Step42 in BUILD_PROTOTYPE.md; no Pi pin assignment is made until the fan connection and GPIO access are checked.

| Module marking | Label | Meaning | Connection status |
| --- | --- | --- | --- |
| Flying-Fish / MQ Sensor, exact can model not readable | VCC | Module power input | Unconnected; no supply test |
| Same | GND | Electrical reference/return | Unconnected |
| Same | DO | Comparator's threshold output | Unconnected; do not route directly to Pi |
| Same | AO | Analog sensor output | Unconnected; planned divider/ADC route must be verified first |
| Board marked ADS1115 | VDD / GND | Converter power / reference | Unconnected; loose header needs solder |
| Same | SCL / SDA | Clock / data lines of the I2C communication bus | Unconnected |
| Same | ADDR | Selects the bus address | Unconnected; later address setting required |
| Same | ALRT | Alert/comparator output | Unconnected; not required for initial voltage reading |
| Same | A0 / A1 / A2 / A3 | Four analog input channels | Unconnected; no signal applied |

MQ labels appear top-to-bottom VCC/GND/DO/AO in the supplied underside photo with header pointing right. ADS1115 label order in its supplied front photo is VDD/GND/SCL/SDA/ADDR/ALRT/A0/A1/A2/A3. Do not transfer those visual directions to the opposite board face. Board print is observed evidence, not chip authenticity or electrical acceptance. See the [TI ADS1115 datasheet](https://www.ti.com/lit/ds/symlink/ads1115.pdf) for pin functions; generic module trace/pull-up implementation still needs inspection.
