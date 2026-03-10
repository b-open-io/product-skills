# SOC 2 Evidence Catalog

Use this catalog to ask for the right artifact, not just any artifact.

## Access Control

Prefer:
- IdP user export
- MFA enforcement settings
- Admin role membership export
- Access review record with reviewer and date

Weak substitutes:
- Undated screenshots
- Verbal confirmation that MFA is enabled

## Change Management

Prefer:
- Branch protection settings
- PR review logs
- Deployment history tied to commits
- Emergency change tickets

Weak substitutes:
- A code sample showing PRs exist
- A screenshot with no date or repository context

## Vulnerability Management

Prefer:
- Scan reports
- Ticket links for remediation
- Severity-based SLA or policy
- Closure records

Weak substitutes:
- A single clean scan with no cadence
- A statement that "we run scans sometimes"

## Logging and Monitoring

Prefer:
- Alert configuration export
- Sample alert tickets
- Retention settings
- Monitoring dashboard with owner and period context

Weak substitutes:
- A screenshot of a dashboard with no legend or time window

## Incident Response

Prefer:
- Incident runbook
- Incident ticket or postmortem
- On-call escalation record
- Tabletop exercise notes

Weak substitutes:
- Slack thread with no durable summary

## Backups and Recovery

Prefer:
- Backup configuration
- Restore test record
- Backup failure alerts
- DR plan with dates

Weak substitutes:
- Vendor default claim with no org-specific configuration proof

## Vendor Management

Prefer:
- Vendor inventory
- Tiering logic
- Trust center artifacts or questionnaire responses
- DPA or security addendum

Weak substitutes:
- A vendor list with no owner or review date

