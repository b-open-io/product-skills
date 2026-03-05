# Privacy Regulations Reference

Side-by-side analysis of GDPR, CCPA/CPRA, HIPAA, and COPPA with compliance checklists and policy drafting guidance.

**Research completed:** March 2026 | Not legal advice — verify with counsel before relying on for compliance.

---

## Side-by-Side Comparison

| Category | GDPR | CCPA/CPRA | HIPAA | COPPA |
|----------|------|-----------|-------|-------|
| **Geographic Scope** | Any org processing EU/EEA personal data regardless of location | For-profit businesses in California meeting thresholds | US health plans, providers, clearinghouses and their BAs | US operators of websites/apps directed to or with knowledge of children under 13 |
| **Applicability Trigger** | Processing personal data of EU/EEA residents | Revenue >$26.6M; OR 100K+ consumers/households; OR 50%+ revenue from selling/sharing data | Being a covered entity or business associate | Site/app directed to children under 13 OR actual knowledge of collecting PI from children |
| **Data Covered** | All personal data (any info relating to identified/identifiable person) | Personal information (broadly defined); Sensitive PI (SPI) category added by CPRA | PHI: individually identifiable health information + 18 HIPAA identifiers | Personal information from children under 13 |
| **Consent Standard** | Freely given, specific, informed, unambiguous; opt-in; withdrawable; separate from T&Cs | Opt-out for sale/share; opt-in for minors 13-15; opt-in for children under 13 | Not required for TPO; written authorization for other uses | Verifiable parental consent required before any collection from under-13 |
| **Right to Access** | Yes — Art. 15; free copy; 1 month to respond | Yes — right to know; 45 days to respond | Yes — 45 CFR § 164.524; 30 days to respond | Yes — parents may review child's PI |
| **Right to Delete** | Yes — Art. 17 (right to be forgotten); exceptions apply | Yes; must direct service providers/contractors to delete | No general right; amendment request only (§ 164.526) | Yes — parents may request deletion |
| **Right to Correct** | Yes — Art. 16 | Yes — CPRA added | Yes — amendment request under § 164.526 | No explicit right |
| **Right to Portability** | Yes — Art. 20; machine-readable; consent/contract bases only | No explicit right | No general right | No |
| **Data Minimization** | Yes — Art. 5(1)(c) | Yes — CPRA | Yes — Minimum Necessary standard | Yes — collect only PI necessary for disclosed purpose |
| **Breach Notification (Regulator)** | 72 hours from awareness — to supervisory authority | "Expedient" / "without unreasonable delay" under CA breach law | 60 days from discovery to HHS Secretary | No specific COPPA requirement |
| **Breach Notification (Individuals)** | Without undue delay when high risk | Expedient notice | 60 days from discovery | No specific requirement |
| **Privacy Officer** | DPO mandatory in specific circumstances | No statutory DPO; executive accountability under CPPA regs | Privacy Officer + Security Officer required | No statutory requirement |
| **Impact Assessment** | DPIA mandatory for high-risk processing | Risk assessment required (CPRA) | Risk analysis required under Security Rule | No formal requirement |
| **Cross-Border Transfers** | Requires adequacy decision, SCCs, BCRs, or Art. 46 mechanism | No restrictions | No geographic restrictions; BAs covered by BAA regardless of location | No geographic restrictions |
| **Private Right of Action** | Yes — individuals may bring claims | Data breaches only; $100-$750/consumer/incident | None; OCR/DOJ enforcement only | None; FTC and state AG enforcement |
| **Penalties (Max)** | €20M or 4% of global annual turnover | $7,500/intentional violation; $2,500/unintentional | $50,000/violation; $1.5M annual cap (Tier 4) | $51,744/violation/day (2024 adjusted) |
| **Enforcement** | National supervisory authorities; EDPB | CPPA (since 2023); CA Attorney General (concurrent) | HHS Office for Civil Rights; DOJ for criminal | FTC; State Attorneys General |

---

## GDPR

**Source:** https://gdpr-info.eu/ | Regulation (EU) 2016/679, effective May 25, 2018

### Who Must Comply
- Any organization established in the EU/EEA
- Organizations outside EU that offer goods/services to EU residents, or monitor their behavior (targeting/monitoring principle — Art. 3(2))

### Article 6 — Six Lawful Bases for Processing

