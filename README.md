# Product Skills Plugin

Production-ready product work for Claude Code, Codex, and other skill-aware
agents: legal and privacy compliance, SOC 2 readiness, SEO, marketing, and
launch preparation.

## Included capabilities

- `ai-seo-optimization` — modern search and AI-discovery optimization
- `legal-compliance` — privacy, terms, DPAs, and regulatory workflows
- `soc2-gap-analysis` — SOC 2 scope, control gaps, and remediation framing
- `soc2-evidence-collection` — evidence registers and auditor preparation
- `soc2-policy-drafting` — policy drafts and control narratives
- `legal` / Anthony — legal and compliance specialist agent
- `marketer` / Caal — growth marketing specialist agent

## Installation

**Claude Code plugin** (includes Anthony and Caal as native plugin agents):

```bash
/plugin install product-skills@b-open-io
```

**Codex plugin** (installs the portable skills):

```bash
codex plugin marketplace add b-open-io/product-skills --ref master
codex plugin add product-skills@b-open-io
```

Codex plugin installation does not silently add custom agents. After installing
the plugin, explicitly invoke `codex-agent-setup` to copy both adapters into the
current project's `.codex/agents/` directory as regular files. Request `--user`
only for an intentional user-wide install, or pass `--target` for a specific
agents directory. Start a **new Codex session** after installation or updates.

The Codex runtime IDs are:

- Anthony: `product_skills_legal`
- Caal: `product_skills_marketer`

The installer never edits global Codex configuration and preserves unrelated
custom-agent files.

## Usage

Each skill can be invoked through the runtime's skill mechanism. Agents provide
domain routing and should load the most relevant installed skills before
substantive work.

For SOC 2 work, the intended split is:

- Anthony uses `soc2-gap-analysis`, `soc2-evidence-collection`, and
  `soc2-policy-drafting` for compliance framing and auditor-facing work.
- `security-ops` in bopen-tools handles technical validation and readiness.

## Contributing

This plugin follows the standard Claude Code and Codex plugin structures. See
the individual skill directories for detailed guidance.
