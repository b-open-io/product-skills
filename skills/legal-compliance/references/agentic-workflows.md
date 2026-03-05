# Agentic Legal Workflow Patterns

Community-sourced patterns from bootstrapped founders, open-source projects, and practitioner case studies. Focused on real implementations that solo founders are actually building and sharing.

---

## The 4-Agent Legal Workflow Pattern

The core architecture shared across production legal AI systems:

```
Incoming request
  → Triage / Chief of Staff (classify + route)
    → Researcher (case law, statutes, precedent)
      → Analyst (classify, assess risk, apply legal test)
        → Drafter (memo, opinion, compliance report)
          → Human review gate (attorney sign-off)
```

Each role maps to a distinct agent. The triage layer prevents legal questions from being swallowed by finance or operations agents. The human review gate is non-negotiable in every production implementation.

**Key properties:**
- Researcher gets data-source tools (CourtListener, Congress.gov, EDGAR)
- Analyst operates on research output; no direct API access needed
- Drafter produces structured output (Pydantic schema, not free text) for reviewability
- Human gate is a hard stop, not a suggestion

---

## Aaron Sneed's "Council" — 15-Agent Solo Company

**Source:** Business Insider, Feb 13, 2026

Aaron Sneed (defense-tech solo founder) replaced a traditional staff with a council of 15 custom GPTs. The Legal AI Agent is one named role, alongside comms and PR.

**Legal agent specifics:**

- **Chief of Staff routes first.** Any task touching legal concerns is routed to the Legal agent before HR or Finance agents weigh in. The routing layer is not optional.
- **"Roundtable" debate pattern.** Contract or RFP review triggers a debate session: legal, HR, and finance agents challenge each other's positions. Agents are explicitly trained to push back, not affirm.
- **Domain-specific training required.** Sneed trained his legal agent on case facts and strategy. A real lawyer later told him the framing — while technically correct — wasn't how legal strategy is communicated in practice. The lesson: accuracy and professional convention are separate problems.
- **Human lawyer for finalization.** "I have a lawyer I use for patents or if there's a dispute." AI does upfront research and drafting; a licensed attorney handles anything consequential.

**Quantified impact:** 20 hours/week saved across all 15 agents.

**Pattern to extract:** Chief of staff as priority triage → multi-agent debate for adversarial review → human lawyer as final gate for high-stakes work.

---

## ProPlaintiff.ai DocGen — Agentic Paralegal

**Source:** ProPlaintiff.ai blog; EIN Presswire launch announcement, January 2026

DocGen is ProPlaintiff's AI-powered legal document generation system trained on 6.7 million case law files. It targets personal injury law firms.

**What makes it agentic vs. simple chat:**

1. **Reasons through the request.** The system considers: document purpose (lien reduction letter vs. settlement demand vs. mediation letter), intended audience (adjuster vs. judge vs. opposing counsel), evidence supporting the client's position, and desired outcome.
2. **Pulls from case context.** Opens the specific case file, accesses uploaded documents (medical records, incident reports, prior correspondence), and generates a draft that reads like a paralegal reviewed the entire file.
3. **Iterative drafting.** Produces a first draft for attorney review, not a final document. "DocGen generates drafts, not final documents, ensuring the human touch remains intact."

**Workflow:**
```
Attorney opens case
  → Describes document type + purpose
    → Agent reasons: purpose + audience + evidence + outcome
      → Queries 6.7M case law corpus for precedent
        → Generates draft
          → Attorney reviews + revises via chat
            → Attorney finalizes and sends
```

**Early user results:** First drafts in minutes vs. 30–60 minutes per document previously.

**Adaptation for crypto-legal use:** The DocGen pattern maps directly to token legal opinions, SAFT agreements, and Reg D 506(c) offering memos. Replace the personal injury corpus with SEC enforcement actions, Howey test analysis, and GENIUS Act/CLARITY Act text.

---

## Balaji's "Lawyers as Verifiers" Framework