| Basis | Key Conditions |
|-------|----------------|
| **(a) Consent** | Freely given, specific, informed, unambiguous; withdrawable; not bundled; separate from T&Cs |
| **(b) Contract** | Necessary to perform a contract with the data subject, or pre-contractual steps at their request |
| **(c) Legal Obligation** | Required by EU/Member State law binding on the controller |
| **(d) Vital Interests** | Necessary to protect life of data subject or another (emergency use only) |
| **(e) Public Task** | Exercise of official authority or public interest; must have legal basis |
| **(f) Legitimate Interests** | Necessary for controller's/third party's legitimate interests, not overridden by data subject rights; 3-step test: identify interest → necessity → balancing |

**Special category data (Art. 9):** Race, ethnicity, political opinions, religious beliefs, biometric/genetic data, health data, sex life/orientation — requires an ADDITIONAL Art. 9(2) condition.

### Data Subject Rights

All responses must be provided within **1 month** of request (extendable to 3 months for complex requests).

| Right | Article | Key Details |
|-------|---------|-------------|
| Right to Be Informed | 13-14 | At time of collection; disclose: controller identity, DPO, purposes, legal basis, retention, recipients, all rights |
| Right of Access | 15 | Free copy of data held; confirm processing; disclose purposes, categories, recipients, retention, source |
| Right to Rectification | 16 | Correct inaccurate data without undue delay; complete incomplete data |
| Right to Erasure | 17 | Delete when: no longer necessary, consent withdrawn, objection succeeds, unlawful processing, legal obligation; exceptions: expression, legal obligation, health public interest, legal claims |
| Right to Restriction | 18 | Pause processing (retain data) while accuracy/legality contested or objection pending |
| Right to Portability | 20 | Structured, machine-readable format (CSV, JSON); applies to consent/contract bases + automated processing only |
| Right to Object | 21 | To legitimate interests/public task processing (must stop unless compelling grounds); to direct marketing (absolute) |
| Automated Decision-Making | 22 | No solely automated decisions with legal/similarly significant effects; exceptions: contract, legal, explicit consent; must allow human review |

### Key Obligations

**Privacy by Design (Art. 25):** Implement data protection from the outset; by default, only process minimum necessary.

**DPO Required (Art. 37) when:** Public authority, OR core activities involve regular/systematic monitoring at large scale, OR core activities involve large-scale special category data processing. DPO must be independent; cannot receive instructions.

**DPIA Required (Art. 35) when:** Systematic/extensive profiling with significant effects, large-scale special category processing, systematic public area monitoring, new technologies.

**ROPA (Art. 30):** Mandatory for 250+ employee organizations; also required when processing is not occasional or involves special category data.

### Breach Notification
- **72 hours** from awareness → supervisory authority (Art. 33); not required if unlikely to result in risk
- **Without undue delay** → individuals when high risk (Art. 34); exceptions if data unintelligible or disproportionate effort

### Cross-Border Transfer Mechanisms

| Mechanism | Description |
|-----------|-------------|
| Adequacy Decision | European Commission determination of equivalent protection (US: EU-US Data Privacy Framework 2023; UK, Switzerland, Japan, Canada, South Korea, etc.) |
| Standard Contractual Clauses (SCCs) | EU 2021 pre-approved templates; conduct Transfer Impact Assessment (TIA) |
| Binding Corporate Rules (BCRs) | Intra-group transfers; requires supervisory authority approval |
| Derogations (Art. 49) | Explicit consent, contract performance, public interest, legal claims, vital interests; occasional transfers only |

### Penalties
- **Tier 1 (Art. 83(4)):** Up to €10M or 2% of global annual turnover — basic obligations, DPO, certifications
- **Tier 2 (Art. 83(5)):** Up to €20M or 4% of global annual turnover — lawful bases, data subject rights, cross-border transfers

---

## CCPA / CPRA

**Sources:** https://oag.ca.gov/privacy/ccpa | https://cppa.ca.gov/
**Timeline:** CCPA effective Jan 1, 2020; CPRA amendments effective Jan 1, 2023

### Who Must Comply

For-profit businesses doing business in California meeting **any one** of:
- Annual gross revenues > **$26,625,000** (2024 inflation-adjusted threshold)
- Buy, sell, or share PI of **100,000+ California consumers or households** per year
- Derive **50%+** of annual revenue from selling or sharing consumers' PI

### Consumer Rights

| Right | Notes |
|-------|-------|
| Right to Know | What PI collected, used, shared, or sold; specific pieces on request |
| Right to Delete | Delete PI; business must direct service providers/contractors to delete |
| Right to Opt-Out of Sale/Share | "Do Not Sell or Share My Personal Information" link required; honor within 15 business days |
| Right to Non-Discrimination | Cannot deny service, charge different prices, or provide different quality for exercising rights |
| **Right to Correct** (CPRA) | Correct inaccurate personal information |
| **Right to Limit SPI Use** (CPRA) | Limit use of sensitive personal information to necessary-for-service only |
| Right re: Automated Decision-Making | Opt out of profiling with significant effects (per CPPA regulations) |

