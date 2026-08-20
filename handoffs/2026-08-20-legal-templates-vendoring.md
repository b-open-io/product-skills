# Handoff: vendor General-Legal/legal-templates into legal-compliance

- **Status**: OPEN — awaiting pickup (decision confirmed pending @rohenaz sign-off on Option A+D)
- **Tracker**: https://github.com/b-open-io/product-skills/issues/2 (single source of progress truth — full checklists live there)
- **Linear**: [OPL-3728](https://linear.app/openprotocollabs/issue/OPL-3728/vendor-general-legal-legal-templates-into-product-skills-legal)
- **Owners**: Anthony (legal content), prompt-engineer/Zack (skill wiring)
- **Background**: Anthony's full review + options analysis:
  `plans/legal-templates-integration/` on `b-open-io/prompts` branch
  `claude/lessons-learned-integration-g3r1cy` (docs 000 + 001)

## The work

[General-Legal/legal-templates](https://github.com/General-Legal/legal-templates) (CC0-1.0,
public domain, pin to commit `c7c947f`) provides attorney-drafted startup templates. Anthony
reviewed all of it on 2026-08-20.

**Phase 1 — repair + vendor into `skills/legal-compliance/references/templates/`:**
NDAs (strip biotech residue, fix injunction-clause asymmetry, keep the AI-tools clause),
Global DPA (near-verbatim + add EU-US DPF mention), US + GDPR privacy policies (**regenerate
from the .docx — the markdown is broken**), cookie notice, ToU, advisor agreement, CA offer
letter. Provenance header on every file; lock entry with `source`/`ref`/`computedHash`.
Do NOT vendor the MSA (repurposed on-prem AI-eval deal doc) or the HIPAA BAA.
Update SKILL.md: draft from vendored template → resolve every `<mark>` field (grep for
unresolved `<mark>` before calling a draft done) → apply b-open adaptation checklist; note that
these templates take precedence over pm-toolkit's generic guidance (pm-toolkit is third-party,
from phuryn/pm-skills); keep first-draft-for-counsel framing; bump skill version +0.0.1.

**Phase 2 — derivatives, in priority order (separate efforts):**
1. Sigma Identity DPA (provider-side; processor posture already fits our OAuth IdP role)
2. 1Sat marketplace ToU + privacy policy (on-chain-data disclosures: wallet addresses,
   immutability vs. GDPR erasure, no-custody positioning, sanctions/AML, DMCA + stolen-inscription)
3. Hosted-API MSA (good bones only: liability cap, IP indemnity, arbitration; add SLA/API terms)
4. AI-product output disclaimers + acceptable use for agent/bot products

## Conventions for this directory

`handoffs/` holds work handed off between sessions/agents in this repo: one file per handoff,
named `YYYY-MM-DD-slug.md`, with Status/Tracker/Owners up top. Mark **Status: DONE** (don't
delete) when the tracker closes. Anthony's agent definition (`agents/legal.md` → Pending Work)
points here and at open GitHub issues at session start.
