# Case Law Research Reference

Free and open sources for finding, verifying, and analyzing US case law. Includes the AI citation hallucination prevention workflow.

**Research completed:** March 2026

---

## Priority Stack for AI Legal Agents

1. **CourtListener REST API v4** — search 36M+ cases, verify citations exist, traverse citation networks. Free with registration.
2. **Citation Lookup API** — hallucination kill switch: POST any text block, get back which citations are real vs. fabricated.
3. **RECAP Archive** — free access to PACER federal dockets without per-page charges.
4. **Congress.gov API** — statutory background via CRS Reports.
5. **Google Scholar** — fast no-auth discovery, but no citator; never use alone.
6. **SCOTUS.gov** — authoritative source for Supreme Court slip opinions.

---

## 1. CourtListener REST API v4

**Base URL:** `https://www.courtlistener.com/api/rest/v4/`
**Docs:** https://www.courtlistener.com/help/api/rest/

### Authentication

Register free at courtlistener.com. Retrieve token from API docs page once logged in.

```
Authorization: Token <your-token-here>
```

**Rate limits:** 5,000 requests/hour, 5,000/day (free tier)

### Key Endpoints

**Search opinions:**
```
GET https://www.courtlistener.com/api/rest/v4/search/
```

| Parameter | Description | Example |
|-----------|-------------|---------|
| `q` | Full-text search with boolean | `q=miranda+rights` |
| `type` | Object type; `o` = opinions | `type=o` |
| `court` | Court ID | `court=scotus` or `court=ca9` |
| `filed_after` | ISO-8601 date lower bound | `filed_after=2020-01-01` |
| `filed_before` | ISO-8601 date upper bound | `filed_before=2023-12-31` |
| `order_by` | Sort order | `order_by=score+desc` |
| `stat_Published` | Published opinions only | `stat_Published=on` |

```bash
# 9th Circuit Fourth Amendment cases since 2020
curl -H "Authorization: Token YOUR_TOKEN" \
  "https://www.courtlistener.com/api/rest/v4/search/?q=fourth+amendment+unreasonable+search&type=o&court=ca9&filed_after=2020-01-01"
```

**Retrieve specific opinion:**
```
GET https://www.courtlistener.com/api/rest/v4/opinions/{id}/
```

**Forward citations** (what cites a case):
```
GET https://www.courtlistener.com/api/rest/v4/opinions-cited/?cited_opinion={id}
```

**Backward citations** (what a case cites):
```
GET https://www.courtlistener.com/api/rest/v4/opinions-cited/?citing_opinion={id}
```

**Count without fetching:** append `&count=on` to any query.