### Sensitive Personal Information (CPRA)

SPI category subject to stricter rules:
- SSN, driver's license, state ID, passport number
- Account login credentials (username + password or financial account + security code)
- Precise geolocation (within 1,850 feet / 1/3 mile)
- Racial/ethnic origin, religious/philosophical beliefs
- Union membership
- Mail, email, or text message contents (unless business is intended recipient)
- Genetic data, biometric ID data, health/sex life/sexual orientation data

### Entity Distinctions

| Entity | Definition | Key Requirement |
|--------|------------|-----------------|
| **Business** | Meets thresholds; determines PI purposes/means | Subject to all obligations |
| **Service Provider** | Processes PI for business purpose under written contract | Cannot use PI for own commercial purposes; contract required |
| **Contractor** (CPRA) | Business makes PI available (not just discloses) to entity | Written contract with same restrictions as service provider; must certify understanding |
| **Third Party** | Receives PI for own purposes | Constitutes a "sale" or "share"; business must honor opt-outs |

**"Sale":** Disclosure for monetary OR other valuable consideration
**"Share":** Disclosure for cross-context behavioral advertising, regardless of money exchanged

### CPRA Additions
- Data minimization: collect only reasonably necessary PI
- Purpose limitation: no materially different secondary uses without notice
- Written retention schedule tied to specific purposes
- Risk assessments for high-risk processing
- CPPA may require cybersecurity audits

### Enforcement and Penalties
- CPPA (since 2023) — primary enforcement; CA AG (concurrent)
- Unintentional violations: up to **$2,500/violation**
- Intentional violations: up to **$7,500/violation**
- Children under 16: up to **$7,500/violation** even if unintentional
- Data breach private right of action: **$100–$750/consumer/incident** or actual damages

---

## HIPAA

**Source:** https://www.hhs.gov/hipaa/for-professionals/index.html
**Enacted:** 1996; Privacy Rule effective April 14, 2003; Security Rule effective April 21, 2005

### Who Must Comply

**Covered Entities (3 types):**
1. Health Plans (insurance companies, HMOs, Medicare, Medicaid, employer-sponsored plans 50+ participants)
2. Health Care Clearinghouses (process nonstandard health information into standard formats)
3. Health Care Providers (who transmit health information electronically)

**Business Associates:** Entities performing functions involving PHI on behalf of covered entities — billing companies, EHR vendors, law firms with PHI access, cloud storage providers of PHI, consultants, transcription services.

**Subcontractors of BAs** are also BAs and must comply directly.

### PHI — 18 HIPAA Identifiers

Health information is PHI when combined with any of these:
1. Names
2. Geographic data smaller than state (street, city, county, zip)
3. Dates directly related to individual (except year) — birth, admission, discharge, death; ages over 89
4. Phone numbers | 5. Fax numbers | 6. Email addresses
7. Social Security numbers | 8. Medical record numbers
9. Health plan beneficiary numbers | 10. Account numbers
11. Certificate/license numbers | 12. Vehicle identifiers and serial numbers
13. Device identifiers and serial numbers | 14. Web URLs
15. IP addresses | 16. Biometric identifiers (finger and voice prints)
17. Full-face photographs | 18. Any other unique identifying number/characteristic/code

**De-identification:** Expert determination (statistical method showing very small re-identification risk) OR safe harbor (remove all 18 identifiers + no actual knowledge remaining info could identify individual).

### Minimum Necessary Standard (45 CFR § 164.502(b))

Limit PHI use, disclosure, and requests to the minimum necessary to accomplish the intended purpose. Exceptions: treatment, disclosures to the individual, valid authorization, HHS enforcement.

### Security Rule — Three Safeguard Categories

**Administrative Safeguards (§ 164.308):**
- Security management (risk analysis, risk management, sanction policy, activity review)
- Security officer designation
- Workforce security and access management
- Security training (passwords, malicious software, login monitoring)
- Contingency plan (backup, disaster recovery)
- Business associate contracts

**Physical Safeguards (§ 164.310):**
- Facility access controls
- Workstation use policies and security
- Device and media controls (disposal, re-use, data backup before movement)

**Technical Safeguards (§ 164.312):**
- Access control (unique user IDs, emergency access, automatic logoff, encryption)
- Audit controls (record and examine ePHI access)
- Integrity controls (verify ePHI not altered/destroyed)
- Transmission security (guard against unauthorized access)

