# Federal Regulations & Agency Sources

Research Date: March 2026

## TL;DR for Anthony

**Lead with eCFR API** (free, no key, daily updates, JSON/XML) for all regulatory text.
**Supplement with Federal Register API** for preambles and rulemaking context.
**openFDA** is best-in-class for drug/device questions.
**IRS and EEOC have no APIs** — use pre-built PDF/HTML corpora.
**Regulations.gov API is restricted** as of August 2025 — treat as unavailable.

---

## eCFR (Electronic Code of Federal Regulations)

**URL:** https://www.ecfr.gov
**API Docs:** https://www.ecfr.gov/developers/documentation/api/v1
**No API key required.**

The daily-updated authoritative CFR. All 50 titles, hierarchical, with amendment history.

### Key API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/versioner/v1/titles.json` | All CFR titles |
| `GET /api/versioner/v1/structure/{date}/title-{n}.json` | Hierarchical structure |
| `GET /api/versioner/v1/full/{date}/title-{n}.xml` | Full title text |
| `GET /api/search/v1/results` | Full-text search |
| `GET /api/admin/v1/agencies.json` | Agencies with CFR refs |

### Critical CFR Titles

| Title | Subject | Key Parts |
|---|---|---|
| **26** | IRS/Tax | Part 1 (income), Part 31 (employment), Part 301 (procedure) |
| **29** | Labor | Part 825 (FMLA), Part 1604 (sex discrim), Part 1630 (ADA), Part 1910 (OSHA) |
| **16** | FTC | Part 255 (endorsements), Part 314 (Safeguards Rule) |
| **21** | FDA | Parts 1–1299 |
| **37** | Patents/Trademarks | Parts 1–400 (USPTO) |
| **45** | HHS/HIPAA | Part 164 (Security/Privacy) |
| **17** | SEC/CFTC | Parts 1–499 |

### Navigation Patterns
```
# Direct URL to a specific part:
https://www.ecfr.gov/current/title-29/chapter-XIV/part-1630  (ADA regs)
https://www.ecfr.gov/current/title-29/chapter-XVII/part-1910 (OSHA)
https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1 (income tax)

# API: fetch full title as XML
GET https://www.ecfr.gov/api/versioner/v1/full/2026-03-04/title-29.xml

# Search within a title
GET https://www.ecfr.gov/api/search/v1/results?query=data+security&hierarchy[title]=16
```

---

## Federal Register

**URL:** https://www.federalregister.gov
**API Docs:** https://www.federalregister.gov/developers/documentation/api/v1
**No API key required.** Returns JSON/CSV.

The daily journal — proposed rules, final rules, notices, presidential docs. Contains preambles and agency rationale that the CFR strips out.

### Key API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/documents/{fr_doc_number}.json` | Single document |
| `GET /api/v1/documents.json?conditions[...]=...` | Full search |
| `GET /api/v1/public-inspection-documents.json` | Pre-publication docs |

### Search Parameters
- `conditions[term]` — keyword
- `conditions[agencies][]` — agency slug
- `conditions[type][]` — RULE, PRORULE, NOTICE
- `conditions[cfr][title]` / `[part]` — by CFR citation
- `conditions[publication_date][gte]` / `[lte]` — date range

**Limitation:** 2000-result pagination cap. Max 1000 per_page.

### Rulemaking History Lookup
```
1. Find final rule: filter by CFR part + agency + type=RULE
2. Get full_text_xml_url for preamble
3. Use regulation_id_number (RIN) to track all stages
```

---

## Agency-Specific Sources

### IRS
**Publications:** https://www.irs.gov/publications
**No public API.** PDF/HTML only.
- Stable URL pattern: `https://www.irs.gov/publications/pXXX` (HTML) or `https://www.irs.gov/pub/irs-pdf/pXXX.pdf`
- Internal Revenue Bulletin: `https://www.irs.gov/irb/YYYY-NN_IRB`
- Updated annually (Jan–Mar); IRB weekly; Revenue Rulings irregular
- **Strategy:** Pre-index publications by number; check IRB weekly

### EEOC
**Guidance:** https://www.eeoc.gov/guidance
**No public API.** HTML/PDF only.
- Enforcement Guidance (formal), Policy Statements, Technical Assistance Docs
- **Warning:** Guidance is politically volatile — can be withdrawn without notice (AI guidance removed Jan 27, 2025)
- **Strategy:** Maintain versioned local snapshots; verify availability before citing

### USPTO / MPEP
**Open Data Portal:** https://data.uspto.gov (no key required)
**MPEP:** https://www.uspto.gov/web/offices/pac/mpep/index.html

Key APIs (data.uspto.gov):
- Patent File Wrapper Search
- Patent Assignments
- PTAB Decisions

MPEP section URL: `https://www.uspto.gov/web/offices/pac/mpep/s{section}.html`
MPEP not in API — HTML/PDF only. Updated per revision (last: Rev. 01.2024).
**2025:** USPTO revised MPEP § 101 for AI/ML patent eligibility (Dec 5, 2025).

### FDA / openFDA
**openFDA:** https://open.fda.gov/apis/
**No key for ≤1000 req/day (240/min).** Elasticsearch-based, JSON.

Key endpoints (base: `https://api.fda.gov`):

| Endpoint | Dataset |
|---|---|
| `/drug/event.json` | Adverse events (FAERS) |
| `/drug/label.json` | Drug labeling |
| `/drug/enforcement.json` | Drug recalls |
| `/device/510k.json` | 510(k) premarket notifications |
| `/device/classification.json` | Device classification |
| `/food/enforcement.json` | Food recalls |

Guidance documents: HTML/PDF at fda.gov only — no API. Use `https://www.fda.gov/regulatory-information/search-fda-guidance-documents`.

---

## Recommended Search Strategies

### CFR Citation Resolution
```
GET https://www.ecfr.gov/api/versioner/v1/full/{today}/title-{n}.xml
# Cross-reference Federal Register preamble for context
```

### Topic-Based Regulatory Discovery
```
# eCFR search within a title
GET https://www.ecfr.gov/api/search/v1/results?query=data+security&hierarchy[title]=16

# Federal Register confirmation
GET https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=federal-trade-commission&conditions[term]=data+security&conditions[type][]=RULE
```

### Always Pair CFR + Federal Register
The CFR gives you the rule. The Federal Register gives you the interpretation. Both required for legal accuracy.
