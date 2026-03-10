---
name: soc2-gap-analysis
description: This skill should be used when the user asks to "prepare for SOC 2", "run a SOC 2 gap analysis", "check our audit readiness", "map our controls", "what controls are missing", "review us for SOC 2 Type I", "review us for SOC 2 Type II", or mentions SOC 2, trust service criteria, control gaps, auditor prep, trust center readiness, or remediation planning.
version: 0.1.0
---

# SOC 2 Gap Analysis

Use this skill to run a structured SOC 2 readiness review. Keep the skill behavioral: inspect current controls, sort findings by evidence quality and control quality, and produce a remediation-oriented report.

This skill is for readiness analysis, not legal advice and not an attestation. Never claim a company is "SOC 2 compliant" or "audit ready" unless the user explicitly provides current evidence that supports that statement.

## Core Rules

1. Separate `control gaps` from `evidence gaps`.
2. Mark unknowns clearly instead of smoothing them over.
3. Scope the review before evaluating controls.
4. Prefer concrete artifacts over narrative claims.
5. Route policy drafting to `soc2-policy-drafting` and evidence chasing to `soc2-evidence-collection` when the task becomes document-heavy.

## Workflow

### 1. Confirm scope

Capture:
- Product or service in scope
- Environments in scope
- Audit target: Type I, Type II, or readiness only
- Trust Services Criteria in scope
- Review period, if any

If the user does not specify Trust Services Criteria, assume `Security` only and say so.

### 2. Build the review frame

Load `references/control-areas.md`.

Use the control areas there to build a working checklist. Only pull in areas relevant to the scoped criteria. Do not force every control family into every review.

### 3. Review artifacts and implementation signals

For each control area:
- Identify what exists today
- Identify what evidence exists today
- Mark one of: `pass`, `gap`, `partial`, `unknown`, `not-applicable`
- Note whether the weakness is design, implementation, or evidence quality

### 4. Rank gaps

Use this priority model:
- `high`: likely audit blocker or material control weakness
- `medium`: important but can be remediated inside the audit prep window
- `low`: polish, hardening, or documentation cleanup

### 5. Produce a remediation plan

For every non-pass finding:
- State the missing control or evidence
- State the likely owner role
- State the next concrete action
- State what artifact would close the gap

## Output Contract

Always return:

### 1. Scope Summary

Include:
- Audit target
- Criteria in scope
- Systems or products in scope
- Assumptions

### 2. Gap Matrix

Use this table:

| Control Area | What Was Reviewed | Status | Gap Type | Priority | Evidence Seen | Next Action | Suggested Owner |
|---|---|---|---|---|---|---|---|

### 3. Top Blockers

List the 3-5 issues most likely to block audit progress.

### 4. Open Questions

List the missing facts that prevent a firmer answer.

## Escalation Rules

- If the user needs actual evidence gathering, load `soc2-evidence-collection`.
- If the user needs policy or narrative docs, load `soc2-policy-drafting`.
- If the review becomes code- or config-heavy, hand technical validation to the security agent.

## Reference Files

- `references/control-areas.md` - Control families, review questions, acceptable evidence, common failure modes

## Examples

- `examples/startup-readiness-report.md` - Example of a concise readiness report

