#!/usr/bin/env python3
"""Summarize the offline Pi's Netplan files without revealing Wi-Fi secrets.

Run from the Linux laptop after mounting the card read-only. This script never
mounts a disk, edits a file, starts a service, or contacts a network. sudo is
needed only because the Pi's network configuration files are private to root.
"""

import json
from pathlib import Path
import subprocess
import sys

try:
    import yaml
except ImportError:
    print("STOP: Python PyYAML is unavailable. Do not install anything yet.")
    sys.exit(1)


# The mount folder belongs to this checkout, so no old PC path is hardcoded.
PROJECT = Path(__file__).resolve().parent.parent
ROOT = PROJECT / "tmp" / "pi-rootfs"
MAX_CONFIG_BYTES = 256 * 1024


def mapping(value):
    """Treat absent/malformed sections as empty; never print their raw values."""
    return value if isinstance(value, dict) else {}


def boolean(value):
    """Only emit fixed labels, even if a field contains unexpected private text."""
    if value is True:
        return "yes"
    if value is False:
        return "no"
    return "not specified / unrecognized"


def summarize(document):
    """Produce allowlisted facts, never configuration lines, names or passwords."""
    network = mapping(mapping(document).get("network"))
    renderer = network.get("renderer")
    yield "Renderer in this file: " + (
        renderer if renderer in ("NetworkManager", "networkd")
        else "not specified / unrecognized"
    )
    wifis = mapping(network.get("wifis"))
    yield f"Wi-Fi definitions: {len(wifis)}"
    for index, (interface, raw_config) in enumerate(wifis.items(), 1):
        config = mapping(raw_config)
        # Some generated files use an opaque ID instead of wlan0. Hide that ID.
        label = "wlan0" if interface == "wlan0" else "other ID (hidden)"
        yield f"  Wi-Fi definition {index}: {label}"
        yield "    DHCP IPv4 requested: " + boolean(config.get("dhcp4"))
        aps = mapping(config.get("access-points"))
        yield f"    Saved access points: {len(aps)}"
        for ap_index, (ssid, raw_ap) in enumerate(aps.items(), 1):
            ap = mapping(raw_ap)
            auth = mapping(ap.get("auth"))
            passthrough = mapping(mapping(ap.get("networkmanager")).get("passthrough"))
            # Credentials can appear in more than one supported YAML shape.
            candidates = (
                ap.get("password"), auth.get("password"), auth.get("psk"),
                passthrough.get("wifi-security.psk"),
                passthrough.get("802-11-wireless-security.psk"),
            )
            present = any(isinstance(x, str) and bool(x) for x in candidates)
            plausible = any(
                isinstance(x, str) and (
                    8 <= len(x) <= 63 or
                    (len(x) == 64 and all(c in "0123456789abcdefABCDEF" for c in x))
                ) for x in candidates
            )
            yield f"    Access point {ap_index}:"
            yield "      Network name present: " + boolean(isinstance(ssid, str) and bool(ssid))
            yield "      Password field present: " + boolean(present)
            yield "      WPA password length/format plausible: " + boolean(plausible)
            yield "      Hidden-network flag: " + boolean(ap.get("hidden"))
    # These checks cannot prove the SSID/password are correct or that Wi-Fi joined.


def main():
    # Require this exact folder to be a real ext4 mount, not an ordinary directory
    # accidentally pointing at the laptop. Capture tool errors; do not echo them.
    result = subprocess.run(
        ["findmnt", "--json", "--mountpoint", str(ROOT),
         "-o", "SOURCE,TARGET,FSTYPE,OPTIONS"],
        capture_output=True, text=True, check=False,
    )
    try:
        mounts = json.loads(result.stdout).get("filesystems", [])
        mount = mounts[0] if len(mounts) == 1 else {}
        options = set(mount.get("options", "").split(","))
    except (ValueError, TypeError, AttributeError):
        mount, options = {}, set()
    if (result.returncode != 0 or mount.get("fstype") != "ext4"
            or mount.get("target") != str(ROOT) or "ro" not in options
            or not options.intersection({"noload", "norecovery"})):
        print("STOP: expected read-only ext4 mount with noload/norecovery not verified.")
        return 1
    print("Read-only Pi mount verified.")

    directory = ROOT / "etc" / "netplan"
    # Refuse links escaping the mounted filesystem. Never follow them into the
    # laptop's own /etc, and never print private filenames or parser exceptions.
    try:
        directory.resolve().relative_to(ROOT.resolve())
        files = sorted(p for p in directory.iterdir() if p.suffix in (".yaml", ".yml"))
    except (OSError, ValueError):
        print("STOP: Netplan directory unavailable or outside card.")
        return 1
    print(f"Netplan configuration files: {len(files)} (filenames hidden)")
    failed = False
    for index, path in enumerate(files, 1):
        print(f"Configuration file {index}:")
        try:
            path.resolve().relative_to(ROOT.resolve())
            if path.is_symlink() or path.stat().st_size > MAX_CONFIG_BYTES:
                raise ValueError("refuse link or unexpectedly large file")
            document = yaml.safe_load(path.read_text())
            for line in summarize(document):
                print("  " + line)
        except PermissionError:
            print("  Permission denied. Run this approved read-only check with sudo.")
            failed = True
        except (OSError, ValueError, yaml.YAMLError, RecursionError):
            print("  Cannot safely parse this file; raw error text suppressed.")
            failed = True
    print("No card files changed. Names/passwords are not displayed or validated.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
