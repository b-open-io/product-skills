# SOC 2 Control Areas

Use this file to structure the review. Do not copy it verbatim into the final output. Pull only the control areas that apply to the scoped audit.

## 1. Access Control

Review questions:
- Is access provisioned through a defined process?
- Are admin privileges restricted and reviewable?
- Is offboarding tied to access removal?
- Are MFA and SSO enforced where appropriate?

Good evidence:
- Access control policy
- SSO or IdP configuration screenshots or exports
- User access review records
- Joiner/mover/leaver workflow tickets

Common gaps:
- Shared admin accounts
- No periodic access review
- Offboarding is manual and undocumented
- MFA enabled for some systems but not critical ones

## 2. Change Management

Review questions:
- Are production changes reviewed before deployment?
- Are emergency changes handled with follow-up review?
- Is there a deploy history tied to tickets or PRs?

Good evidence:
- PR review settings
- Branch protection rules
- Change tickets
- Deployment logs tied to commits

Common gaps:
- Direct pushes to production branches
- No approval trail
- Emergency changes with no retrospective record

## 3. Logging and Monitoring

Review questions:
- Are security-relevant events logged?
- Are alerts reviewed by someone accountable?
- Is log retention defined?

Good evidence:
- Alerting configuration
- Logging platform screenshots or exports
- Incident tickets referencing alerts
- Retention settings

Common gaps:
- Logs exist but no alert workflow
- Logs do not cover auth or privileged actions
- Retention period is unknown

## 4. Vulnerability and Patch Management

Review questions:
- Are dependencies and infrastructure scanned?
- Are vulnerabilities triaged and tracked?
- Is remediation timing defined by severity?

Good evidence:
- Scan reports
- Remediation tickets
- Patch windows or SLA policy
- Dependency audit history

Common gaps:
- Scans are ad hoc
- Findings are not tracked to closure
- No severity-based remediation timeline

## 5. Incident Response

Review questions:
- Is there an incident response process?
- Are incidents documented and reviewed?
- Are communication and escalation paths defined?

Good evidence:
- Incident response policy
- Incident runbooks
- Postmortems
- On-call or escalation docs

Common gaps:
- No named owner
- No evidence of testing or real usage
- Security incidents handled in chat with no durable record

## 6. Backups and Recovery

Review questions:
- Are backups performed on critical systems?
- Is restoration tested?
- Are RPO and RTO defined for material systems?

Good evidence:
- Backup configuration
- Restore test records
- Disaster recovery plan
- Backup monitoring alerts

Common gaps:
- Backups assumed but not verified
- No restore testing
- Recovery expectations not documented

## 7. Risk Management

Review questions:
- Is there a recurring risk review?
- Are material risks assigned owners?
- Are remediation decisions documented?

Good evidence:
- Risk register
- Quarterly risk review notes
- Decision logs

Common gaps:
- Risks discussed informally only
- No owner or due date
- No prioritization method

## 8. Vendor Management

Review questions:
- Are critical vendors identified?
- Are vendor security claims reviewed?
- Are DPAs, security terms, or attestations collected where needed?

Good evidence:
- Vendor inventory
- Vendor review checklist
- DPAs or security agreements
- Trust center exports or questionnaires

Common gaps:
- No vendor tiering
- No review of subprocessors or critical SaaS tools
- Vendor assurances accepted without records

## 9. People and Security Awareness

Review questions:
- Are onboarding and security training defined?
- Are role expectations clear for privileged personnel?
- Is disciplinary or exception handling documented?

Good evidence:
- Handbook or policy
- Security training logs
- Onboarding checklist

Common gaps:
- Training is informal
- No record of completion
- Privileged personnel not singled out for higher scrutiny

## 10. Data Handling and Retention

Review questions:
- Is sensitive data classified or at least described?
- Are retention and deletion expectations defined?
- Are customer commitments aligned with actual practice?

Good evidence:
- Data classification standard
- Retention matrix
- Deletion workflow docs
- Privacy policy cross-check

Common gaps:
- No retention schedule
- Deletion is manual and undocumented
- Public statements overpromise compared with operations