**Required vs. Addressable:** Many specifications are "addressable" — implement if reasonable and appropriate, or document equivalent alternative. Access control and audit controls are **required**.

### Business Associate Agreements (BAA) (45 CFR § 164.504(e))

Cannot disclose PHI to a BA without a BAA. BAA must:
- Describe permitted uses/disclosures; prohibit uses outside the contract
- Require appropriate safeguards
- Require breach reporting (including breaches)
- Require sub-BAAs with subcontractors
- Allow termination if BA violates material term
- Require return or destruction of PHI on termination
- Allow HHS compliance determination access

### Breach Notification (45 CFR Part 164, Subpart D)

**Presumption of breach** unless low probability PHI was compromised (4-factor risk assessment: nature/extent of PHI, who accessed it, whether actually acquired/viewed, extent risk mitigated).

**Timelines:**
- BA to Covered Entity: within **60 days** of discovery, without unreasonable delay
- Covered Entity to Individuals: within **60 days** of discovery; written first-class mail
- CE to HHS: 500+ individuals → within 60 days of calendar year end; < 500 → annually
- CE to Prominent Media: 500+ in a state → within 60 days of discovery

### Penalty Tiers

| Tier | Culpability | Per Violation | Annual Cap |
|------|-------------|--------------|------------|
| 1 | Did not know | $100 - $50,000 | $25,000 |
| 2 | Reasonable cause | $1,000 - $50,000 | $100,000 |
| 3 | Willful neglect — corrected within 30 days | $10,000 - $50,000 | $250,000 |
| 4 | Willful neglect — not corrected | $50,000 | $1,500,000 |

Criminal: up to 1-10 years and $50,000-$250,000 depending on intent.

---

## COPPA

**Source:** https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa
**Enacted:** 1998; Rule updated 2013; Rule amended January 2025 (1-year compliance period)

### Who Must Comply

Operators of websites or online services:
- **Directed to children under 13** (regardless of actual knowledge): Assessed by FTC using "totality of circumstances" — subject matter, visual content, music, animated characters, language, advertising on site
- **General audience with actual knowledge** of collecting PI from children under 13

### Personal Information Under COPPA

Includes (2025 amendments expanded definition):
- Name, physical address, online contact info (email, IM), screen name used to contact
- Phone number, Social Security number
- Persistent identifiers (cookies, IP addresses, device IDs)
- Photo, video, or audio containing child's image or voice
- Geolocation sufficient to identify street and city
- **NEW (2025):** Biometric identifiers (fingerprints, retina, iris, genetic data, voiceprints, facial templates)
- **NEW (2025):** Government-issued identifiers (state ID, birth certificate, passport numbers)

### Verifiable Parental Consent Required Before Any Collection

**Methods (including 2025 approved additions):**
- Credit/debit card transaction with notice to cardholder
- Toll-free call staffed by trained personnel
- Video conference
- Knowledge-based authentication (dynamic multiple-choice questions — hard for child to answer)
- Government-issued photo ID submission
- Text message with additional confirmation step
- Print-and-send form (mail, fax, scan)

### 2025 COPPA Amendments — Key Changes

1. **Separate consent for third-party disclosures:** Must obtain separate verifiable parental consent before disclosing children's PI to third parties for advertising
2. **Written data security program:** Required; safeguards tailored to children's data sensitivity
3. **Expanded PI definition:** Biometric identifiers and government-issued identifiers now included
4. **Data minimization:** Cannot condition participation on sharing more PI than necessary
5. **Push notifications:** Cannot send to children without verifiable parental consent
6. **Retention policy:** Must establish written children's data retention policy with specific periods tied to specific purposes

### Enforcement and Penalties

- **FTC** — primary enforcement; state AGs have concurrent authority
- Up to **$51,744 per violation per day** (2024 inflation-adjusted)
- Notable: YouTube/Google $170M (2019); TikTok $5.7M (2019); Epic Games/Fortnite $275M (2022)

---

## Privacy Policy Drafting Checklist

### Pre-Drafting Assessment
- [ ] Identify which frameworks apply (EU users → GDPR; California → CCPA/CPRA; health data → HIPAA; children → COPPA)
- [ ] Map all data collected: type, source, purpose, legal basis, retention period, recipients
- [ ] Identify your role: controller/processor (GDPR), business/service provider/contractor (CCPA), covered entity/BA (HIPAA), operator (COPPA)
- [ ] Determine applicable consent standards for each processing activity
- [ ] Determine if DPO/Privacy Officer is required