**Tip:** Build queries on the [Advanced Search UI](https://www.courtlistener.com/?type=o) first, then copy GET parameters to the API — same parameter names.

---

## 2. Citation Lookup and Verification API (Anti-Hallucination)

**Endpoint:** `POST https://www.courtlistener.com/api/rest/v4/citation-lookup/`
**Docs:** https://www.courtlistener.com/help/api/rest/citation-lookup/

Built expressly to combat AI citation hallucination. Accepts text up to ~50 pages (64,000 characters), extracts all case citations using Eyecite, and verifies each against ~10 million citations.

### Usage

```bash
# Verify a citation
curl -X POST \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "The court relied on Miranda v. Arizona, 384 U.S. 436 (1966)."}' \
  https://www.courtlistener.com/api/rest/v4/citation-lookup/

# Quick single-citation check
curl -s -X POST \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "549 U.S. 497"}' \
  "https://www.courtlistener.com/api/rest/v4/citation-lookup/" | jq '.[0].status'
# Returns 200 if real, 404 if not
```

### Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| `200` | Citation found and verified | Safe to cite |
| `300` | Multiple matches | Ambiguous — clarify which case |
| `400` | Invalid reporter abbreviation | Fix citation format |
| `404` | Not found | **Do not cite — likely hallucinated** |

### Limitations
- Does NOT look up statutes (42 U.S.C. § 1983), law review articles, or `id.`/`supra`
- Coverage is strong for published opinions; may miss very recent or unpublished decisions

---

## 3. Caselaw Access Project (CAP)

Harvard Law School's digitization of all official US case reporters: ~6.7 million cases from 1658–2020. All published state and federal opinions.

**Current status (as of 2024-2025):** Harvard disabled CAP's native search interface in September 2024. The old.case.law site was retired.

**How to access CAP data now:**
- Use [CourtListener Advanced Search](https://www.courtlistener.com/?type=o) — CAP dataset integrated and cleaned by Free Law Project
- Bulk data via [CourtListener Bulk Data](https://www.courtlistener.com/help/api/bulk-data/)
- Dataset also on [Hugging Face](https://huggingface.co/datasets/free-law/Caselaw_Access_Project)

---

## 4. Google Scholar Case Law

**URL:** https://scholar.google.com/

**Coverage:**
- All 50 states' appellate courts since 1950
- Federal district, appellate, tax, bankruptcy courts since 1923
- SCOTUS since 1791

**Effective search patterns:**
- Select "Case law" tab
- Use court filter to restrict jurisdiction
- Use quoted phrases: `"deliberate indifference" "serious medical need"`
- Click "Cited by [N]" on any case page for forward citation tracking

**Key limitations:**
- **No citator** — does not indicate overruled/limited status
- **No API** — cannot be queried programmatically at scale
- Up to one month publication delay for new opinions
- **Role:** Use for initial discovery only; always verify via CourtListener before citing

---

## 5. SCOTUS — Supreme Court

**Opinions:** https://www.supremecourt.gov/opinions/opinions.aspx
**Current term slip opinions:** https://www.supremecourt.gov/opinions/slipopinion
**Oral arguments:** https://www.supremecourt.gov/oral_arguments/

Slip opinions posted same day as decision. Oral argument transcripts and audio posted same day as argument.

**Prior term URL pattern:** Replace `slipopinion` with `slipopinion/24` (for 2024 term), etc.

**No official API.** For structured SCOTUS data use:
- CourtListener with `court=scotus` filter
- [Justia Supreme Court Center](https://supreme.justia.com/) — free, includes briefs
- [Oyez.org](https://www.oyez.org/) — comprehensive multimedia archive

---

## 6. Congress.gov CRS Reports

**Portal:** https://crsreports.congress.gov/
**API:** https://api.congress.gov/

CRS (Congressional Research Service) reports provide nonpartisan statutory analysis: legislative history, competing interpretations, constitutional analysis, agency authority background.

**For AI agents:** CRS reports explain *why* a statute was enacted and *what Congress understood the language to mean* — context unavailable from opinions alone.

**API access:**
```bash
# List recent CRS reports (free API key at api.congress.gov)
curl "https://api.congress.gov/v3/crsreport?api_key=YOUR_KEY&limit=20&format=json"

# Specific report by CRS identifier
curl "https://api.congress.gov/v3/crsreport/R47227?api_key=YOUR_KEY&format=json"
```

**Alternative:** [EveryCRSReport.com](https://www.everycrsreport.com/) — third-party aggregator, better search, no API key needed.

---

## 7. PACER and the RECAP Archive

**PACER:** https://www.pacer.gov/ — All federal court filings (complaints, motions, briefs, orders)
- Cost: $0.10/page; no charge for queries generating <$30/quarter
- No bulk API; document-by-document access

**RECAP Archive (free alternative):** https://www.courtlistener.com/recap/
- Millions of PACER documents crowdsourced and republished
- Fully searchable at no cost via CourtListener API

```bash
# Search RECAP dockets
curl -H "Authorization: Token YOUR_TOKEN" \
  "https://www.courtlistener.com/api/rest/v4/dockets/?q=apple+v+samsung&court=dcd"

# Documents within a docket
curl -H "Authorization: Token YOUR_TOKEN" \
  "https://www.courtlistener.com/api/rest/v4/recap-documents/?docket_entry__docket={docket_id}"
```

---

## 8. Shepardizing Without Westlaw/LexisNexis

### Free Verification Workflow

**Step 1: Verify citation exists**
```bash
curl -X POST \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "410 U.S. 113 (1973)"}' \
  https://www.courtlistener.com/api/rest/v4/citation-lookup/
# 404 = does not exist. 200 = returns opinion ID.
```

**Step 2: Find negative treatment via forward citations**
```bash
curl -H "Authorization: Token YOUR_TOKEN" \
  "https://www.courtlistener.com/api/rest/v4/opinions-cited/?cited_opinion={id}&order_by=dateFiled+desc"
```

**Step 3: Search for overruling language**
```bash
curl -H "Authorization: Token YOUR_TOKEN" \
  "https://www.courtlistener.com/api/rest/v4/search/?q=%22Roe+v.+Wade%22+overruled&type=o&order_by=dateFiled+desc"
```

### Negative Treatment Signals

| Phrase | Interpretation |
|--------|---------------|
| "we overrule [case]" | Case is no longer good law |
| "we reverse" | Specific holding reversed |
| "we disapprove of" | Partial negative treatment |
| "we decline to follow" | Circuit split — treat carefully |
| "we distinguish [case]" | Narrow to its facts |
| "we limit [case] to" | Scope of holding curtailed |

**Note:** An AI-powered open-source citator is in development by Free Law Project (see progress reports May 2025, Sept 2025). Check CourtListener case pages for citator signals as it rolls out.

**Limitation:** No color-coded signal system like commercial citators. Commercial services (Westlaw, Lexis) remain superior for comprehensive citator analysis.

---

## 9. AI Agent Citation Verification Protocol

```
PRE-OUTPUT VERIFICATION GATE

1. EXTRACT all case citations from draft output
   Pattern: [Volume] [Reporter] [Page] [(Court Year)]

2. POST full draft text to citation-lookup:
   POST /api/rest/v4/citation-lookup/
   Body: {"text": "<full draft text>"}

3. For each citation result:
   - status 200 → proceed
   - status 404 → REMOVE, add note "citation could not be verified"
   - status 300 → flag as ambiguous, prompt user to clarify
   - status 400 → fix reporter format, re-check

4. For verified citations (200), optionally check:
   - GET /api/rest/v4/opinions-cited/?cited_opinion={id}
   - Scan recent citations for overruling signals

5. Return only verified citations in final output
6. Never include a status 404 citation
```
