# US Federal Statutes Reference Guide

**Source:** Cornell LII, House OLRC, Copyright Office
**Coverage:** Current through Public Law 119-73 (January 23, 2026)

---

## Tier 1 — Universal Coverage (Most Critical Titles)

| Title | Subject | Key Sections |
|-------|---------|-------------|
| **18** | Crimes & Criminal Procedure | §371 conspiracy, §1001 false statements, §1341 mail fraud, §1343 wire fraud, §1961-1968 RICO |
| **26** | Internal Revenue Code | §61 gross income, §162 deductions, §401(k), §501(c), §6501 SOL |
| **28** | Judiciary & Judicial Procedure | §1331 federal question, §1332 diversity, §1441 removal, §1983 area, §§2241-2266 habeas |
| **42** | Public Health & Welfare | §1983 civil rights, §2000e Title VII, §12101 ADA, §§1395+ Medicare, §§9601+ CERCLA |

## Tier 2 — Domain-Specific

| Title | Subject | Key Sections |
|-------|---------|-------------|
| **15** | Commerce & Trade | §§1-38 Sherman Act, §§41-77 FTC, §§78a+ Securities Exchange Act, §§1051+ Lanham Act, §§6501+ COPPA, §§7201+ SOX |
| **17** | Copyrights | §101 definitions, §107 fair use, §501 infringement, §512 DMCA safe harbor, §1201 anti-circumvention |
| **35** | Patents | §101 patentable subject matter, §102 novelty, §103 non-obviousness, §271 infringement, §284 damages |
| **8** | Aliens & Nationality | §§1101-1537 INA (modern core), §1182 inadmissibility, §1227 deportation |

## Tier 3 — Specialized

| Title | Subject | Key Sections |
|-------|---------|-------------|
| **11** | Bankruptcy | Ch. 7 liquidation, Ch. 11 reorganization (incl. Subchapter V small biz), Ch. 13 individual repayment |
| **21** | Food & Drugs | §§301-399i FDCA, §505 NDA, §§801-971 Controlled Substances Act |

---

## How to Navigate Cornell LII

**URL Patterns (deterministic and programmable):**
```
Title index:  https://www.law.cornell.edu/uscode/text/{title}
Section:      https://www.law.cornell.edu/uscode/text/{title}/{section}
Chapter:      https://www.law.cornell.edu/uscode/text/{title}/chapter-{N}
```

**Key Features:**
- "Quick search by citation" bar on every page (e.g., `18 USC 1341`)
- **Table of Popular Names:** https://www.law.cornell.edu/topn — find acts by name (RICO, FCRA, ADA)
- **Parallel Table of Authorities:** https://www.law.cornell.edu/ptoa — maps CFR → USC
- "Notes" tab on each page has legislative history and amendments
- Currency indicator shows "Current through [Public Law number]"

**Recommended Lookup Patterns:**
```
1. Known citation:       GET https://www.law.cornell.edu/uscode/text/{T}/{§}
2. Topic unknown:        https://www.law.cornell.edu/topn → popular name → section
3. Regulation→statute:  https://www.law.cornell.edu/ptoa → CFR cite → USC cite
4. Full-text search:     https://uscode.house.gov (OLRC) or https://www.govinfo.gov
5. Bulk ingest:          https://uscode.house.gov/download/download.shtml → XML (USLM format)
```

---

## Bulk Download & APIs

**Official Bulk Download (House OLRC):**
- URL: https://uscode.house.gov/download/download.shtml
- Current release: Public Law 119-73 (January 23, 2026)
- Formats: XML (USLM schema — preferred for AI ingestion), XHTML, PDF
- USLM User Guide: https://uscode.house.gov/download/resources/USLM-User-Guide.pdf

**GovInfo API:**
- REST API: https://api.govinfo.gov (requires free API key)
- Covers US Code, Federal Register, CFR, Congressional Records
- Docs: https://api.govinfo.gov/docs

---

## Title-by-Title Reference

### Title 8 — Aliens and Nationality
**Source:** https://www.law.cornell.edu/uscode/text/8

**Organization:** 15 chapters; Chapter 12 (§§1101-1537) is the modern INA core.

**Key Questions:**
- What visa categories exist and their statutory requirements?
- What are grounds for inadmissibility and removal?
- Employer obligations for verifying work authorization (I-9)?

---

### Title 11 — Bankruptcy
**Source:** https://www.law.cornell.edu/uscode/text/11

**Organization:** 9 chapters using intentional odd-number scheme (matches filing types):
- Ch. 1: General Provisions (§§101-112) — definitions, automatic stay, eligibility
- Ch. 3: Case Administration — filing, trustees, meetings of creditors
- Ch. 5: Creditors, Debtor, and Estate — claims, exemptions, avoidance powers
- Ch. 7: Liquidation (§§701-784)
- Ch. 9: Municipal Debt Adjustment
- Ch. 11: Business Reorganization (§§1101-1195, Subchapter V for small businesses)
- Ch. 12: Family Farmer/Fisherman (§§1201-1232)
- Ch. 13: Individual Debt Repayment (§§1301-1330)
- Ch. 15: Cross-Border Insolvency (§§1501-1532)