**Source:** Balaji Srinivasan on X, July 2025 — `x.com/balajis/status/1941504015642337565`

Balaji reframes the AI-lawyer relationship for founders who cannot afford $500/hr BigLaw rates.

**Step 1 — AI as first drafter (parallel):** Tell the AI it is "the named partner of the most capable law firm in your city, with expertise in corporate law, tech startups, compliance, and accounting." Draft a full memo describing your business goals, then ask specific questions with citations to specific code sections, case law, or sample documents (SAFTs, Reg D filings).

**Step 2 — Multi-model consensus:** Run the same prompt across multiple AI systems. Assemble answers in a spreadsheet: questions as rows, AI responses as columns. Consensus = high confidence. Divergence = areas requiring human review.

**Step 3 — Human lawyer as verifier only:** Give the spreadsheet to a human lawyer. Their job is not primary research — it is to verify, correct, and flag AI output. This collapses lawyer hours from 10–20 hours of research + drafting to 1–2 hours of verification.

**Application to token deals:** AI drafts Howey analysis memo → AI drafts proposed exemption strategy (Reg D 506(c), utility token argument, CFTC commodity routing) → multiple AIs cross-check each other → lawyer verifies citations and signs off.

**Key insight:** AI is good at generating plausible legal analysis but unreliable at catching its own errors. The human provides error correction, not generation.

---

## Common Patterns Across All Sources

### 1. Draft + Verify, Not Draft + Trust

Every production implementation maintains human review as a final gate. The AI accelerates research and drafting; the human attorney verifies, adjusts strategy, and signs off. AI-only workflows are characterized as explicit risk assumption.

### 2. Structured Outputs Over Free Text

Production workflows use Pydantic models, spreadsheet outputs, or track-changes redlines rather than free-text chat. Structure makes AI output reviewable, diffable, and auditable.

### 3. Knowledge Base as the Differentiator

What separates commodity legal chatbots from agentic systems is the retrieval layer — a curated corpus of relevant regulation, precedent, and policy. ProPlaintiff has 6.7M PI case law files; the LlamaIndex demo uses a guideline index; Harvey encodes team-specific workflows. The LLM is interchangeable; the knowledge base is the moat.

### 4. Chief of Staff / Triage Layer

In multi-agent architectures, a routing layer decides which agent handles each task. For legal agents, this prevents legal questions from being handled by ops or finance agents first.

### 5. Template-Grounded Generation

Agents that start from lawyer-reviewed templates or team-encoded workflows produce better output than agents that generate from scratch. Templates bound the hallucination surface.

---

## Crypto-Legal Specific Implementations

### Howey Test Classifier Agent

```
Input: Token offering document or white paper
  → Parse to structured markdown
    → Extract structured fields:
        - Token sale mechanics
        - Profit expectation language
        - Decentralization claims
        - Utility use cases
        - Lock-up / vesting terms
        - Investor communications
    → For each extracted element, query Howey corpus:
        - Prong 1: Investment of money?
        - Prong 2: Common enterprise?
        - Prong 3: Expectation of profit?
        - Prong 4: From efforts of others?
    → CLARITY Act routing:
        - Digital commodity (functional, decentralized) → CFTC
        - Restricted digital asset → SEC
        - Payment stablecoin → GENIUS Act / banking regulators
    → Output:
        - Risk level: LOW / MEDIUM / HIGH / VERY HIGH
        - Flagged language requiring revision
        - Recommended exemption strategy
        - Next-action checklist
```

**Knowledge base to seed:** SEC FinHub Digital Asset Framework, CLARITY Act / FIT21 classification criteria, GENIUS Act stablecoin requirements, key enforcement actions (Ripple, Coinbase, Binance, LBRY, Terraform).

### GENIUS Act Stablecoin Compliance Monitor

Checks stablecoin design documents against enacted GENIUS Act requirements (signed July 18, 2025):

