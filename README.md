# Product Skills Plugin

Production-ready product work for Claude Code, Codex, and other skill-aware
agents: legal and privacy compliance, SOC 2 readiness, SEO, marketing, and
launch preparation.

## Included capabilities

This plugin provides specialized skills and agents for taking a finished product and preparing it for production deployment, marketing, and ongoing optimization.

## Skills

### SEO & Discovery
- `ai-seo-optimization` - Modern SEO for AI-powered search (2025 best practices), including Google Search Console striking-distance optimization
- `traditional-seo` - Classic SEO optimization techniques
- `app-store-optimization` - ASO for mobile apps

### Marketing Measurement & Closed-Loop
- `closed-loop-marketing` - Readback-metric contract that makes every marketing deliverable measurable before it ships (metric, analytics source, promote/reject rule, rollback rule)
- `experiment-stats` - Real A/B and multivariate statistics in pure Python: bootstrap confidence intervals, Mann-Whitney U, two-proportion z-test, and a dual promote-gate (significance AND minimum lift)
- `content-scorer` - Deterministic content scoring with a self-improving, on-disk rejection-memory that compounds across runs

### Legal & Compliance
- `legal-compliance` - Privacy policies, terms of service, GDPR/CCPA, broader legal/compliance workflows, and US crypto-law research for startup operations including stablecoins, token classification, FinCEN/MSB issues, tokenized assets, and broker-reporting questions
- `soc2-gap-analysis` - SOC 2 scope definition, control gap analysis, and remediation framing
- `soc2-evidence-collection` - Evidence registers, artifact quality review, and auditor request preparation
- `soc2-policy-drafting` - SOC 2 policy drafts and auditor-facing control narratives

### Analytics & Tracking
- `analytics-setup` - Google Analytics, conversion tracking
- `performance-monitoring` - Core Web Vitals, performance metrics
- `ab-testing` - A/B testing and experimentation setup

### Marketing & Launch
- `product-launch` - Launch checklists and preparation
- `landing-page-optimization` - Landing page best practices
- `press-kit` - Press kit and media asset generation

## Agents

- `legal` - Legal compliance, privacy, terms, DPAs, SOC 2 readiness, and crypto/digital-asset law research for startup operations
- `marketer` - Product marketing, launch strategy, copy, CRO, and SEO

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
