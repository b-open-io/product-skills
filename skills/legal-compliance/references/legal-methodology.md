# Legal Methodology Reference

Covers IRAC analysis, statutory interpretation canons, legal research workflow, Bluebook citation, EDGAR contract research, ABA ethics for AI, and e-discovery standards.

---

## 1. IRAC / CRAC / CREAC Framework

### IRAC (Issue, Rule, Analysis, Conclusion)

The foundational structure for legal analysis. Use for neutral memos, research notes, bar exam-style analysis.

**I — Issue**
- State the precise legal question: "Whether [party] is liable for [claim] under [legal standard] when [key facts]..."
- Narrow to the actual dispute; avoid broad framing

**R — Rule**
- State the governing legal rule as a general principle (not a conclusion)
- For multi-element rules, list all required elements (negligence: duty, breach, causation, damages)

**A — Analysis** (most important — the longest section)
- Apply the rule to the specific facts
- Use analogical reasoning: compare to precedent cases
- Address counterarguments and distinguish adverse authority
- For multi-element rules, analyze each element in sequence

**C — Conclusion**
- Directly answer the Issue
- Brief — the Analysis has done the work

### Variants

| Structure | Use Case | Distinguishing Feature |
|-----------|----------|------------------------|
| **IRAC** | Research memos, neutral analysis | Issue-first |
| **CRAC** | Persuasive briefs | Opens with conclusion (reader knows answer immediately) |
| **CREAC** | Complex research memos | Adds "Explanation" step (how courts have applied the rule) |

**CREAC expanded:** Conclusion → Rule → Explanation (case synthesis) → Application → Conclusion

### AI Application Rules
1. Run a separate IRAC/CREAC block for each distinct legal issue
2. Nest sub-issues under subheadings with their own IRAC structure
3. Use CRAC/CREAC for persuasive documents; IRAC for neutral analysis
4. Never skip the Analysis step — bare conclusions without reasoning are legally useless
5. Distinguish mandatory authority (binding) from persuasive authority (non-binding)

---

## 2. Statutory Interpretation Canons

### Two Primary Theories

**Textualism:** Interpret by plain ordinary meaning; disregard legislative intent if text is clear.
**Purposivism:** Interpret in light of legislative purpose and intent.

Courts use both approaches and apply the same analytical tools regardless of theory.

### Semantic (Textual) Canons

| Canon | Rule |
|-------|------|
| **Plain Meaning Rule** | Give words their ordinary meaning unless technical meaning is clearly intended |
| **Ejusdem Generis** | "Of the same kind" — general words following specific terms limited to the same class |
| **Expressio Unius** | Express inclusion implies exclusion of all others not mentioned |
| **Noscitur a Sociis** | Ambiguous words take meaning from surrounding context |
| **Surplusage Canon** | Every word must be given effect; no provision should be redundant |
| **Rule of Lenity** | Penal statutes interpreted narrowly in favor of defendant when genuinely ambiguous |
| **Whole Act Rule** | Statute read as a whole; provisions interpreted consistently with each other |
| **Consistent Usage** | Same word used multiple times presumed to have the same meaning throughout |

### Substantive (Normative) Canons

| Canon | Rule |
|-------|------|
| **Constitutional Avoidance** | Adopt interpretation that avoids constitutional questions if two are plausible |
| **Clear Statement Rule** | Congress must speak clearly to abrogate sovereign immunity or override state law |
| **Presumption Against Extraterritoriality** | Statutes presumed not to apply outside the US absent clear congressional intent |
| **Last-in-Time Rule** | More recent statutes generally supersede older ones |
| **Specific Over General** | A specific statute controls over a general one on the same subject |

### AI Application Sequence
1. Start with plain meaning — if unambiguous, stop there
2. Check whole-act context
3. Apply semantic canons (ejusdem generis, expressio unius, noscitur a sociis)
4. Consult legislative history only if text is genuinely ambiguous
5. Apply substantive canons (constitutional avoidance, rule of lenity)
6. Resolve conflicts (specific over general; last-in-time)

---

## 3. Legal Research Workflow

### Step 1: Issue Spotting and Search Term Generation
- Identify all parties, claims, defenses, jurisdiction, and relevant time period
- Generate search terms from facts (who, what, when, where, how)
- Expand to legal terms of art
- Map to legal topic areas

### Step 2: Secondary Sources First

Secondary sources orient before diving into primary law; they explain doctrine and provide citations.

| Source Type | Best For |
|-------------|----------|
| Legal Encyclopedias (AmJur, CJS) | Broad overview, initial citations |
| Treatises (Corbin, Wright & Miller) | Deep analysis; authoritative synthesis |
| ALR Annotations | Narrow issue deep-dives; nationwide case collection |
| Restatements | Black-letter principles with commentary |
| Law Review Articles (SSRN, HeinOnline) | Cutting-edge issues, novel arguments |

