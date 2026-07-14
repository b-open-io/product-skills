---
name: codex-agent-setup
description: >-
  Explicit-only installer for the Product Skills Anthony and Caal Codex custom
  agents. Use ONLY when the user explicitly asks to install, update, check,
  uninstall, or set up Product Skills agents in Codex, including "install
  Anthony in Codex", "install Caal in Codex", "update the Product Skills Codex
  agents", or "check product_skills_legal". Never auto-invoke for ordinary
  legal, compliance, SOC 2, SEO, marketing, CRO, copywriting, or launch work.
disable-model-invocation: false
user-invocable: true
metadata:
  author: b-open-io
  version: "1.0.0"
  codex:
    disable_model_invocation: true
    explicit_invocation_only: true
    never_modify_global_config: true
---

# Product Skills Codex Agent Setup

Install the generated Anthony and Caal Codex adapters as regular files. Run this
skill only after an explicit request to install, update, check, or uninstall
these agents.

## Safety contract

- Default to the current project's `.codex/agents/` directory.
- Use `--user` only when the user explicitly requests a user-wide install.
- Never edit `~/.codex/config.toml` or any global Codex configuration.
- Never create plugin-cache symlinks or delete unrelated custom agents.
- Run `--check` when the user asks what would change.

## Commands

```bash
bash "${SKILL_DIR}/scripts/setup.sh" [--check|--uninstall|--force]
bash "${SKILL_DIR}/scripts/setup.sh" --user [--check|--uninstall|--force]
bash "${SKILL_DIR}/scripts/setup.sh" --target /custom/agents/directory
```

The installer manages only `product-skills-legal.toml` and
`product-skills-marketer.toml`, recording ownership in
`.product-skills-agents.json`. Unmanaged collisions and symlinks are refused
unless the user explicitly authorizes `--force`.

After a successful install or update, tell the user to start a **new Codex
session**, then invoke Anthony as `product_skills_legal` or Caal as
`product_skills_marketer`.

## Maintainer generation

```bash
bash "${SKILL_DIR}/scripts/generate.sh"
bash "${SKILL_DIR}/scripts/generate.sh" --check
```
