---
name: soc2-policy-drafting
description: This skill should be used when the user asks to "draft a SOC 2 policy", "write an access control policy", "write an incident response policy", "create security policies for audit", "prepare policy documents for SOC 2", "draft our control narratives", or mentions policy drafting, approval cadence, review frequency, governance language, or auditor-facing policy documentation for SOC 2.
version: 0.1.0
---

# SOC 2 Policy Drafting

Use this skill to draft policy documents and control narratives that are audit-ready, reviewable, and explicit about assumptions.

This skill is for policy and narrative drafting. It is not for proving the control exists. Do not invent operational facts to make the draft sound complete.

## Core Rules

1. Draft from confirmed facts first.
2. Put placeholders or assumption notes where facts are missing.
3. Separate current-state language from recommended future-state language.
4. Keep policy statements auditable and specific.
5. Avoid promises the company cannot currently evidence.

## Workflow

### 1. Identify the document type

Common policy types:
- Access control
- Change management
- Incident response
- Backup and recovery
- Vulnerability management
- Vendor management
- Security awareness

### 2. Gather factual inputs

Load `references/fact-intake-checklist.md`.

Before drafting, confirm:
- Systems in scope
- Control owner role
- Review cadence
- Enforcement mechanism
- Exceptions path
- Approval authority

### 3. Draft from the outline

Load `references/policy-outline.md`.

Use the outline that matches the requested policy. Keep the draft concrete enough to audit, but do not pretend unknown facts are settled.

### 4. Add review notes

Always append:
- Assumptions used
- Missing facts
- Evidence that should exist to support the policy

## Output Contract

Always return:

### 1. Draft Policy

Use clear section headings and plain, enforceable language.

### 2. Assumptions and Missing Facts

Make unresolved items easy to review.

### 3. Evidence Hooks

List the artifacts that should exist if the policy is actually followed.

## Drafting Rules

Do not invent:
- Specific approver names
- Review frequencies
- Retention periods
- Tool names not confirmed by the user
- Claims such as "all systems," "always," or "regularly" without support

Prefer formulations like:
- "The Company reviews privileged access at a defined cadence approved by management."
- "If the current review cadence is quarterly, update this section to say so explicitly."

## Escalation Rules

- If the task becomes a readiness review, load `soc2-gap-analysis`.
- If the task becomes evidence-heavy, load `soc2-evidence-collection`.

## Reference Files

- `references/fact-intake-checklist.md` - What to confirm before drafting
- `references/policy-outline.md` - Reusable section structures by policy type

## Examples

- `examples/access-control-policy-outline.md` - Example policy structure with review notes

