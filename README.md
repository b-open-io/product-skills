# Product Skills Plugin

A plugin for production-ready product work including legal/compliance, SEO, analytics, and launch preparation.

## Overview

This plugin provides specialized skills and agents for taking a finished product and preparing it for production deployment, marketing, and ongoing optimization.

## Skills

### SEO & Discovery
- `ai-seo-optimization` - Modern SEO for AI-powered search (2025 best practices)
- `traditional-seo` - Classic SEO optimization techniques
- `app-store-optimization` - ASO for mobile apps

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

```bash
# Clone the repository
git clone https://github.com/b-open-io/product-skills.git

# Or add as a Claude plugin
# In your .claude/settings.json or project settings
```

## Usage

Each skill can be invoked through the Skill tool in Claude. Agents provide domain routing and should call the most relevant skills before starting substantive work.

For SOC 2 work, the intended split is:
- `legal` uses `soc2-gap-analysis`, `soc2-evidence-collection`, and `soc2-policy-drafting`
- `security-ops` in `bopen-tools` uses the technical readiness and evidence skills for control validation

## Contributing

This plugin follows the standard structure for Claude plugins. See individual skill directories for specific documentation.
