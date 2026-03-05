# Bulk Legal Data Sources and APIs

APIs, datasets, and bulk data sources for legal AI agents. Covers federal law, case law, state legislation, and evaluation benchmarks.

---

## Recommended Integration Stack

**Federal law questions:** GovInfo MCP (if MCP client) or GovInfo REST API → Congress.gov API for bill text and CRS summaries

**Case law questions:** CourtListener REST API for search, citation lookup, PACER docs → bulk download from S3 for offline index

**State law questions:** OpenStates API for current bills → NCSL topic pages to identify relevant states → ULC for model act baseline → state legislature websites for codified statutes

**Agent evaluation:** LegalBench (162 tasks, six reasoning categories)

---

## 1. GovInfo API

**URL:** https://api.govinfo.gov
**Docs:** https://api.govinfo.gov/docs/
**Key signup:** https://www.govinfo.gov/api-signup (free via api.data.gov)

Official GPO repository — the only certified trustworthy digital repository for federal documents.

### Collections

| Code | Collection |
|------|-----------|
| `USCODE` | United States Code |
| `CFR` | Code of Federal Regulations |
| `FR` | Federal Register |
| `PLAW` | Public Laws |
| `STATUTE` | Statutes at Large |
| `BILLS` | Congressional Bills |
| `CREC` | Congressional Record |
| `USREPORTS` | United States Reports (SCOTUS) |
| `USCOURTS` | Federal court opinions |

### Authentication
```
?api_key=YOUR_KEY
# or header: X-Api-Key: YOUR_KEY
```

### Key Endpoints

```bash
# List all collections
GET https://api.govinfo.gov/collections?api_key=KEY

# Packages modified since a date
GET https://api.govinfo.gov/collections/USCODE/2023-01-01T00:00:00Z?api_key=KEY

# Package summary and download links
GET https://api.govinfo.gov/packages/USCODE-2019-title15/summary?api_key=KEY

# Granules within a package (e.g., individual CFR sections)
GET https://api.govinfo.gov/packages/CFR-2023-title17/granules?api_key=KEY

# Full-text search across all collections
GET https://api.govinfo.gov/search?query=minimum+wage&collection=PLAW&api_key=KEY

# Find related documents
GET https://api.govinfo.gov/related/BILLS-116hr748enr?api_key=KEY
```

**Free, public domain.** Best for: fetching current codified federal law in XML, specific CFR sections, Public Law full text by number.

---

## 2. GovInfo MCP Server

**URL:** https://api.govinfo.gov/mcp
**Announcement:** https://www.govinfo.gov/features/mcp-public-preview
**Docs:** https://github.com/usgpo/api/blob/main/docs/mcp.md

Official MCP server from GPO. Enables LLM agents to query GovInfo without constructing raw API calls.

### Configuration
```json
{
  "mcpServers": {
    "govinfo": {
      "url": "https://api.govinfo.gov/mcp",
      "headers": { "x-api-key": "YOUR_GOVINFO_API_KEY" }
    }
  }
}
```

### Available Tools

| Tool | What It Does |
|------|-------------|
| `search_govinfo` | Search by query; returns title, IDs, publication date, excerpt |
| `get_package` | Full description of a package or granule by ID |
| `get_collections` | List all collections with counts |

**Free.** Same api.data.gov key as REST API. Best for: drop-in agent integration — zero boilerplate vs. raw REST.

---

## 3. Congress.gov API v3

**URL:** https://api.congress.gov/
**Docs:** https://github.com/LibraryOfCongress/api.congress.gov
**Key signup:** https://api.congress.gov/ (free)
**Rate limit:** 5,000 requests/hour; max 250 per request

### Key Endpoints

```bash
# Bill details
GET https://api.congress.gov/v3/bill/117/hr/3076?api_key=KEY

# Bill full text (enrolled, versions)
GET https://api.congress.gov/v3/bill/117/hr/3076/text?api_key=KEY

# Bill legislative history
GET https://api.congress.gov/v3/bill/117/hr/3076/actions?api_key=KEY

# CRS summaries (plain-language)
GET https://api.congress.gov/v3/bill/117/hr/3076/summaries?api_key=KEY

# Search bills by keyword
GET "https://api.congress.gov/v3/bill?q={\"keywords\":[\"minimum+wage\"]}&congress=117&api_key=KEY"

# CRS report by number
GET https://api.congress.gov/v3/crsreport/R47227?api_key=KEY
```

**Free, public domain.** Best for: legislative history, bill text, CRS summaries, keyword bill search.

---

## 4. CourtListener API v4

**URL:** https://www.courtlistener.com/api/rest/v4/
**Docs:** https://www.courtlistener.com/help/api/rest/
**Bulk data:** https://www.courtlistener.com/help/api/bulk-data/
**Rate limit:** 5,000 queries/hour (authenticated)

Data hierarchy: `Court → Docket → Opinion Cluster → Opinions` / `Docket → Docket Entries → RECAP Documents`

### Key Endpoints

```bash
# Search opinions
GET https://www.courtlistener.com/api/rest/v4/search/?q=qualified+immunity&type=o

# Get opinion cluster
GET https://www.courtlistener.com/api/rest/v4/clusters/4305/

# Get docket
GET https://www.courtlistener.com/api/rest/v4/dockets/5104907/

# RECAP documents (PACER filings)
GET https://www.courtlistener.com/api/rest/v4/recap-documents/?docket_entry__docket=5104907

# Citation lookup (hallucination prevention)
POST https://www.courtlistener.com/api/rest/v4/citation-lookup/
Body: {"text": "Miranda v. Arizona, 384 U.S. 436 (1966)"}
```