### Required Sections for a Multi-Framework Policy

**1. Identity and Contact:**
- [ ] Legal name, physical address, email, phone (all required for COPPA; recommended for all)
- [ ] DPO contact if applicable (GDPR Art. 13(1)(b))
- [ ] EU/UK representative contact if outside EU/UK (GDPR Art. 27)
- [ ] California consumer request contact (CCPA)

**2. What Data Is Collected:**
- [ ] All categories of PI with descriptions (GDPR Art. 13; CCPA § 1798.100)
- [ ] Special category data / SPI / PHI if applicable
- [ ] Whether data collected from children under 13 (COPPA)

**3. Purposes and Legal Bases:**
- [ ] Specific purpose for each data category
- [ ] GDPR: Article 6 lawful basis + Art. 9(2) if special category
- [ ] CCPA: Business purposes; disclose any sale or sharing
- [ ] COPPA: Specific purposes for children's PI

**4. Data Retention:**
- [ ] Retention periods for each category (GDPR Art. 13(2)(a))
- [ ] CPRA: Written schedule tied to specific purposes
- [ ] COPPA 2025: Written policy with specific periods
- [ ] HIPAA: Per applicable state law (typically 6-10 years)

**5. Data Sharing:**
- [ ] All recipient categories (GDPR Art. 13(1)(e))
- [ ] CCPA: Whether PI is "sold" or "shared"; categories of third parties
- [ ] HIPAA: PHI shared for TPO; list other permitted disclosures
- [ ] COPPA: Disclose third-party disclosures; separate consent required for advertising (2025)

**6. Cross-Border Transfers (GDPR):**
- [ ] Countries to which data is transferred
- [ ] Transfer mechanism (adequacy, SCCs, BCRs, derogation)

**7. Consumer/Data Subject Rights:**
- [ ] Right to Know/Access (all frameworks)
- [ ] Right to Delete (GDPR, CCPA, COPPA)
- [ ] Right to Correct (GDPR, CCPA/CPRA, HIPAA)
- [ ] Right to Portability (GDPR)
- [ ] Right to Opt-Out of Sale/Share (CCPA) — "Do Not Sell or Share" link required
- [ ] Right to Limit SPI Use (CPRA)
- [ ] Right to Object (GDPR)
- [ ] Automated Decision-Making rights (GDPR Art. 22; CPRA)
- [ ] Parental rights (COPPA): review, correct, delete, revoke consent
- [ ] Non-discrimination statement (CCPA)
- [ ] Contact method and response timeframe for each right

**8. Cookies and Tracking:**
- [ ] Disclose cookies, web beacons, tracking pixels, fingerprinting
- [ ] GDPR: Opt-in consent mechanism for non-necessary cookies; cookie consent banner
- [ ] CCPA: "Do Not Sell or Share" if cookies involve cross-context behavioral advertising; honor Global Privacy Control signals
- [ ] Categorize: strictly necessary, functional, analytics, advertising

**9. Children's Privacy (COPPA):**
- [ ] Confirm whether service directed to children under 13
- [ ] State parental consent mechanism
- [ ] Describe parent's rights (review, correct, delete, revoke consent)
- [ ] Age verification mechanism for mixed-audience sites

**10. Security:**
- [ ] Administrative, physical, and technical safeguards overview (HIPAA structure)
- [ ] Note encryption (transit and at rest)
- [ ] COPPA 2025: Written children's data security program required

**11. Policy Updates:**
- [ ] Effective date
- [ ] How/when users notified of material changes
- [ ] CCPA: Update at least every 12 months

**12. GDPR-Specific: Supervisory Authority Complaints**
- [ ] Right to lodge complaint with national supervisory authority (Art. 13(2)(d))

### Implementation Checklist
- [ ] Privacy policy accessible from homepage (one click)
- [ ] Linked at every point of data collection
- [ ] "Do Not Sell or Share" opt-out link on homepage (CCPA)
- [ ] Cookie Consent Management Platform (CMP) for GDPR
- [ ] Request tracking system for data subject/consumer rights requests
- [ ] Identity verification for rights requests (without requiring excessive PI)
- [ ] Contracts with all processors/service providers/contractors/BAs
- [ ] Risk analysis (HIPAA) / DPIA (GDPR) / risk assessment (CPRA) conducted and documented
- [ ] Staff training on applicable policies
- [ ] Breach detection, reporting, and notification procedures tested
- [ ] DPO appointed if required (GDPR); Privacy Officer + Security Officer (HIPAA)
- [ ] Annual policy review