**Key Questions:**
- What chapter should an individual vs. business file?
- What property is exempt from the bankruptcy estate?
- How does the automatic stay work?
- What debts are non-dischargeable?
- What are the trustee's avoidance powers (preferential transfers, fraudulent conveyances)?

---

### Title 15 — Commerce and Trade
**Source:** https://www.law.cornell.edu/uscode/text/15
**153 chapters.** Key clusters:

| Chapters | Subject |
|----------|---------|
| 1-2 | Sherman Act (§§1-38), FTC Act (§§41-77) |
| ~14-15 | Securities Act of 1933 (§§77a+), Exchange Act of 1934 (§§78a+) |
| 22 | Lanham Act / Trademarks (§§1051-1141n) |
| 41 | Consumer Credit Protection (TILA, FCRA, Fair Debt Collection) |
| 47 | Consumer Product Safety (§§2051-2090) |
| 91 | COPPA (§§6501-6506) |
| 94 | Gramm-Leach-Bliley Financial Privacy (§§6801-6827) |
| 98 | Sarbanes-Oxley (§§7201-7266) |
| 103 | CAN-SPAM Act (§§7701-7713) |
| 119 | National AI Initiative (§§9401-9462) |

**Key Questions:**
- Is this business conduct an antitrust violation?
- What are SEC disclosure requirements?
- What are FCRA obligations for credit reporting?
- What does COPPA require for children's apps?

---

### Title 17 — Copyrights
**Source:** https://www.copyright.gov/title17/
**Current through:** December 18, 2025 (includes NDAA FY2026 amendments)
Full PDF: https://www.copyright.gov/title17/title17.pdf

**Organization:** 15 chapters:
- Ch. 1: Subject matter and scope — originality, idea/expression (§§101-122)
- Ch. 3: Duration — life+70, work for hire
- Ch. 4: Notice, deposit, registration (§§401-412)
- Ch. 5: Infringement and remedies — §107 fair use, §512 DMCA safe harbor (§§501-513)
- Ch. 12: Anti-circumvention (DMCA §1201) (§§1201-1205)
- Ch. 15: Copyright Small Claims / CASE Act (§§1501-1511)

**Key Questions:**
- What works are copyrightable?
- What are the §107 fair use factors?
- What are DMCA §512 safe harbor requirements for platforms?
- What is the DMCA §1201 anti-circumvention prohibition?
- What are statutory damages ranges?

---

### Title 18 — Crimes and Criminal Procedure
**Source:** https://www.law.cornell.edu/uscode/text/18

**Organization:** 5 parts; Part I (Crimes) has 90+ chapters:

| Chapter | Subject |
|---------|---------|
| 9 | Bankruptcy fraud (§§151-158) |
| 11 | Bribery & Conflicts of Interest (§§201-227) |
| 13 | Civil Rights offenses (§§241-250) |
| 19 | Conspiracy (§§371-373) — §371 most-charged |
| 47 | Fraud (§§1001-1040) — §1001 false statements, §1341 mail fraud, §1343 wire fraud |
| 63 | Mail Fraud (§§1341-1352) — RICO predicate acts |
| 73 | Obstruction of Justice (§§1501-1521) |
| 90 | Trade Secrets / Economic Espionage (§§1831-1839) |
| 96 | RICO (§§1961-1968) |
| 119 | Wiretap Act (§§2510-2522) |
| 121 | Stored Communications Act / SCA (§§2701-2712) |

**Key Questions:**
- Elements of mail fraud, wire fraud, or conspiracy?
- RICO violation requirements and civil remedies?
- Computer Fraud and Abuse Act (CFAA, §1030) prohibitions?
- Federal wiretap and stored communications privacy laws?

---

### Title 21 — Food and Drugs
**Source:** https://www.law.cornell.edu/uscode/text/21

**Two dominant chapters:**
- **Ch. 9** (§§301-399i): FDCA — FDA's primary authority (drug approval, labeling, enforcement)
- **Ch. 13** (§§801-971): Controlled Substances Act — DEA's primary authority (scheduling, penalties)

| Schedule | Examples |
|----------|---------|
| I | Heroin, marijuana (federal), psilocybin |
| II | Cocaine, oxycodone, fentanyl, Adderall |
| III | Ketamine, anabolic steroids |
| IV | Xanax, Valium, Ambien |
| V | Cough preparations with small codeine amounts |

**Key Questions:**
- Drug approval pathway (NDA, BLA, ANDA)?
- What Schedule is a substance and what are the penalties?
- FDA enforcement authorities (warning letters, recalls)?

---

### Title 26 — Internal Revenue Code
**Source:** https://www.law.cornell.edu/uscode/text/26

