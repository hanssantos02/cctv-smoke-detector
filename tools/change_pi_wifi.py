#!/usr/bin/env python3
"""Change this inspected offline Pi card's Wi-Fi profile from a Linux terminal.

Default: read-only preview. --apply requests a password privately and requires a
final YES before any mount change/write. No packages, Pi code, network apply,
account changes, cloud-init rerun, or flashing. Original credentials stay in a
private backup on the card; secrets are never printed or placed in this repo.
"""

import argparse
import copy
from datetime import datetime, timezone
import getpass
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import uuid

import yaml

ROOT = Path(__file__).resolve().parent.parent / "tmp" / "pi-rootfs"
SOURCE = "/dev/sda2"
DISK = "/dev/sda"
CARD_BYTES = 31299993600
MAX_CONFIG_BYTES = 256 * 1024


class Stop(Exception):
    """A deliberately fixed error message, safe to show without private data."""


def run(args):
    """Capture external output so tool errors cannot reveal private settings."""
    result = subprocess.run(args, capture_output=True, text=True, check=False)
    if result.returncode:
        raise Stop("A system command failed; stopped without printing its private output.")
    return result.stdout


def inside(path):
    """Refuse links that could redirect a card operation to the laptop."""
    path.resolve().relative_to(ROOT.resolve())
    return path


def check_mount(readonly):
    mounts = json.loads(run([
        "findmnt", "--json", "--mountpoint", str(ROOT),
        "-o", "SOURCE,TARGET,FSTYPE,OPTIONS",
    ])).get("filesystems", [])
    if len(mounts) != 1:
        raise Stop("Expected exactly one mount at the project's Pi folder.")
    mount = mounts[0]
    options = set(mount.get("options", "").split(","))
    if (mount.get("source") != SOURCE or mount.get("target") != str(ROOT)
            or mount.get("fstype") != "ext4"
            or ("ro" if readonly else "rw") not in options
            or (readonly and not options.intersection({"noload", "norecovery"}))):
        raise Stop("Card mount does not match the inspected device/access mode.")
    disks = json.loads(run([
        "lsblk", "--json", "--bytes", "--paths",
        "-o", "NAME,TYPE,TRAN,RM,SIZE,FSTYPE,LABEL", DISK,
    ])).get("blockdevices", [])
    if len(disks) != 1:
        raise Stop("Expected one inspected USB card.")
    disk = disks[0]
    children = disk.get("children", [])
    rootpart = [p for p in children if p.get("name") == SOURCE]
    bootpart = [p for p in children if p.get("name") == "/dev/sda1"]
    if (disk.get("name") != DISK or disk.get("tran") != "usb"
            or not disk.get("rm") or int(disk.get("size", 0)) != CARD_BYTES
            or len(rootpart) != 1 or rootpart[0].get("label") != "rootfs"
            or rootpart[0].get("fstype") != "ext4"
            or len(bootpart) != 1 or bootpart[0].get("label") != "bootfs"
            or int(bootpart[0].get("size", 0)) != 536870912):
        raise Stop("USB card identity/layout changed; reidentify it before continuing.")


def current_ssid():
    """Read only the laptop's active network identity, never its saved password."""
    rows = run(["nmcli", "-t", "-f", "UUID,TYPE,DEVICE", "connection", "show", "--active"])
    connections = []
    for row in rows.splitlines():
        fields = row.split(":")
        if len(fields) == 3 and fields[1] in ("wifi", "802-11-wireless"):
            if re.fullmatch(r"[0-9a-fA-F-]{36}", fields[0]):
                connections.append(fields[0])
    if len(connections) != 1:
        raise Stop("Laptop must have exactly one active Wi-Fi connection.")
    connection = connections[0]
    ssid = run(["nmcli", "--escape", "no", "-g", "802-11-wireless.ssid",
                "connection", "show", connection]).rstrip("\n")
    if not 1 <= len(ssid.encode("utf-8")) <= 32 or any(ord(c) < 32 for c in ssid):
        raise Stop("Current network name has an unsupported format.")
    key_management = run([
        "nmcli", "-g", "802-11-wireless-security.key-mgmt",
        "connection", "show", connection,
    ]).strip()
    if key_management != "wpa-psk":
        raise Stop("This helper requires the inspected WPA/WPA2 personal Wi-Fi; other security needs review.")
    return ssid


def load_profile():
    """Find the single existing wlan0 profile; never guess a private filename."""
    matches = []
    directory = inside(ROOT / "etc/netplan")
    for path in sorted(directory.iterdir()):
        if path.suffix not in (".yaml", ".yml"):
            continue
        inside(path)
        if path.is_symlink() or path.stat().st_size > MAX_CONFIG_BYTES:
            raise Stop("Unexpected Netplan link/file size; manual review needed.")
        original = path.read_bytes()
        document = yaml.safe_load(original)
        network = document.get("network", {}) if isinstance(document, dict) else {}
        wifis = network.get("wifis", {})
        if not isinstance(wifis, dict):
            raise Stop("Unexpected Wi-Fi structure; stopped.")
        if wifis:
            if set(wifis) != {"wlan0"} or len(wifis["wlan0"].get("access-points", {})) != 1:
                raise Stop("Expected the single wlan0/access-point profile already inspected.")
            matches.append((path, original, document))
    if len(matches) != 1:
        raise Stop("Expected exactly one saved Wi-Fi profile to replace.")
    return matches[0]