**Bulk downloads:** CSV snapshots via AWS S3. Types: case law, embeddings, oral arguments, dockets, judges.

**Free, nonprofit.** Best for: full-text opinion search, citation verification, PACER docs via RECAP, judicial analysis.

---

## 5. Caselaw Access Project (CAP)

Harvard digitization of ~7M unique US cases, 1658–2018. **Native search disabled September 2024.**

**Access now via:** CourtListener search and API (CAP integrated)
**Bulk data:** https://case.law/ (Harvard) and [Hugging Face](https://huggingface.co/datasets/free-law/Caselaw_Access_Project)
**License:** Commercial use unrestricted as of March 2024

Best for: historical case law (pre-2018), training data, bulk download for offline analysis.

---

## 6. Pile of Law

**HuggingFace:** https://huggingface.co/datasets/pile-of-law/pile-of-law
**Paper:** https://arxiv.org/abs/2207.00220
**License:** CC BY-NC-SA 4.0 — **NonCommercial only**

256GB legal pretraining corpus (35 sources): court opinions, PACER documents, Federal Register, contracts, statutes.

**Critical:** NC restriction means **cannot train models for commercial deployment** without license violation.

Best for: pretraining open-source non-commercial legal LLMs; academic research. Not for production RAG.

---

## 7. LegalBench

**URL:** https://hazyresearch.stanford.edu/legalbench/
**HuggingFace:** `nguha/legalbench`
**GitHub:** https://github.com/HazyResearch/legalbench
**License:** Apache 2.0 (code); task-specific licenses (data)

162-task benchmark for measuring legal reasoning in LLMs (NeurIPS 2023). Six task categories:

| Category | What It Tests |
|----------|--------------|
| Issue Spotting | Identify legal issues in a fact pattern |
| Rule Recall | State legal rules, locate codified law |
| Statutory Reasoning | Apply statutes to facts (US federal tax law — SARA dataset) |
| Contract Analysis | Interpret contract provisions |
| Interpretation | Construe ambiguous legal language |
| Rhetorical Understanding | Analyze legal argument structure |

```python
from datasets import load_dataset
ds = load_dataset("nguha/legalbench", "rule_qa")
```

**Free.** Best for: baseline evaluation before deployment; regression testing; identifying capability gaps by reasoning type.

---

## 8. Uniform Law Commission (ULC)

**URL:** https://www.uniformlaws.org/
**Acts catalog:** https://www.uniformlaws.org/acts/catalog/current

Drafts model legislation for states. 300+ uniform/model acts. Understanding the model act explains most state versions simultaneously.

**Key adopted acts:**

| Act | Adoption |
|-----|---------|
| UCC | All 50 states |
| UTSA (Trade Secrets) | 49 states + DC |
| UETA (Electronic Transactions) | 49 states |

**To find which states have adopted an act:** Go to act page → "Enactments" tab → lists every adopting state with effective date and state code citation.

**Free, no API.** Best for: model act baseline, state adoption maps, drafters' intent via official comments.

---

## 9. NCSL (National Conference of State Legislatures)

**URL:** https://www.ncsl.org/
**State legislature directory:** https://www.ncsl.org/about-state-legislatures/state-legislative-websites-directory

50-state policy research and legislative directory. Does not host state statutes — use as a **research index**.

**Workflow:** NCSL topic survey → identifies which states have legislation → navigate to state legislature website for codified statute.

**Common state code URLs:**
```
California: https://leginfo.legislature.ca.gov/
Texas:      https://statutes.capitol.texas.gov/
New York:   https://legislation.nysenate.gov/
Florida:    https://www.flsenate.gov/Laws/Statutes
```

**Free, no API.** Best for: 50-state surveys, finding relevant states before deep-dive research.

---

## 10. OpenStates API v3

**URL:** https://v3.openstates.org/
**Docs:** https://docs.openstates.org/api-v3/
**Key signup:** https://openstates.org/api/register/

Current state legislative data across all 50 states, DC, Puerto Rico.

### Key Endpoints

```bash
# Search bills by keyword and state
GET https://v3.openstates.org/bills?q=data+privacy&jurisdiction=ca&api_key=KEY

# Bill with full text
GET https://v3.openstates.org/bills?q=minimum+wage&include=texts&jurisdiction=ny

# Find legislators by location
GET https://v3.openstates.org/people.geo?lat=38.897&lng=-77.036

# List current legislators for a state
GET https://v3.openstates.org/people?jurisdiction=texas&current_role=true
```

**Rate limits:** Free tier: 10 req/min, 500/day. Paid tiers available.

**Best for:** tracking active state legislation, identifying which states have introduced bills on a topic, geographic legislator lookup.

---

## Source Comparison Matrix

| Source | Coverage | API? | Bulk? | Cost | Best For |
|--------|----------|------|-------|------|---------|
| GovInfo | USC, CFR, FR, PLAW, CREC | Yes | Via API | Free | Current federal law |
| GovInfo MCP | Same | MCP | No | Free | Agent-native federal queries |
| Congress.gov | Bills, CRS reports, votes | Yes | No | Free | Legislative history |
| CourtListener | 500M+ federal case/docket objects | Yes | Yes | Free | Case law, PACER docs |
| CAP | 7M cases through ~2018 | Via CourtListener | Yes | Free | Historical case law |
| Pile of Law | 256GB legal corpus | No | Yes | Free (NC only) | Non-commercial LLM training |
| LegalBench | 162 eval tasks | No | Yes | Free | Agent evaluation |
| ULC | 300+ model acts | No | Web only | Free | Model act text, adoption maps |
| NCSL | 50-state surveys, directory | No | No | Free | Multi-state research index |
| OpenStates | 50-state current bills | Yes | Yes | Free/Paid | Active state legislation |
