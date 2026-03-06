---
name: legal-compliance
description: "This skill should be used when the user asks to draft a privacy policy, terms of service, cookie policy, or data processing agreement; when they ask about GDPR, CCPA, HIPAA, or other privacy regulations; when they need a compliance audit, legal gap analysis, or regulatory guidance; when they ask about employment law, IP rights, open source licensing, or contract review; when they mention 'legal', 'compliance', 'regulation', 'liability', 'terms', 'privacy', or 'lawsuit'. This skill also applies to crypto and digital asset questions: token classification (Howey test), security token offerings, stablecoins, GENIUS Act, DeFi compliance, CFTC jurisdiction, DAO liability, IRS crypto tax, AML/FinCEN MSB registration, tokenization of real-world assets, UCC Article 8, and smart contract legal review. Also use for designing or building agentic legal workflows, multi-agent compliance pipelines, and legal AI system architecture using Vercel AI SDK or CrewAI."
version: 0.2.1
disable-model-invocation: true
---

# Legal Compliance Skill

Comprehensive legal research, compliance analysis, and document drafting for US federal law and key regulatory frameworks. This skill equips the Anthony legal agent with source references, research methodology, and drafting standards.

## Legal Research Workflow

Follow this sequence for any legal question:

1. **Identify the domain** — criminal, civil, IP, employment, tax, regulatory, contract, privacy
2. **Find the governing statute** — use the USC source directory in `references/us-federal-statutes.md`
3. **Find implementing regulations** — use eCFR (https://www.ecfr.gov) organized by CFR title
4. **Check agency guidance** — EEOC, IRS, FDA, USPTO, FTC publish interpretive materials
5. **Find relevant precedent** — use CourtListener (https://www.courtlistener.com) or Google Scholar
6. **Apply IRAC analysis** — Issue → Rule → Application → Conclusion (see `references/legal-methodology.md`)
7. **Draft or advise** — cite sources using Bluebook format (see `references/legal-methodology.md`)

## Source Directory by Practice Area

### Privacy & Data Protection
- **GDPR**: European Union regulation — full text at https://gdpr-info.eu/
- **CCPA/CPRA**: California Consumer Privacy Act — https://oag.ca.gov/privacy/ccpa
- **HIPAA**: 45 CFR Parts 160, 162, 164 — https://www.hhs.gov/hipaa/for-professionals/index.html
- **COPPA**: 16 CFR Part 312 — https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa
- **FERPA**: 20 U.S.C. § 1232g — https://studentprivacy.ed.gov/ferpa
- **ECPA**: Wiretap and stored communications — https://www.justice.gov/archives/jm/criminal-resource-manual-1050-electronic-communications-privacy-act-1986-ecpa

### Employment Law
- **Title VII** (race, sex, religion discrimination): https://www.eeoc.gov/statutes/title-vii-civil-rights-act-1964
- **FLSA** (wages, overtime, child labor): https://www.dol.gov/agencies/whd/flsa
- **ADA** (disability): https://www.ada.gov/law-and-regs/ada/
- **FMLA** (family/medical leave): https://www.dol.gov/agencies/whd/fmla
- **EEOC Guidance**: https://www.eeoc.gov/guidance

### Intellectual Property
- **Patents** (35 U.S.C.): https://www.law.cornell.edu/uscode/text/35 | USPTO: https://www.uspto.gov/patents/laws
- **Copyrights** (17 U.S.C. + DMCA): https://www.copyright.gov/title17/
- **Trademarks** (Lanham Act, 15 U.S.C. ch. 22): https://www.law.cornell.edu/uscode/text/15/chapter-22
- **Trade Secrets**: Defend Trade Secrets Act (18 U.S.C. §§ 1836–1839)
- **Open Source Licensing**: OSI-approved licenses at https://opensource.org/licenses

### Corporate & Commercial
- **UCC** (sales, secured transactions): https://www.law.cornell.edu/ucc
- **SOX** (corporate governance): https://www.sec.gov/about/laws/soa2002.pdf
- **EDGAR** (contract clause examples): https://efts.sec.gov/LATEST/search-index?q=%22indemnification%22&forms=10-K
- **Securities**: 15 U.S.C. — https://www.law.cornell.edu/uscode/text/15

### Tax
- **IRC** (26 U.S.C.): https://www.law.cornell.edu/uscode/text/26
- **IRS Publications**: https://www.irs.gov/publications
- **IRS Revenue Rulings**: https://www.irs.gov/irb

### Criminal & Regulatory
- **Federal Crimes** (18 U.S.C.): https://www.law.cornell.edu/uscode/text/18
- **Controlled Substances**: https://www.dea.gov/drug-information/csa
- **Food & Drugs** (21 U.S.C.): https://www.law.cornell.edu/uscode/text/21 | FDA: https://www.fda.gov/regulatory-information
- **Sentencing Guidelines**: https://www.ussc.gov/guidelines

### Immigration
- **INA** (8 U.S.C.): https://www.law.cornell.edu/uscode/text/8 | USCIS: https://www.uscis.gov/laws-and-policy

### Bankruptcy
- **Bankruptcy Code** (11 U.S.C.): https://www.law.cornell.edu/uscode/text/11 | Forms: https://www.uscourts.gov/forms/bankruptcy-forms

### Crypto & Digital Assets
- **Securities Act applied to tokens**: https://www.law.cornell.edu/uscode/text/15/chapter-2A | Howey test: https://www.law.cornell.edu/wex/howey_test
- **Securities Exchange Act applied to crypto exchanges/ATSs**: https://www.law.cornell.edu/uscode/text/15/chapter-2B
- **Commodity Exchange Act (CFTC jurisdiction over Bitcoin, Ether)**: https://www.law.cornell.edu/uscode/text/7/1
- **GENIUS Act (stablecoin law, signed July 2025)**: https://www.congress.gov/bill/119th-congress/senate-bill/1582
- **CLARITY Act (FIT21 successor, pending Senate)**: https://www.congress.gov/bill/119th-congress/house-bill/3633
- **Bank Secrecy Act (FinCEN/AML for crypto)**: https://www.law.cornell.edu/uscode/text/31/subtitle-IV/chapter-53
- **IRC Section 6045 (IRS broker reporting for digital assets)**: https://www.law.cornell.edu/uscode/text/26/6045
- **SEC FinHub Framework (Howey test for digital assets)**: https://www.sec.gov/corpfin/framework-investment-contract-analysis-digital-assets
- **SEC Crypto Assets Enforcement Page**: https://www.sec.gov/cryptoassets
- **CFTC Digital Assets Guidance**: https://www.cftc.gov/digitalassets
- **IRS Digital Assets**: https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets
- **UCC Article 8 (tokenized investment securities)**: https://www.law.cornell.edu/ucc/8
- **FinCEN MSB Registration**: https://www.fincen.gov/resources/money-services-business-msb-registration
- **Key cases**: SEC v. Ripple (https://www.courtlistener.com/docket/6310745/sec-v-ripple-labs-inc/), SEC v. Coinbase, CFTC v. Ooki DAO

## Core Regulatory Sources

| Need | Source | URL |
|------|--------|-----|
| All agency regulations | eCFR | https://www.ecfr.gov/ |
| New/proposed rules | Federal Register | https://www.federalregister.gov/ |
| Rulemaking dockets | Regulations.gov | https://www.regulations.gov/ |
| Public laws & bills | GovInfo | https://www.govinfo.gov/ |
| Legislative history | Congress.gov API | https://www.congress.gov/ |

## Case Law Sources

| Source | Best For | Access |
|--------|----------|--------|
| CourtListener | Federal + state opinions, PACER docs, API | Free — https://www.courtlistener.com/ |
| Caselaw Access Project | Bulk all-jurisdiction case law, API | Free — https://case.law/ |
| Supreme Court | SCOTUS slip opinions | Free — https://www.supremecourt.gov/opinions/opinions.aspx |
| Google Scholar | Quick case search + citation graph | Free — https://scholar.google.com/scholar?as_sdt=4,33 |
| CRS Reports | Nonpartisan statutory analysis | Free — https://crsreports.congress.gov/ |

## Court Rules & Procedure

- **FRCP** (civil): https://www.uscourts.gov/rules-policies/current-rules-practice-procedure/federal-rules-civil-procedure
- **FRCrP** (criminal): https://www.uscourts.gov/rules-policies/current-rules-practice-procedure/federal-rules-criminal-procedure
- **FRE** (evidence): https://www.uscourts.gov/rules-policies/current-rules-practice-procedure/federal-rules-evidence
- **FRAP** (appellate): https://www.uscourts.gov/rules-policies/current-rules-practice-procedure/federal-rules-appellate-procedure
- **Forms library**: https://www.uscourts.gov/forms

### Crypto & Digital Asset Document Drafting

For token issuance, stablecoins, or DeFi compliance questions:
1. Load `references/crypto-securities-law.md` — Howey test analysis, SEC enforcement cases, exemptions for STOs, SEC 2025 guidance
2. Load `references/crypto-stablecoins-aml.md` — GENIUS Act compliance, FinCEN/BSA registration, stablecoin reserves, recent legislation
3. Load `references/crypto-tokenization-cftc-tax.md` — RWA tokenization, UCC Article 8, CFTC jurisdiction, IRS crypto tax, DAO liability

**Crypto research workflow:**
1. Run Howey test analysis before any token issuance or public communication
2. Classify asset: payment stablecoin, digital commodity (CFTC), security token (SEC), or utility token
3. Identify applicable exemptions (Reg D 506(c), Reg S, Reg A+) if a security
4. Check GENIUS Act compliance requirements for stablecoins
5. Determine FinCEN MSB registration requirements (FinCEN Form 107 within 180 days of commencing operations)
6. Analyze DAO structure for liability risk; recommend legal entity wrapper

## Document Drafting Standards

### Privacy Policies
1. Identify all data collected (PII, device, behavioral)
2. State lawful basis for each processing activity
3. Cover all applicable jurisdictions (GDPR, CCPA, COPPA if applicable)
4. Include: data retention, user rights, third-party sharing, contact info
5. Use EDGAR for comparable public company disclosures

### Terms of Service
1. Define scope of service and acceptable use
2. Limitation of liability and disclaimer of warranties
3. Dispute resolution (arbitration clause, choice of law)
4. IP ownership and license grants
5. Termination provisions

### Contract Review Checklist
Load `references/contract-review.md` for full checklist covering: representations & warranties, indemnification, limitation of liability, IP assignment, governing law, dispute resolution, and exit provisions.

## Ethics & Professional Responsibility

**Not a licensed attorney.** Always clarify this when providing legal analysis. Key ABA Model Rules:
- Rule 1.1 (Competence): Provide thorough, accurate legal research
- Rule 1.6 (Confidentiality): Never disclose client information
- Rule 5.5 (Unauthorized Practice): Identify as AI, not licensed counsel
- Full text: https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/

## State Law Research

For state-specific questions:
1. Start at NCSL directory: https://www.ncsl.org/research/about-state-legislatures/state-legislature-websites.aspx
2. Navigate to the state's legislature site for statutes
3. Check Uniform Law Commission for model acts adopted by the state: https://www.uniformlaws.org/
4. Use CourtListener to filter case law by state court

## Reference Files

Detailed research guides are in `references/`:
- **`references/us-federal-statutes.md`** — Annotated guide to all USC titles with key sections, common questions, and search tips
- **`references/legal-methodology.md`** — IRAC framework, statutory interpretation canons, Bluebook citation, e-discovery standards
- **`references/employment-law.md`** — Deep dive: Title VII, FLSA, ADA, FMLA, OSHA, NLRA with key cases and compliance checklists
- **`references/ip-law.md`** — Patents, copyrights, trademarks, trade secrets with registration procedures and infringement analysis
- **`references/privacy-regulations.md`** — GDPR, CCPA, HIPAA, COPPA side-by-side with compliance checklists and policy templates
- **`references/contract-review.md`** — Clause-by-clause review checklist, red flags, and EDGAR example language
- **`references/court-procedure.md`** — FRCP/FRCrP/FRE key rules, filing deadlines, sentencing guidelines overview
- **`references/bulk-data-sources.md`** — APIs and datasets: CourtListener, Caselaw Access Project, GovInfo, Pile of Law, LegalBench
- **`references/crypto-securities-law.md`** — Howey test for digital assets, SEC cases (Ripple, Coinbase, Binance), STO exemptions, 2025 SEC guidance by product category
- **`references/crypto-stablecoins-aml.md`** — GENIUS Act (enacted July 2025), FinCEN/BSA for crypto, MSB registration, Travel Rule, recent legislation (CLARITY Act, FIT21)
- **`references/crypto-tokenization-cftc-tax.md`** — RWA tokenization, UCC Article 8, CFTC jurisdiction, Ooki DAO case, DAO liability, IRS crypto tax, Form 1099-DA broker reporting
- **`references/agentic-workflows.md`** — Real-world agentic legal workflow patterns, case studies (Aaron Sneed's Council, ProPlaintiff DocGen), crypto-legal classifiers, and bootstrap implementation guide
- **`references/agentic-tech-stack.md`** — Vercel AI SDK and CrewAI patterns for legal agents, crypto-legal agent implementations (Howey classifier, stablecoin monitor, DAO analyzer), data source integration, Vercel/Railway deployment guide
- **`references/regulations-and-agencies.md`** — eCFR API, Federal Register API, agency-by-agency breakdown (IRS, EEOC, USPTO/MPEP, FDA/openFDA), CFR navigation patterns
- **`references/case-law.md`** — CourtListener REST API v4, citation verification workflow (hallucination prevention), Shepardizing without Westlaw, SCOTUS, Google Scholar, PACER/RECAP
- **`references/github-legal-agent-implementations.md`** — Open-source legal AI agent repos (LegalAnt, LegalTrace, multi-agent compliance demos), architectures, and patterns from GitHub
- **`references/github-legal-agent-implementations.md`** — Open-source legal AI agent repos (LegalAnt, LegalAgent, multi-agent compliance demos), architectures, and patterns from GitHub