def new_profile(document, ssid, password):
    """Preserve all other settings, replacing this interface's old access point."""
    updated = copy.deepcopy(document)
    updated["network"]["wifis"]["wlan0"]["access-points"] = {
        ssid: {"password": password},
    }
    payload = yaml.safe_dump(updated, sort_keys=False, allow_unicode=True).encode("utf-8")
    if yaml.safe_load(payload) != updated:
        raise Stop("New YAML did not pass its round-trip check.")
    return payload


def atomic_write(path, content):
    """Write a private temporary file, then replace atomically on the same disk."""
    inside(path)
    fd, temporary = tempfile.mkstemp(prefix=".sentrion-wifi-", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as stream:
            os.fchmod(stream.fileno(), 0o600)
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
        directory_fd = os.open(path.parent, os.O_RDONLY | os.O_DIRECTORY)
        try:
            os.fsync(directory_fd)
        finally:
            os.close(directory_fd)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def apply(path, original, payload):
    """Temporarily open the verified card for writing; always try to restore ro."""
    check_mount(readonly=True)
    if path.read_bytes() != original:
        raise Stop("Profile changed during preview; stopped.")
    run(["umount", str(ROOT)])
    writable = False
    attempted_write = False
    completed = False
    try:
        # A fresh normal rw mount is needed: do not remount ro,noload as rw.
        run(["mount", "-t", "ext4", "-o", "rw,nosuid,nodev", SOURCE, str(ROOT)])
        writable = True
        check_mount(readonly=False)
        if path.read_bytes() != original:
            raise Stop("Profile differs after mounting; stopped before editing.")
        backup_parent = inside(ROOT / "var/backups/sentrion-wifi")
        backup_parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        os.chmod(backup_parent, 0o700)
        backup = backup_parent / (datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ-") + uuid.uuid4().hex[:8])
        backup.mkdir(mode=0o700)
        atomic_write(backup / "original.yaml", original)
        atomic_write(backup / "target.json", json.dumps({
            "relative_path": str(path.relative_to(ROOT)),
        }).encode("utf-8"))
        if (backup / "original.yaml").read_bytes() != original:
            raise Stop("Backup verification failed; saved profile not changed.")
        attempted_write = True
        atomic_write(path, payload)
        if path.read_bytes() != payload:
            raise Stop("Updated file did not pass readback verification.")
        completed = True
        print("Wi-Fi profile replaced; private on-card backup and readback verified.")
    except (Exception, KeyboardInterrupt):
        if attempted_write:
            check_mount(readonly=False)
            atomic_write(path, original)
            if path.read_bytes() != original:
                raise Stop("STOP: rollback verification failed. Keep the card connected.")
            print("Update did not complete; original profile restored and verified.")
        raise
    finally:
        # Even a failed rw mount should leave the original read-only view restored.
        try:
            if writable:
                run(["umount", str(ROOT)])
            run(["mount", "-t", "ext4", "-o", "ro,noload,nosuid,nodev", SOURCE, str(ROOT)])
            check_mount(readonly=True)
            print("Card root filesystem is mounted read-only again.")
        except Exception:
            raise Stop("STOP: could not verify restored read-only mount. Keep card connected; report this error.") from None
    return completed


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="prompt locally, then back up and replace the saved Wi-Fi profile")
    args = parser.parse_args()
    if os.geteuid() != 0:
        raise Stop("Run this card-access helper with sudo in your own terminal.")
    check_mount(readonly=True)
    ssid = current_ssid()
    path, original, document = load_profile()
    old_ssid = next(iter(document["network"]["wifis"]["wlan0"]["access-points"]))
    print("Verified: inspected USB Pi card, read-only mount, one saved wlan0 profile.")
    print("Target: laptop's currently connected WPA/WPA2 personal Wi-Fi (name hidden).")
    print("Target differs from saved network:", "yes" if old_ssid != ssid else "no")
    print("Change: back up on card, replace saved access point/password, verify, restore read-only mount.")
    print("Account/SSH/boot seed/instance IDs are not edited; no reflash or setup rerun.")
    if not args.apply:
        print("PREVIEW ONLY: no mounts or files changed. Use --apply after reviewing this scope.")
        return 0
    if not sys.stdin.isatty() or not sys.stderr.isatty():
        raise Stop("Private password entry requires your interactive terminal.")
    password = getpass.getpass("Current router Wi-Fi password (hidden): ")
    repeat = getpass.getpass("Repeat Wi-Fi password (hidden): ")
    if password != repeat:
        raise Stop("Passwords did not match; nothing changed.")
    if not ((8 <= len(password) <= 63 and all(32 <= ord(c) <= 126 for c in password))
            or (len(password) == 64 and all(c in "0123456789abcdefABCDEF" for c in password))):
        raise Stop("Expected an 8-63 character ASCII WPA passphrase or 64 hexadecimal key; nothing changed.")
    payload = new_profile(document, ssid, password)
    if input("Allow the card writes and temporary writable mount described above? Type YES: ") != "YES":
        print("Cancelled; no mounts or files changed.")
        return 0
    if current_ssid() != ssid:
        raise Stop("Laptop changed Wi-Fi during confirmation; nothing changed.")
    apply(path, original, payload)
    print("Keep card connected and Pi off. Report this summary before safe removal.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Stop as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
    except (Exception, KeyboardInterrupt):
        # YAML/OS exceptions may embed credentials: never print them or a traceback.
        print("Stopped. Private error details suppressed; keep card connected and report where it stopped.", file=sys.stderr)
        sys.exit(1)
