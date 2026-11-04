# Read-only card inspection — 2026-11-05

PHASE2: PROTOTYPING, Step15. Pi power-off and reader transfer confirmed by user. No card files changed, repaired, formatted or rewritten during inspection. No passwords, hashes or SSID text copied into this report.

## Observed storage and boot files

- Current Windows disk2 is the single USB Mass Storage Device,31,299,993,600bytes,nonboot/nonsystem,MBR. These identifiers are session-specific.
- Partition1:512MiB,FAT32,label `bootfs`,no drive letter. Read through its existing volume GUID path without assigning a letter or changing mount configuration.
- Partition2:30,754,734,080bytes,Windows type Unknown. Kernel command line identifies root filesystem as ext4; Windows cannot browse it normally. Its partition size alone is not treated as proof of a successful boot or resize.
- Boot filesystem is readable. Windows reports HealthStatus Warning; this is recorded without diagnosing a bad card or applying repair. Forced prior shutdown and file existence are insufficient to establish the reason for the warning or card reliability.
- Pi4 device tree `bcm2711-rpi-4-b.dtb`,kernel8.img,initramfs8,start4.elf,fixup4.dat,config.txt and cmdline.txt are present. EEPROM-update/recovery files also exist; their presence alone does not prove an update failure.
- Cloud-init files meta-data,network-config,user-data are present. Their presence is expected on this Trixie image and is not by itself proof setup failed or succeeded. No boot-partition startup log was found in the filename/marker check.

## Safe configuration checks

Boot files themselves (not just retained Windows settings) specify:

| Item | Observed |
| --- | --- |
| Hostname | sentrion-pi |
| Account | sentrion;unlocked password login requested |
| Time zone | Asia/Manila |
| Wi-Fi interface | wlan0,IPv4 DHCP enabled |
| Country | PH in network-config and kernel command line |
| Network name | Matches expected retained Imager SSID;actual name not reproduced |
| Wi-Fi password field | Present;correctness against router password not established |
| SSH password authentication | ssh_pwauth true |
| SSH service activation | runcmd contains service enable/start command |
| Boot mode | arm_64bit=1,auto_initramfs=1 |

No explicit enable_ssh key is present. This is **not** diagnosed as missing SSH setup: the matching Imager v2.0.12 generator uses a service-start command instead. Likewise absence of an explicit network renderer is not treated as a fault without the running root configuration. YAML fields/structure were inspected with allowlisted checks; no full YAML/cloud-init schema validation was claimed. No parser was installed.

## Limits and next proposal

One strictly read-only attempt to read the Linux partition header through PhysicalDrive2 was denied by Windows because this process is not elevated. No administrator prompt, package installation, privileged helper or repair was attempted. Therefore Linux startup/cloud-init/NetworkManager logs remain unread, and the cause of missing Wi-Fi/SSH is **not established**.

A possible next experiment is a2.4GHz Wi-Fi retry **without erasing the OS**:

1. Obtain explicit permission to change card files, the exact2.4GHz SSID and whether its password matches the already-entered5GHz password. Never request the password in chat;different credentials must be entered locally through an appropriate private flow.
2. Re-identify card/boot volume before writes. Retain private originals on the same card (not in Git),then change only the network target in network-config and refresh matching NoCloud instance identifiers in meta-data/cmdline.txt so setup can run again. Leave user-data/account settings unchanged.
3. Explain that changing the instance identifier reruns initial provisioning;this is an experiment,not a confirmed fix. Preserve existing files;do not format or rewrite the image. Actual values/change preview and checks depend on user-confirmed target network.
4. After approval/write checks,safely eject and guide card insertion/boot one physical checkpoint at a time,then inspect router/SSH results.

No next-experiment permission is inferred from the completed read-only-inspection authorization. No2.4GHz network is selected or file edited yet. If user chooses deeper diagnosis instead,reading Linux logs would need an explicitly approved suitable elevated/Linux reader;do not claim that access is already available.

## Primary references checked

### Subsequent approved experiment — 2026-11-05

User subsequently approves current connected2.4GHz network and same-password reuse. Preflight verifies2.4GHz/channel4 and exact card identity. Script tools/Set-PiWifi24Retry.ps1 preview then -Apply completed. Card network target and matching instance IDs changed;password line/user-data unchanged. Exact originals privately backed up on card in `.sentrion-before-wifi24-b5e24c57`. Three changed files read back successfully. No erase,repair,root write or installation. This later approved write is separate from the read-only inspection described above. Boot/connectivity trial not yet performed;await safe eject/card return.

- [Raspberry Pi cloud-init setup](https://www.raspberrypi.com/news/cloud-init-on-raspberry-pi-os/): boot-partition files and networking roles. Do not substitute its older illustrative enable_ssh key for version-specific source evidence.
- [Imager v2.0.12 generator](https://raw.githubusercontent.com/raspberrypi/rpi-imager/v2.0.12/src/customization_generator.cpp): SSH service activation via runcmd;absence of enable_ssh alone is not a defect.
- [NoCloud documentation](https://docs.cloud-init.io/en/latest/reference/datasources/nocloud.html): instance-id determines first-boot processing;changes to provisioning need a new ID or fresh disk. No metadata change performed here.