- 1:1 reserve requirement (permitted assets: Treasuries, FDIC-insured deposits)
- Monthly attestation + CEO/CFO certification
- AML/KYC: CIP program, OFAC SDN screening, FATF Travel Rule ($3k threshold)
- NIST CSF 2.0 cybersecurity documentation
- Independent smart contract audit
- Public redemption policy disclosure

Output: structured gap analysis with `compliant / gap / unclear` status per requirement, evidence quoted from the submission document, and remediation steps.

### Digital Asset Bill Tracker

Polls Congress.gov API daily for new crypto legislation. Filters by keywords (digital asset, stablecoin, cryptocurrency, token, blockchain, DeFi). Scores each bill 0–10 for startup impact. Routes high-impact findings to immediate alert; low-impact to weekly digest.

Active bills to seed the tracker: S.1582 (GENIUS Act, enacted July 2025), H.R.3633 (CLARITY Act, House-passed June 2025), Senate Agriculture Committee discussion draft (November 2025 CLARITY update).

### DAO Liability Analyzer

Assesses DAO structure for liability exposure across five dimensions:

1. **Entity type** — Unincorporated association vs. LLC vs. foundation (Wyoming DAO LLC Act, Marshall Islands DAO Act, Delaware LLC)
2. **Control concentration** — Do token holders have meaningful governance? Bona Fide DAO test
3. **CFTC commodity pool analysis** — Does DAO treasury management qualify as pooled investment?
4. **Tax classification** — Partnership vs. corporation for token distributions (IRS Notice 2023-27)
5. **Jurisdiction choice** — Developer locations, user concentration, governing law analysis

Output: risk matrix with jurisdiction-specific recommendations and formation structure options.

---

## Bootstrap Implementation Guide

Recommended build order for a crypto-legal AI agent:

1. **Week 1–2: Seed the knowledge base.** Load GENIUS Act text, CLARITY Act, SEC Digital Asset Framework, key Howey case law, recent enforcement actions (Ripple, Terraform, Coinbase). Use Chroma locally for zero-ops setup.
2. **Week 3–4: Howey Test Classifier.** 4 prong-specialist agents + 1 aggregator. Pydantic output schema. CourtListener tool integration.
3. **Week 5–6: GENIUS Act compliance checker.** Structured gap analysis against stablecoin designs.
4. **Week 7–8: Congress.gov bill tracker.** Daily polling, keyword filtering, impact scoring, alert routing.
5. **Ongoing: DAO liability analyzer + EDGAR contract search.** Expand knowledge base with new enforcement actions as they occur.

For deployment patterns and our actual tech stack (Vercel AI SDK, CrewAI, Vercel/Railway), see `references/agentic-tech-stack.md`.

---

## Sources

- [Business Insider — Aaron Sneed "The Council"](https://www.businessinsider.com/solo-founder-runs-company-with-15-ai-agents-heres-how-2026-2)
- [ProPlaintiff DocGen blog post](https://www.proplaintiff.ai/post/docgen-ai-powered-legal-document)
- [ProPlaintiff launch press release (EIN Presswire)](https://www.einpresswire.com/article/884888828/proplaintiff-launches-docgen-ai-for-legal-document-drafting)
- [Balaji Srinivasan "Lawyers as Verifiers" thread](https://x.com/balajis/status/1941504015642337565)
- [LlamaIndex Agentic Document Workflows blog](https://www.llamaindex.ai/blog/introducing-agentic-document-workflows)
- [LlamaIndex contract review notebook](https://github.com/run-llama/llamacloud-demo/blob/main/examples/document_workflows/contract_review/contract_review.ipynb)
- [CourtListener REST API v4](https://www.courtlistener.com/help/api/rest/)
- [Congress.gov API documentation](https://api.congress.gov/)
- [GENIUS Act text — Congress.gov S.1582](https://www.congress.gov/bill/119th-congress/senate-bill/1582/text)
- [CLARITY Act — Congress.gov H.R.3633](https://www.congress.gov/bill/119th-congress/house-bill/3633/text)
- [LAW: Legal Agentic Workflows paper — COLING 2025](https://aclanthology.org/2025.coling-industry.50.pdf)
