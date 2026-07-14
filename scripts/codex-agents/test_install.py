#!/usr/bin/env python3
"""Tests for Product Skills Codex agent generation and installation."""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import tempfile
import tomllib
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
INSTALLER = HERE / "install.py"
GENERATOR = HERE / "generate.py"
AGENTS = {
    "product-skills-legal.toml": ("agents/legal.md", "product_skills_legal", "Anthony"),
    "product-skills-marketer.toml": ("agents/marketer.md", "product_skills_marketer", "Caal"),
}


class AdapterTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def run_installer(
        self,
        *args: str,
        cwd: Path | None = None,
        env: dict[str, str] | None = None,
    ) -> subprocess.CompletedProcess[str]:
        command = [sys.executable, str(INSTALLER), "--plugin-root", str(ROOT), *args]
        return subprocess.run(
            command,
            cwd=cwd or self.base,
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_generated_toml_parses_and_preserves_canonical_bodies(self) -> None:
        for generated_name, (source_name, runtime_name, display_name) in AGENTS.items():
            with (ROOT / "codex" / "agents" / generated_name).open("rb") as handle:
                parsed = tomllib.load(handle)
            raw = (ROOT / source_name).read_text(encoding="utf-8")
            body = raw.split("\n---\n", 1)[1]
            self.assertEqual(parsed["name"], runtime_name)
            self.assertTrue(parsed["developer_instructions"].endswith("\n" + body))
            self.assertIn("Codex compatibility prelude (Product Skills)", parsed["developer_instructions"])
            self.assertIn(display_name, parsed["developer_instructions"])

    def test_generator_check(self) -> None:
        result = subprocess.run(
            [sys.executable, str(GENERATOR), "--plugin-root", str(ROOT), "--check"],
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_default_project_install_and_check(self) -> None:
        result = self.run_installer()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        for name in AGENTS:
            target = self.base / ".codex" / "agents" / name
            self.assertTrue(target.is_file())
            self.assertFalse(target.is_symlink())
        check = self.run_installer("--check")
        self.assertEqual(check.returncode, 0, check.stdout)
        for name in AGENTS:
            self.assertIn(f"current: {name}", check.stdout)

    def test_user_scope_uses_codex_home(self) -> None:
        env = os.environ.copy()
        env["CODEX_HOME"] = str(self.base / "codex-home")
        result = self.run_installer("--user", env=env)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        for name in AGENTS:
            self.assertTrue((self.base / "codex-home" / "agents" / name).is_file())

    def test_custom_target_preserves_unrelated_file(self) -> None:
        target = self.base / "custom"
        target.mkdir()
        unrelated = target / "mine.toml"
        unrelated.write_text('name = "mine"\n')
        result = self.run_installer("--target", str(target))
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(unrelated.read_text(), 'name = "mine"\n')

    def test_check_reports_pending_install(self) -> None:
        result = self.run_installer("--check")
        self.assertEqual(result.returncode, 1)
        for name in AGENTS:
            self.assertIn(f"would install: {name}", result.stdout)

    def test_update_replaces_unmodified_managed_file(self) -> None:
        self.assertEqual(self.run_installer().returncode, 0)
        target_dir = self.base / ".codex" / "agents"
        name = "product-skills-legal.toml"
        target = target_dir / name
        ownership_path = target_dir / ".product-skills-agents.json"
        ownership = json.loads(ownership_path.read_text())
        old = 'name = "product_skills_legal"\n'
        target.write_text(old)
        ownership["agents"][name]["hash"] = "sha256:" + hashlib.sha256(old.encode()).hexdigest()
        ownership_path.write_text(json.dumps(ownership))
        result = self.run_installer()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn(f"updated: {name}", result.stdout)
        self.assertIn("developer_instructions", target.read_text())

    def test_unmanaged_collision_refused_and_force_quarantines(self) -> None:
        target_dir = self.base / ".codex" / "agents"
        target_dir.mkdir(parents=True)
        name = "product-skills-legal.toml"
        collision = target_dir / name
        collision.write_text("user content\n")
        refused = self.run_installer()
        self.assertEqual(refused.returncode, 1)
        self.assertEqual(collision.read_text(), "user content\n")
        self.assertFalse((target_dir / "product-skills-marketer.toml").exists())
        forced = self.run_installer("--force")
        self.assertEqual(forced.returncode, 0, forced.stdout + forced.stderr)
        recovered = list((target_dir / ".product-skills-agents-trash").glob(f"{name}*"))
        self.assertEqual(len(recovered), 1)
        self.assertEqual(recovered[0].read_text(), "user content\n")

    def test_symlink_refused_and_force_produces_regular_file(self) -> None:
        target_dir = self.base / ".codex" / "agents"
        target_dir.mkdir(parents=True)
        name = "product-skills-marketer.toml"
        external = self.base / "external.toml"
        external.write_text("external\n")
        (target_dir / name).symlink_to(external)
        self.assertEqual(self.run_installer().returncode, 1)
        forced = self.run_installer("--force")
        self.assertEqual(forced.returncode, 0, forced.stdout + forced.stderr)
        self.assertTrue((target_dir / name).is_file())
        self.assertFalse((target_dir / name).is_symlink())
        self.assertEqual(external.read_text(), "external\n")

    def test_broken_symlink_also_requires_force(self) -> None:
        target_dir = self.base / ".codex" / "agents"
        target_dir.mkdir(parents=True)
        name = "product-skills-legal.toml"
        target = target_dir / name
        target.symlink_to(self.base / "missing.toml")
        self.assertEqual(self.run_installer().returncode, 1)
        self.assertTrue(target.is_symlink())
        forced = self.run_installer("--force")
        self.assertEqual(forced.returncode, 0, forced.stdout + forced.stderr)
        self.assertTrue(target.is_file())
        self.assertFalse(target.is_symlink())

    def test_uninstall_modified_managed_file_requires_force(self) -> None:
        self.assertEqual(self.run_installer().returncode, 0)
        target_dir = self.base / ".codex" / "agents"
        name = "product-skills-legal.toml"
        target = target_dir / name
        target.write_text("user-modified managed adapter\n")
        refused = self.run_installer("--uninstall")
        self.assertEqual(refused.returncode, 1)
        self.assertIn("use --force", refused.stdout)
        self.assertTrue((target_dir / "product-skills-marketer.toml").exists())
        forced = self.run_installer("--uninstall", "--force")
        self.assertEqual(forced.returncode, 0, forced.stdout + forced.stderr)
        for agent_name in AGENTS:
            self.assertFalse((target_dir / agent_name).exists())
        recovered = list((target_dir / ".product-skills-agents-trash").glob(f"{name}*"))
        self.assertEqual(len(recovered), 1)

    def test_uninstall_managed_symlink_requires_force(self) -> None:
        self.assertEqual(self.run_installer().returncode, 0)
        target_dir = self.base / ".codex" / "agents"
        name = "product-skills-marketer.toml"
        target = target_dir / name
        external = self.base / "external-managed.toml"
        external.write_text("external managed replacement\n")
        target.unlink()
        target.symlink_to(external)
        refused = self.run_installer("--uninstall")
        self.assertEqual(refused.returncode, 1)
        self.assertIn("is a symlink", refused.stdout)
        self.assertTrue(target.is_symlink())
        forced = self.run_installer("--uninstall", "--force")
        self.assertEqual(forced.returncode, 0, forced.stdout + forced.stderr)
        self.assertFalse(target.exists())
        self.assertEqual(external.read_text(), "external managed replacement\n")

    def test_uninstall_preserves_unrelated_file(self) -> None:
        target_dir = self.base / "custom"
        target_dir.mkdir()
        unrelated = target_dir / "another-agent.toml"
        unrelated.write_text('name = "another_agent"\n')
        self.assertEqual(self.run_installer("--target", str(target_dir)).returncode, 0)
        result = self.run_installer("--target", str(target_dir), "--uninstall")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        for name in AGENTS:
            self.assertFalse((target_dir / name).exists())
        self.assertEqual(unrelated.read_text(), 'name = "another_agent"\n')


if __name__ == "__main__":
    unittest.main()
