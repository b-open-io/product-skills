# Example SOC 2 Readiness Report

## Scope Summary

- Audit target: SOC 2 Type I readiness
- Criteria in scope: Security only
- Product in scope: SaaS application, production environment, support tooling
- Assumptions: No formal audit period yet; review based on current-state artifacts only

## Gap Matrix

| Control Area | What Was Reviewed | Status | Gap Type | Priority | Evidence Seen | Next Action | Suggested Owner |
|---|---|---|---|---|---|---|---|
| Access Control | Google Workspace, GitHub, production admin access | partial | evidence + implementation | high | MFA enabled, no documented access review | Start quarterly admin access review and retain export | Security / IT |
| Change Management | GitHub PR flow and deployment setup | pass | none | low | Branch protection, required review, deploy history | Keep review records tied to releases | Engineering |
| Incident Response | Existing incident notes in Slack only | gap | control | high | Informal incident handling | Publish incident response runbook and durable postmortem template | Security / Ops |
| Vendor Management | Critical SaaS vendors listed informally | partial | evidence | medium | Spreadsheet list, no review cadence | Create vendor inventory with tiering and annual review field | Legal / Ops |

## Top Blockers

1. No durable incident response process or tested runbook.
2. No formal admin access review records.
3. Vendor inventory exists informally but lacks review evidence.

## Open Questions

- Which production systems are treated as critical for recovery planning?
- Is there a defined restore test for the primary database?
- Which vendors process customer data versus internal-only data?