### Step 3: Primary Sources — Statutes Before Cases

**Authority Hierarchy:**
1. Constitutional provisions (supreme)
2. Statutes/codes
3. Regulations/agency rules
4. Binding case law (same jurisdiction, higher court)
5. Persuasive case law (other jurisdictions, lower courts, dicta)

- Read annotated codes (USCA, USCS) — they include case citations
- Check regulations (CFR, Federal Register) and agency guidance
- Find mandatory authority first, then persuasive

### Step 4: Validate and Expand
- **Shepardize / KeyCite** every primary case — verify still good law, not overruled
- Follow citing references to find newer cases
- Follow citation trails in both directions

### Step 5: Organize and Analyze Gaps
- Map findings to each element of each claim or defense
- Identify gaps (no controlling authority → best persuasive authority?)
- Note circuit splits and unsettled questions

### Key Research Databases

| Platform | Contents |
|----------|---------|
| Westlaw | Cases, statutes, regulations, secondary sources, KeyCite |
| LexisNexis | Cases, statutes, regulations, secondary sources, Shepard's |
| Google Scholar | Free case law search |
| CourtListener / PACER | Federal court filings and opinions (free) |
| HeinOnline | Law reviews, historical statutes |
| EDGAR | SEC filings, public contracts and exhibits |

---

## 4. Using EDGAR for Contract Clause Research

EDGAR is the largest free public database of real-world commercial contracts from publicly traded companies (material contracts filed as 10-K, 10-Q, 8-K, S-1 exhibits).

### EDGAR Full-Text Search (EFTS)
**Web UI:** https://efts.sec.gov/LATEST/search-index (also https://efts.sec.gov/)

**Key Parameters:**

| Parameter | Function |
|-----------|---------|
| `q=` | Keyword/phrase query |
| `forms=` | Filter by form type (10-K, 8-K, S-1) |
| `dateRange=custom` | Restrict to date range |
| `startdt=` / `enddt=` | Date bounds (YYYY-MM-DD) |
| `entity=` | Specific company name or CIK |

**Example Queries:**
```
q="indemnification"&forms=10-K&startdt=2024-01-01&enddt=2024-12-31
q="limitation of liability" "consequential damages"&forms=10-K
q="change of control" "acceleration"&forms=8-K
q="non-compete" "non-solicitation"&forms=10-K
```

**Boolean Support:** AND (implied), exact phrase (`""`), OR, NOT, wildcard (`terminat*`)

### Research Workflow
1. Identify clause type using standard legal term (indemnification, force majeure, arbitration)
2. Select form types (10-K Exhibit 10.x for material contracts; 8-K for merger agreements)
3. Filter by industry/date for comparable companies
4. Review 5-10 actual clauses to identify market norms and carve-outs
5. Extract drafting patterns and standard exceptions

### High-Value Contract Types in EDGAR
- **Material contracts** (Exhibit 10.x to 10-K): employment, license, supply, credit facilities
- **Merger agreements** (8-K Exhibit 2.x): MAE definitions, termination fees
- **Underwriting agreements** (S-1): indemnification, lock-up provisions
- **Executive compensation** (DEF 14A proxy): severance, change-of-control triggers

---

## 5. ABA Ethics for AI-Assisted Legal Work

**Governing Framework: ABA Formal Opinion 512 (July 2024)** — first formal AI ethics guidance under existing Model Rules.

### Critical Rules

| Rule | Requirement | AI-Specific Obligation |
|------|-------------|----------------------|
| **1.1 Competence** | Understand technology benefits and risks | Must understand AI capabilities; verify all AI outputs; hallucinated citations = attorney competence failure |
| **1.4 Communication** | Keep clients informed | Address AI use in engagement letters; disclose when AI materially affects work |
| **1.5 Fees** | Fees must be reasonable | Reflect time savings from AI in billing; don't bill full rates for AI output without disclosure |
| **1.6 Confidentiality** | No disclosure without consent | Review AI vendor data retention policies before inputting client information |
| **3.1 Meritorious Claims** | No frivolous filings | Hallucinated citations in filings violate Rule 3.1 |
| **3.3 Candor to Tribunal** | No false statements to court | Submitting AI briefs with unchecked citations violates Rule 3.3 (see *Mata v. Avianca*, 2023 sanctions) |
| **5.1 Supervisory** | Ensure subordinate compliance | Law firm leadership must establish AI use policies |
| **5.3 Nonlawyer Assistance** | Supervise nonlawyers | AI tools treated as nonlawyer assistance; attorney responsible for AI output quality |

**AI Disclaimer:** Always clarify when providing AI-assisted legal analysis: "Not a licensed attorney. This analysis is AI-generated and requires attorney review before reliance."

