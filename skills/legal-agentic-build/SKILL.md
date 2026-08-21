---
name: legal-agentic-build
version: 0.0.1
description: >-
  Use when designing or building agentic legal workflows, multi-agent compliance
  pipelines, or legal AI architecture with Vercel AI SDK or CrewAI. Not for
  privacy policy, terms, DPA, or regulatory analysis — those stay on
  legal-compliance. Anthony does not load this skill before a policy draft.
---

# Legal Agentic Build

Build legal-agent systems. Do not use this file to draft a privacy policy, ToS, DPA, or to answer a regulation question. That is `legal-compliance`. Anthony stays analysis-only unless the human asked to design or build the pipeline.

## When

- Multi-agent legal workflow (triage → research → analyze → draft → human gate)
- Vercel AI SDK tool calling / structured output for legal data sources
- CrewAI orchestration of legal roles
- Reviewing open-source legal-agent repos (LegalAnt, LegalTrace, and the GitHub reference)

## When not

- Privacy policy, terms, cookie policy, DPA
- GDPR / CCPA / HIPAA / Howey / GENIUS / MSB analysis
- SOC 2 policy or evidence
- TokenPass protocol, Native SDK packaging, or generic software-factory loops

## References (moved out of legal-compliance)

- `references/agentic-workflows.md` — 4-agent legal pattern, Council case study, bootstrap notes
- `references/agentic-tech-stack.md` — Vercel AI SDK + CrewAI, CourtListener tools, Vercel/Railway deploy
- `references/github-legal-agent-implementations.md` — open-source legal-agent repos and architectures

Human review gate is a hard stop in every production pattern. Not a licensed attorney; same ethics line as legal-compliance.

## Related

- `product-skills:legal-compliance` — analysis and document drafting
- `orchestra:software-factory` — generic agentic loops, not legal-agent architecture
