#!/usr/bin/env python3
"""Install, check, update, or uninstall Product Skills Codex adapters."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from lib import (
    AGENTS,
    AGENT_FILES,
    MANAGER,
    MANIFEST_FILE,
    OWNERSHIP_FILE,
    atomic_copy,
    atomic_write,
    json_text,
    load_json,
    plugin_root,
    quarantine,
    sha256_file,
    validate_adapter,
)


def target_for(args: argparse.Namespace) -> tuple[Path, str]:
    if args.target:
        return args.target.expanduser().resolve(), "custom"
    if args.user:
        home = Path(os.environ.get("CODEX_HOME", "~/.codex")).expanduser().resolve()
        return home / "agents", "user"
    return Path.cwd().resolve() / ".codex" / "agents", "project"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    scope = parser.add_mutually_exclusive_group()
    scope.add_argument("--user", action="store_true")
    scope.add_argument("--target", type=Path)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--uninstall", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--plugin-root", type=Path)
    args = parser.parse_args(argv)

    root = args.plugin_root.resolve() if args.plugin_root else plugin_root(Path(__file__))
    source_dir = root / "codex" / "agents"
    manifest = load_json(source_dir / MANIFEST_FILE, {})
    entries = manifest.get("agents", [])
    if manifest.get("manager") != MANAGER or [entry.get("generated_file") for entry in entries] != list(AGENT_FILES):
        print("error: invalid or missing Product Skills agent manifest")
        return 1
    entry_by_file = {entry["generated_file"]: entry for entry in entries}
    for agent in AGENTS:
        validate_adapter(source_dir / agent["generated_file"], agent["agent_name"])

    target, scope_name = target_for(args)
    ownership_path = target / OWNERSHIP_FILE
    ownership = load_json(ownership_path, {"manager": MANAGER, "agents": {}})
    if ownership.get("manager") != MANAGER or not isinstance(ownership.get("agents"), dict):
        print(f"error: invalid Product Skills ownership metadata: {ownership_path}")
        return 1
    records = ownership["agents"]

    if args.uninstall:
        managed = [name for name in AGENT_FILES if name in records]
        if not managed:
            print("unchanged: no Product Skills adapters are managed in this target")
            return 0
        refused: list[str] = []
        for name in managed:
            destination = target / name
            if destination.is_symlink() and not args.force:
                refused.append(name)
            elif destination.is_file() and sha256_file(destination) != records[name].get("hash") and not args.force:
                refused.append(name)
        if refused:
            for name in refused:
                destination = target / name
                reason = "is a symlink" if destination.is_symlink() else "was modified"
                print(f"refused: {name} {reason}; use --force to uninstall")
            return 1
        if args.check:
            for name in managed:
                print(f"would uninstall: {name}")
            return 1
        for name in managed:
            destination = target / name
            if destination.exists() or destination.is_symlink():
                quarantine(destination, target)
            records.pop(name, None)
            print(f"uninstalled: {name}")
        atomic_write(ownership_path, json_text(ownership))
        print("Start a new Codex session to refresh custom agents.")
        return 0

    states: list[tuple[str, Path, Path, dict[str, object] | None, str, bool]] = []
    refused = False
    for name in AGENT_FILES:
        source = source_dir / name
        destination = target / name
        record = records.get(name)
        source_hash = sha256_file(source)
        current = (
            destination.is_file()
            and not destination.is_symlink()
            and sha256_file(destination) == source_hash
        )
        if destination.is_symlink() and not args.force:
            print(f"refused: {name} is a symlink; use --force to replace it")
            refused = True
        elif destination.exists() and not record and not args.force:
            print(f"refused unmanaged collision: {name} (use --force)")
            refused = True
        elif (
            destination.is_file()
            and record
            and sha256_file(destination) != record.get("hash")
            and not args.force
        ):
            print(f"refused modified managed file: {name} (use --force)")
            refused = True
        states.append((name, source, destination, record, source_hash, current))
    if refused:
        return 1

    if args.check:
        all_current = True
        for name, _source, _destination, _record, _source_hash, current in states:
            print(("current: " if current else "would install: ") + name)
            all_current = all_current and current
        return 0 if all_current else 1

    for name, source, destination, record, source_hash, current in states:
        if current:
            action = "unchanged"
        else:
            if destination.exists() or destination.is_symlink():
                quarantine(destination, target)
            atomic_copy(source, destination)
            action = "updated" if record else "installed"
        entry = entry_by_file[name]
        records[name] = {
            "hash": source_hash,
            "source_hash": entry["source_hash"],
            "generated_hash": entry["generated_hash"],
            "agent_name": entry["agent_name"],
            "scope": scope_name,
        }
        if destination.is_symlink() or not destination.is_file():
            print(f"error: installer did not produce a regular file: {destination}")
            return 1
        print(f"{action}: {name}")
    atomic_write(ownership_path, json_text(ownership))
    print(f"target: {target}")
    print("Start a new Codex session before invoking product_skills_legal or product_skills_marketer.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