**Organization:** 11 subtitles (A-K). Most critical:
- **Subtitle A** (§§1-1564): Income taxes — individual (§§1-199A), corporate, S corps, partnerships, international
- **Subtitle C** (§§3101-3512): Employment taxes — FICA, FUTA, withholding
- **Subtitle F** (§§6001-7874): Procedure — returns, assessments, collection, penalties, IRS authority

**High-frequency sections:** §1 (rates), §61 (gross income), §162 (business deductions), §401(k) (retirement), §501(c) (tax-exempt orgs), §2001 (estate tax), §6662 (accuracy penalties), §6501 (SOL)

**Key Questions:**
- What income is taxable?
- What business expenses are deductible under §162?
- Requirements for §501(c)(3) tax-exempt status?
- Payroll tax obligations for employers?

---

### Title 28 — Judiciary and Judicial Procedure
**Source:** https://www.law.cornell.edu/uscode/text/28

**Organization:** 6 parts:

| Part | Subject | Key Sections |
|------|---------|-------------|
| I | Organization of Courts | §§1-482 (Supreme Court, Courts of Appeals, District Courts, Bankruptcy courts) |
| II | Department of Justice | §§501-599B (AG, US Attorneys, FBI, DEA authority) |
| IV | Jurisdiction and Venue | §1331 (federal question), §1332 (diversity), §1391 (venue), §1441 (removal) |
| VI | Particular Proceedings | §2201 (Declaratory Judgment), §§2241-2266 (habeas), §§2671-2680 (FTCA) |

**Key Questions:**
- Does a federal court have jurisdiction?
- Amount-in-controversy for diversity jurisdiction?
- Can this case be removed to federal court?
- How is habeas corpus used?
- Can the federal government be sued (FTCA)?

---

### Title 35 — Patents
**Source:** https://www.law.cornell.edu/uscode/text/35

**Organization:** 5 compact parts (~376 sections):
- Part II (§§100-212): Patentability — §101 subject matter, §102 novelty, §103 non-obviousness, §112 claims, §154 term (20 years)
- Part III (§§251-329): Rights — §271 infringement, §282 validity, §284 damages (reasonable royalty), §§311-319 IPR, §§321-329 PGR

**USPTO APIs:** https://developer.uspto.gov (patent applications, grants, PTAB decisions)

**Key Questions:**
- What is patent-eligible under §101?
- What constitutes direct, induced, and contributory infringement?
- Remedies for patent infringement?
- IPR/PGR process for challenging validity at PTAB?

---

### Title 42 — Public Health and Welfare
**Source:** https://www.law.cornell.edu/uscode/text/42
**164 chapters** (largest by count). Key clusters:

| Chapters | Subject |
|----------|---------|
| 7 | Social Security Act — OASI, SSDI, SSI, Medicare (§§1395+), Medicaid (§§1396+) |
| 21 | Civil Rights — §1981, **§1983** (state actor claims), §1985, Title VII (§2000e) |
| 21B | Religious Freedom Restoration Act / RFRA |
| 21F | GINA (Genetic Information Nondiscrimination) |
| 21G | Pregnant Workers Fairness Act |
| 45 | Fair Housing Act (§§3601-3631) |
| 55 | NEPA (§§4321-4370m-12) |
| 82 | RCRA — hazardous waste (§§6901-6992k) |
| 85 | Clean Air Act (§§7401-7671q) |
| 103 | CERCLA / Superfund (§§9601-9675) |
| 126 | Americans with Disabilities Act / ADA (§§12101-12213) |
| 157 | Affordable Care Act / ACA (§§18001-18122) |

---

## Cross-Title Quick Reference

| Legal Question | Title | Key Sections |
|----------------|-------|-------------|
| Federal crime? | 18 | §371, §1341, §1343, §1001 |
| Sue in federal court? | 28 | §1331, §1332, §1441 |
| Employment discrimination | 42 | §2000e (Title VII), §12101 (ADA), §1981 (race) |
| Tax question | 26 | §61, §162, §401(k) |
| Patent infringement | 35 | §271, §282, §284 |
| Copyright infringement | 17 | §501, §107, §512 |
| Trademark dispute | 15 | §1114, §1125 |
| Antitrust violation | 15 | §§1-7 (Sherman Act) |
| Bankruptcy type | 11 | Ch. 7, Ch. 11, Ch. 13 |
| Immigration status | 8 | §1101, §1182, §1227 |
| Drug scheduling | 21 | §§801-971 (CSA), §812 |
| Data privacy | 15, 18 | 15§§6501+ (COPPA), 15§§6801+ (GLB), 18§§2701+ (SCA) |
| Civil rights vs. government | 42, 28 | 42§1983 (state), 28§§2671+ (FTCA for federal) |
| Environmental liability | 42 | §§9601-9675 (CERCLA), §§6901+ (RCRA) |
| Securities fraud | 15, 18 | 15§78j/78t (Exchange Act), 18§1348 |
