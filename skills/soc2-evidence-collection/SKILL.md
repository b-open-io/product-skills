---
name: soc2-evidence-collection
description: This skill should be used when the user asks to "collect SOC 2 evidence", "build an evidence register", "prepare evidence for the auditor", "what artifacts do we need", "organize our control evidence", "respond to an auditor request list", or mentions evidence gathering, control artifacts, audit requests, screenshots, exports, or testing records for SOC 2.
version: 0.1.0
---

# SOC 2 Evidence Collection

Use this skill to gather, normalize, and judge evidence for SOC 2 controls. Focus on evidence quality, coverage, and traceability.

This skill is for collecting and evaluating artifacts. It does not replace a control review and it does not draft policies.

## Core Rules

1. Prefer system exports, tickets, logs, and reports over screenshots.
2. Tie every artifact to a control area and time period.
3. Mark weak evidence honestly.
4. Keep a reusable evidence register.
5. When facts are missing, write a follow-up request instead of making assumptions.

## Workflow

### 1. Define the evidence request

Capture:
- Audit target or readiness phase
- Review period
- Criteria in scope
- Control areas needing evidence

### 2. Load the evidence guides

Use:
- `references/evidence-catalog.md`
- `references/evidence-quality-bar.md`

### 3. Build the evidence register

For each requested control:
- Artifact name
- Control area
- Source system
- Owner
- Date or period covered
- Strength: `strong`, `acceptable`, `weak`, `missing`
- Follow-up required

### 4. Judge evidence quality

Use these checks:
- Is the artifact dated?
- Is it tied to the correct period?
- Does it show the control operating, not just existing?
- Is the source authoritative?
- Can someone else re-trace it later?

### 5. Produce follow-ups

When evidence is weak or missing, request the next best artifact. Do not stop at "need more evidence." Say exactly what would satisfy the gap.

## Output Contract

Always return:

### 1. Evidence Register

Use this table:

| Control Area | Artifact | Source | Period Covered | Strength | Notes | Follow-Up |
|---|---|---|---|---|---|---|

### 2. Missing or Weak Evidence

List every weak or missing item with the exact replacement artifact requested.

### 3. Reuse Notes

State which artifacts should be retained as recurring audit evidence.

## Escalation Rules

- If the task turns into control design or prioritization, load `soc2-gap-analysis`.
- If the task turns into narrative or policy work, load `soc2-policy-drafting`.

## Reference Files

- `references/evidence-catalog.md` - Common evidence by control family
- `references/evidence-quality-bar.md` - How to judge weak versus acceptable evidence

## Examples

- `examples/evidence-register.md` - Example register format

