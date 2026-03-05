# Contract Review Checklist

Clause-by-clause review checklist for commercial contracts. Use EDGAR EFTS (https://efts.sec.gov/) to find real-world examples of any clause type.

---

## Pre-Review Setup

1. Identify the contract type (SaaS, employment, vendor, investment, IP assignment, NDA, SAFE, token purchase agreement)
2. Identify governing law jurisdiction — applies different defaults for implied terms
3. Identify the parties and their relative bargaining positions
4. Note any regulatory context (crypto tokens → securities law; health data → HIPAA; EU parties → GDPR)

---

## Section 1: Representations and Warranties

**What to look for:**
- Scope: Are reps limited to the date of signing or ongoing?
- Knowledge qualifiers: "to the best of our knowledge" narrows liability; "actual knowledge" narrows further than "constructive knowledge"
- Materiality scrapes: clauses that strip materiality qualifiers from reps for indemnification purposes
- Bring-down provisions: Are reps required to be true at closing as well as signing?

**Red flags:**
- Unlimited, unqualified reps with no knowledge qualifier
- Missing reps on: compliance with laws, no pending litigation, no material adverse change, intellectual property ownership
- Reps that omit crypto/digital asset-specific compliance (token classification, MSB registration, AML program)

**EDGAR search:** `q="representations and warranties" "knowledge of the seller"&forms=10-K`

---

## Section 2: Indemnification

**What to look for:**
- Scope of indemnified claims: third-party only vs. direct losses vs. both
- Indemnification basket: minimum threshold before indemnification kicks in (deductible vs. first-dollar coverage)
- Indemnification cap: maximum indemnification liability (typically 1x or 2x contract value for SaaS)
- Survival period: how long after termination do indemnification obligations survive?
- Indemnification procedure: notice requirements, control of defense, cooperation obligations
- Mutual vs. one-sided: is indemnification mutual or only running one direction?

**Red flags:**
- No cap on indemnification (unlimited exposure)
- Cap excludes fraud, willful misconduct, or IP infringement — these carve-outs are standard; their absence is suspicious
- No survival period specified (may survive forever under state law defaults)
- Missing notice provisions (party can lose right to be indemnified by missing notice deadlines)

**EDGAR search:** `q="indemnification" "shall indemnify" "hold harmless"&forms=10-K&startdt=2023-01-01`

---

## Section 3: Limitation of Liability

**What to look for:**
- Consequential damages waiver: does it exclude lost profits, lost data, business interruption?
- Cap amount: what is the maximum direct liability? (Typically 12 months of fees paid for SaaS)
- Carve-outs to the cap: what is excluded from the limitation? (Typically: fraud, willful misconduct, death/personal injury, data breaches, IP infringement, indemnification obligations)
- Mutual applicability: does the limitation apply to both parties equally?

**Red flags:**
- No limitation of liability at all (unlimited exposure)
- Cap is lower than realistic damage scenarios
- Consequential damages carve-out on your side but not the counterparty's side
- Data breach not carved out of consequential damages waiver (you can't waive your liability for a breach of your own system)

**EDGAR search:** `q="limitation of liability" "in no event" "aggregate liability"&forms=10-K`

---

## Section 4: Intellectual Property Ownership and Assignment

**What to look for:**
- Work made for hire: does the agreement include "work made for hire" language? (Contractor work is not automatically work for hire)
- IP assignment: is there an explicit assignment of all IP created under the agreement?
- Background IP: what each party brings in is typically retained; ensure background IP is defined and excluded from assignment
- License grants: when a party retains IP, what license does the other party get? (Non-exclusive, worldwide, royalty-free, irrevocable is standard for service deliverables)
- Moral rights waivers: required for software in some jurisdictions
- Open source obligations: does the deliverable incorporate open source that creates license obligations?

**Red flags:**
- No IP assignment clause in a development contract (counterparty owns everything they build)
- Overly broad assignment capturing background IP
- No license grant when assignment is not possible (e.g., pre-existing tools)
- Open source copyleft (GPL) code in a proprietary deliverable — creates license contamination risk

**EDGAR search:** `q="intellectual property" "work made for hire" "hereby assigns"&forms=10-K`

---

## Section 5: Governing Law and Dispute Resolution

**What to look for:**
- Choice of law: which state/country's law governs?
- Choice of forum: which court or arbitration body has jurisdiction?
- Arbitration clause: is it binding? What are the rules (AAA, JAMS, ICC)? Is there a class action waiver?
- Jury trial waiver: is there an explicit waiver?
- Prevailing party attorney's fees: does the loser pay?
- Venue: where must litigation or arbitration be conducted? (Remote participation provisions post-COVID)

**Red flags:**
- Governing law in a jurisdiction with unfavorable default rules for your situation
- Mandatory arbitration in a distant venue (e.g., you're in California, counterparty requires NYC arbitration)
- Class action waiver without corresponding individual arbitration protections
- No venue clause (allows counterparty to file anywhere)
- Missing class action waiver in consumer-facing contracts (risk of class action)

**EDGAR search:** `q="governing law" "arbitration" "class action" "waiver"&forms=10-K`

---

## Section 6: Termination Provisions

**What to look for:**
- Termination for cause: what constitutes material breach? What is the cure period? (30 days is standard)
- Termination for convenience: can either party terminate without cause? With what notice? (30-90 days is standard for SaaS)
- Effect of termination: what happens to data, access, licenses, and payment obligations after termination?
- Survival provisions: which obligations survive termination? (Typically: confidentiality, IP ownership, indemnification, limitation of liability, governing law)
- Auto-renewal: does the contract auto-renew? What notice is required to prevent renewal?

**Red flags:**
- No termination for cause provision (stuck in an unworkable relationship)
- Cure period is too short (less than 15 days may be unreasonable)
- No data return or destruction obligation on termination (vendor retains your data)
- Auto-renewal with insufficient notice period for cancellation
- No transition assistance obligations (critical for large technology contracts)

**EDGAR search:** `q="termination for convenience" "cure period" "transition assistance"&forms=10-K`

---

## Section 7: Confidentiality / NDA Provisions

**What to look for:**
- Definition of Confidential Information: is it broadly or narrowly defined?
- Exclusions: standard exclusions include: publicly known, independently developed, rightfully received from third party, legally required disclosure
- Obligations: standard of care (at least reasonable care; often "at least as protective as own confidential information")
- Duration: how long does the obligation last? (2-5 years for commercial info; perpetual for trade secrets)
- Return/destruction: obligation to return or destroy on termination
- Residuals clause: do employees retain the right to use general knowledge (not specific documents) post-engagement?

**Red flags:**
- Missing standard exclusions (no independent development exclusion locks you out of building similar products)
- No disclosure limitation to need-to-know personnel
- Perpetual obligations for non-trade-secret information (burdensome)
- Missing residuals clause for technical staff (creates unworkable restrictions on future work)

**EDGAR search:** `q="confidential information" "residuals" "permitted disclosure"&forms=10-K`

---

## Section 8: Data Privacy and Security (Critical for SaaS/Digital Products)

**What to look for:**
- Data processing agreement (DPA) or addendum: required for GDPR if processing EU personal data
- California Consumer Privacy Act (CCPA) service provider terms: required if processing California personal data
- HIPAA Business Associate Agreement (BAA): required if processing protected health information
- Data security obligations: what security standards apply? (SOC 2, ISO 27001, NIST)
- Data breach notification: what are the notice obligations and timelines?
- Data retention and deletion: who owns the data? What are the deletion obligations?
- Subprocessor obligations: can the vendor use subprocessors? What controls exist?

**Red flags:**
- No DPA when processing EU personal data (GDPR violation)
- No BAA when processing PHI (HIPAA violation)
- No data security minimum standards (no obligation to actually protect your data)
- No breach notification requirement (you won't know if your data is compromised)
- Vendor claims ownership of your data
- No right to audit security controls

---

## Section 9: Crypto/Digital Asset Contract Provisions

### Token Purchase Agreements (TPAs)

**What to look for:**
- Howey test language: does the agreement characterize the token as a utility (not investment)?
- Securities law representations: does the purchaser rep that they are accredited (Reg D) or non-US (Reg S)?
- Transfer restrictions: lock-up periods, resale restrictions, prohibition on US resale during Reg S distribution compliance period
- Vesting schedules: when do tokens unlock? What are the cliff and linear vesting terms?
- SAFT structure: is this a Simple Agreement for Future Tokens? When does delivery occur?
- Network launch conditions: what network conditions must be met before token delivery?

**Red flags:**
- No transfer restrictions on restricted securities (Reg D violation)
- No investor representations (no accreditation verification)
- Promise of returns or appreciation in the TPA (creates securities liability)
- No governing law clause (crypto agreements cross jurisdictions constantly)
- Missing OFAC/sanctions representations

### SAFE Notes with Token Warrants

**What to look for:**
- Token warrant terms: percentage of token pool, calculation method, exercise price (if any)
- MFN provisions: most-favored nation clause giving SAFE holders at least as favorable terms as future investors
- Valuation cap and discount rate: standard SAFE terms
- Token warrant separation: is the token warrant separable from the SAFE?
- Pro-rata rights: does the SAFE investor get pro-rata rights in future equity rounds?
- Regulatory sunset: does the token warrant expire if a regulatory event makes token issuance impractical?

### DAO Agreements

**What to look for:**
- Legal wrapper: is the DAO structured as a Wyoming DUNA, Cayman Foundation, or other entity with member liability protection?
- Governance token holder liability: does the agreement clarify token holder obligations and limit liability?
- Operational vs. governance separation: are commercial operations separated from protocol governance?
- Treasury management: who has signing authority over treasury assets?
- Ooki DAO risk mitigation: does the agreement address the CFTC's position that governance token holders are association members?

---

## EDGAR Contract Research Workflow

Use EDGAR Full-Text Search to find real-world examples of any clause:

**Base URL:** https://efts.sec.gov/LATEST/search-index

**Useful searches:**
```
# Find indemnification clauses in recent tech company annual reports
q="indemnification" "consequential damages"&forms=10-K&startdt=2024-01-01

# Find SAFE note language in small company filings
q="simple agreement for future equity" "valuation cap"&forms=10-K

# Find token warrant language
q="token warrant" "digital asset" "purchase right"&forms=8-K

# Find stablecoin-related agreements
q="stablecoin" "reserve" "redemption"&forms=8-K

# Find DAO-related agreements
q="decentralized autonomous organization" "governance"&forms=10-K
```

**Browsing material contracts:** For any public company, go to their EDGAR filings → 10-K → Exhibit 10.x entries to find material contracts filed as exhibits.