---

## 6. Bluebook Citation Format

### Essential Citation Formats

**Case (Rule 10):**
```
Brown v. Board of Education, 347 U.S. 483 (1954).
Roe v. Wade, 410 U.S. 113, 153 (1973).  [pinpoint citation]
```

**Federal Statute (Rule 12):**
```
42 U.S.C. § 1983 (2018).
```

**Code of Federal Regulations (Rule 14):**
```
29 C.F.R. § 1910.1200 (2023).
```

**Law Review Article (Rule 16):**
```
John C. Coffee, Jr., Securities Fraud, 73 N.Y.U. L. Rev. 1 (1998).
```

**Short forms:** *Id.* (same source, same page), *Id.* at [page] (different page)

### Practitioner vs. Academic Format

| Element | Bluepages (Court Docs) | Whitepages (Law Review) |
|---------|----------------------|------------------------|
| Citations in | Text body | Footnotes |
| Small caps | Not used | Used for books, journals |

---

## 7. E-Discovery Standards (EDRM Framework)

### The Nine EDRM Stages

| Stage | Description | AI Agent Tasks |
|-------|-------------|---------------|
| **1. Information Governance** | Policies for ESI management, retention, disposal | Advise on retention schedules, data classification |
| **2. Identification** | Locate potentially relevant ESI; Early Case Assessment | Map data sources, custodians, date ranges, keywords |
| **3. Preservation** | Issue legal hold; prevent destruction of relevant ESI | Draft legal hold notices; identify preservation obligations |
| **4. Collection** | Forensic collection from devices, email, cloud | Advise on defensible collection methodology |
| **5. Processing** | Convert raw ESI to reviewable format; de-duplication | Instruct on processing specs (TIFF, native, load files) |
| **6. Review** | Relevance and privilege evaluation (80% of litigation cost) | Apply Technology-Assisted Review (TAR/predictive coding) |
| **7. Analysis** | Identify patterns, key documents, timelines | Cluster analysis, concept searching |
| **8. Production** | Deliver ESI per agreed specifications | Advise on format (Bates numbering, metadata fields) |
| **9. Presentation** | Use ESI at depositions and trial | Prepare exhibit lists, trial technology coordination |

### Key ESI Terms

| Term | Definition |
|------|-----------|
| **Litigation Hold** | Legal obligation to preserve ESI when litigation is reasonably anticipated; failure = spoliation sanctions |
| **Meet and Confer** | Required FRCP 26(f) conference on ESI scope, format, and costs |
| **De-duplication** | Removal of exact duplicate documents |
| **Privilege Log** | Required listing of documents withheld on privilege grounds |
| **TAR** | Technology-Assisted Review — predictive coding for document review |

---

## 8. AI Legal Research Standard Operating Procedure

```
INPUT: Legal question, jurisdiction, facts, client/matter context

STEP 1 — ISSUE SPOTTING
  [ ] Identify all claims and defenses
  [ ] Note jurisdiction (federal/state, circuit, district)
  [ ] Identify statutes of limitations
  [ ] Generate keyword list: factual terms + legal terms of art

STEP 2 — SECONDARY SOURCE ORIENTATION
  [ ] Consult relevant treatise or legal encyclopedia
  [ ] Identify governing doctrinal framework
  [ ] Extract citations to key primary authorities

STEP 3 — STATUTORY AND REGULATORY RESEARCH
  [ ] Find applicable statute(s) in annotated code
  [ ] Read full statutory text (not summaries)
  [ ] Apply canons of construction if ambiguous
  [ ] Check applicable regulations (CFR) and agency guidance

STEP 4 — CASE LAW RESEARCH
  [ ] Search for mandatory authority (same jurisdiction + higher court)
  [ ] Find leading cases in the area
  [ ] Locate most recent cases applying the rule
  [ ] Find cases with analogous facts

STEP 5 — VALIDATION
  [ ] Shepardize/KeyCite every case relied upon
  [ ] Confirm statute has not been amended or repealed
  [ ] Verify regulations are current

STEP 6 — ANALYSIS
  [ ] Apply IRAC/CREAC structure to each issue
  [ ] Distinguish adverse authority
  [ ] Assess strength of each position

STEP 7 — CITATION AND OUTPUT
  [ ] Apply Bluebook format to all citations
  [ ] Verify all case names, volumes, pages, and years
  [ ] Flag any citation that could not be independently verified

ETHICS CHECKPOINT
  [ ] No client information in unsecured AI systems (Rule 1.6)
  [ ] All citations independently verified — no hallucinated cases (Rules 3.1, 3.3)
  [ ] Output labeled as AI-assisted / subject to attorney review
  [ ] No legal advice to non-clients (unauthorized practice concerns)
```
