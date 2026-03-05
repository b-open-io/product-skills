# Agentic Legal Workflow Patterns

Community-sourced patterns from bootstrapped founders, open-source projects, and practitioner case studies. Focused on real implementations that solo founders are actually building and sharing.

---

## 1. Aaron Sneed's "Council" — 15-Agent Solo Company

**Source:** Business Insider, Feb 13, 2026 — "I'm a solo founder with AI agents instead of employees. My 'council' of AI agents saves me 20 hours a week."

### Architecture Overview

Aaron Sneed (defense-tech solo founder) replaced a traditional staff with a council of 15 custom GPTs built on Nvidia's platform. The council includes: chief of staff, HR, finance, accounting, legal, comms, PR, security/compliance, engineering, quality, supply chain, training, manufacturing, business systems, facilities, field operations, and IT/data agents.

### Legal Agent Specifics

The **Legal AI Agent** is one of the council's named roles alongside comms and PR. Key behaviors:

- **Receives delegated tasks from the Chief of Staff agent**, which acts as the priority-routing layer. Any task touching legal concerns is routed to the Legal agent first, before HR or Finance agents weigh in.
- **"Roundtable" multi-agent debate pattern**: When evaluating something like an RFP or contract, the legal agent participates in a debate session with HR and finance agents. Each agent challenges the others, simulating an internal review committee. The founder explicitly trained agents to push back rather than affirm.
- **Trained on domain-specific data**: Sneed trained his legal agent using facts and data to "plot a case." He fed it substantial information but later learned from a real lawyer that the agent's framing — while technically correct — was not how legal strategy is actually communicated in practice.
- **Human-in-the-loop for finalization**: The legal agent does upfront work and drafting, then a real lawyer reviews. The founder's summary: "With my legal agent in particular, I've learned the bounds of putting AI tools into real-world practice. I have a lawyer I use for patents or if there's a dispute."

### Key Takeaways

- **Chief of staff as triage layer**: Legal tasks don't go directly to the legal agent; the chief of staff triages and prioritizes based on configured parameters.
- **Continuous training loop**: "The training never really stops, because if I don't continuously train the models, I won't get the output I need."
- **Quantified impact**: 20 hours/week saved across all 15 agents.
- **Hard lesson on legal agents**: "Even though I thought my agent was correct and ideal to use, his [the lawyer's] legal skillset helped me realize we shouldn't express information the way I had it."

### Pattern to Extract

```
Incoming request
  → Chief of Staff agent (priority + routing)
    → Legal agent (research, draft, flag risks)
      → HR agent / Finance agent (debate/challenge)
        → Founder review
          → Human lawyer (finalization for patents/disputes)
```

---

## 2. ProPlaintiff.ai — DocGen Agentic Paralegal

**Source:** ProPlaintiff.ai blog; EIN Presswire launch announcement (Jan 2026); National Law Review

### What DocGen Is

DocGen is ProPlaintiff's AI-powered legal document generation system targeting personal injury law firms. Launched January 2026. The platform bills itself as "an agentic AI operating system" trained on 6.7 million case law files.

### What Makes It "Agentic" vs. Simple Chat

Standard legal chatbots match templates or answer questions. DocGen's agentic distinction:

1. **Reasons through the request**: The system "actively reasons through each request," considering:
   - Document purpose (lien reduction letter vs. settlement demand vs. mediation letter)
   - Intended audience (insurance adjuster vs. judge vs. opposing counsel)
   - Evidence supporting the client's position
   - Desired outcome (maximize settlement vs. preserve appeal rights)

2. **Pulls from case context**: Opens the specific case file, accesses uploaded documents (medical records, incident reports, prior correspondence), and generates a draft that "reads like it was written by a paralegal who reviewed the entire case file."

3. **Iterative drafting**: Rather than producing a final document, it produces a first draft for attorney review. "DocGen generates drafts, not final documents, ensuring the human touch remains intact."

### Workflow Pattern

```
Attorney opens case in ProPlaintiff CRM
  → Opens DocGen from tools menu
    → Describes document needed (type + purpose)
      → Agent reasons: purpose + audience + evidence + outcome
        → Queries 6.7M case law database for relevant precedent
          → Generates draft document
            → Attorney reviews, requests revisions via chat
              → Final attorney review and send
```

### Data Sources

- **6.7 million case law files** (personal injury focus — the training set, not live retrieval)
- Case management platform data: uploaded medical records, prior correspondence, case notes
- File integrations: Google Drive, Dropbox, OneDrive
- Document types: lien reduction letters, settlement demands, mediation letters, subpoenas, insurance adjuster correspondence

### Quantified Impact

Early users report completing first drafts in minutes that previously took 30–60 minutes per document.

### Adaptation for Crypto-Legal Use

The DocGen pattern — reason about purpose/audience/desired outcome, pull relevant precedent, produce a draft for human review — maps directly to token legal opinions, SAFT agreements, and Reg D 506(c) offering memos. The key difference: instead of a personal injury case law corpus, the knowledge base would be SEC enforcement actions, Howey test analysis, and CLARITY Act/GENIUS Act text.

---

## 3. LlamaIndex Agentic Document Workflow — Contract Review

**Source:** LlamaIndex blog "Introducing Agentic Document Workflows" (2024–2025); GitHub: `run-llama/llamacloud-demo/examples/document_workflows/contract_review/`

### What It Is

An open-source, runnable Jupyter notebook demonstrating a 4-step agentic contract compliance review workflow. Originally implemented for GDPR compliance checking; the architecture is framework-agnostic and adaptable to other regulatory guidelines (Howey test, GENIUS Act, CCPA, etc.).

### Exact 4-Step Workflow

**Step 1 — Parse**
```python
docs = SimpleDirectoryReader(input_files=[contract_path]).load_data()
contract_text = LlamaParse(result_type="markdown").parse(docs)
```
- Converts PDF/DOCX contracts into structured markdown using LlamaParse
- Preserves clause structure for downstream extraction

**Step 2 — Extract (Structured LLM Call)**
```python
extraction = await llm.astructured_predict(
    ContractExtraction,
    prompt_tmpl,
    contract_text=contract_text
)
```
- Extracts structured `ContractExtraction` Pydantic object
- Identifies individual clauses tagged with compliance indicators:
  - Data processing mentions
  - Cross-border transfer flags
  - Consent requirement markers
  - Safeguard provisions

**Step 3 — RAG + Map-Reduce Matching**
```python
# Dispatch parallel guideline lookups
for clause in extraction.clauses:
    ctx.send_event(ClauseCheckEvent(clause=clause))

# Each event handler:
async def check_clause(self, ctx, ev: ClauseCheckEvent):
    guidelines = await llamacloud_index.aretrieve(ev.clause.text)
    compliance = await llm.astructured_predict(
        ClauseComplianceCheck,
        clause=ev.clause,
        guidelines=guidelines
    )
    ctx.write(compliance)

# Aggregate all results
results = await ctx.collect_events(ClauseComplianceCheckEvent, len(clauses))
```
- Each extracted clause is matched against a `LlamaCloudIndex` containing the regulatory guideline corpus
- Parallel dispatch via `ctx.send_event()` — map phase
- `ctx.collect_events()` gathers all results — reduce phase
- Produces per-clause compliance verdict + similarity score

**Step 4 — Compliance Report**
```python
report = await llm.astructured_predict(
    ComplianceReport,
    non_compliant_clauses=non_compliant,
    contract_context=extraction
)
```
- Aggregates non-compliant clauses into final `ComplianceReport`
- Overall compliance status + remediation notes
- Structured Pydantic output for downstream use (webhook, UI, storage)

### Tech Stack

| Layer | Tool |
|-------|------|
| Document parsing | LlamaParse (LlamaCloud) |
| Workflow orchestration | LlamaIndex Workflows (`ctx.send_event`, `ctx.collect_events`) |
| Knowledge base (guidelines) | LlamaCloudIndex |
| Structured outputs | Pydantic + `astructured_predict()` |
| Prompt management | `ChatPromptTemplate.from_messages()` |
| LLM | Configurable (GPT-4o, Claude, etc.) |

### Adapting for Howey Test / Crypto Regulation

Replace the GDPR `LlamaCloudIndex` with a corpus containing:
- SEC FinHub Framework for digital assets
- Howey test prongs (investment of money, common enterprise, expectation of profit, from others' efforts)
- CLARITY Act / FIT21 text (digital commodity vs. restricted digital asset classification)
- GENIUS Act stablecoin requirements
- Key enforcement cases: SEC v. Ripple, SEC v. Coinbase, CFTC v. Ooki DAO

The extraction schema would flag: token sale mechanics, profit expectations in offering materials, decentralization claims, utility use cases, lock-up provisions. Each token offering document clause gets matched against Howey prongs instead of GDPR articles.

---

## 4. GitLaw — AI Agent for Contract Drafting and Redlining

**Source:** GitLaw launch (Nov 2025); Tech.eu; Paid.ai partnership announcement

### What It Is

GitLaw, founded by Nick Holzherr in 2025 and backed by $3M pre-seed from Jackson Square Ventures, builds an AI agent that makes legal documents free for founders. The agent drafts, redlines, and reviews agreements from a library of 1,000+ lawyer-reviewed templates.

### Agentic Workflow

GitLaw's agent "orchestrates multiple AI models and workflows behind the scenes, mirroring how a human lawyer would handle a task — comprehensively and methodically":

1. Founder describes contract need (NDA, SaaS agreement, investor terms, MSA)
2. Agent selects the appropriate template from 1,000+ lawyer-reviewed options
3. Agent customizes based on conversation context (jurisdiction, deal terms, risk tolerance)
4. Agent produces draft with track-changes / redlines highlighting all modifications
5. Founder can continue refining via chat

### Crypto-Specific Angle

GitLaw partnered with Paid.ai to produce a **Master Services Agreement designed for AI agents** — specifically for agent-to-agent economic transactions. This represents an emerging pattern: legal documents written to govern AI agent behavior and payments, rather than human parties.

### Pattern Value for Solo Founders

Template-grounded generation prevents hallucinated legal terms. The agent never drafts from scratch — it always starts from a lawyer-reviewed template and modifies, which bounds the error surface.

---

## 5. Balaji Srinivasan — "Lawyers as Verifiers" Framework

**Source:** Balaji Srinivasan on X, thread from July 2025 (`x.com/balajis/status/1941504015642337565`)

### The Framework

Balaji's "Lawyers as Verifiers" reframes the AI-lawyer relationship for bootstrapped founders who cannot afford $500/hr BigLaw rates:

**Step 1 — AI as first drafter (parallel)**
Tell the AI that it is "the named partner of the most capable law firm in your city, with expertise not just in corporate law, but tech startups, compliance, accounting, and the like." Draft a full memo to the AI describing your business goals, then ask a list of specific questions with citations to specific sections of legal code, caselaw, or sample documents like SAFEs.

**Step 2 — Multi-model consensus**
Run the same prompt against multiple AI systems (ChatGPT, Claude, Grok, Gemini, Perplexity). Assemble answers in a spreadsheet: questions as rows, AI responses as columns. Look for consensus (high confidence) and divergence (areas requiring human review).

**Step 3 — Human lawyer as verifier only**
Give the spreadsheet to a human lawyer. Their job is not to do primary research — it is to verify, correct, and flag the AI's output. This collapses lawyer hours from 10–20 hours of research + drafting to 1–2 hours of verification.

### Application to Token Deals

For token issuance, SAFE notes with token side letters, and SAFTs:
- AI drafts Howey analysis memo
- AI drafts proposed exemption strategy (Reg D 506(c), utility token argument, CFTC commodity routing)
- Multiple AIs cross-check each other's analysis
- Lawyer verifies regulatory citations and signs off

### Key Insight

The verifier model works because AI is "extremely good at faking things" — making it excellent at generating plausible legal analysis, but unreliable at catching its own errors. The human lawyer provides error correction, not generation. Crypto-specific: Balaji ties this to blockchain's deterministic verification properties as a complement (onchain citations, immutable audit trail of what AI advised and when).

---

## 6. Harvey + Flank — Enterprise Legal Agent Workflow Patterns

**Sources:** Harvey blog "Introducing Workflow Builder"; Insight Partners on Flank

### Harvey Workflow Builder

Harvey lets legal teams encode their proprietary knowledge into structured, reusable agent workflows. Pattern:

1. Legal team defines a workflow (e.g., "NDA review for SaaS vendors")
2. Workflow encodes: what to extract, which clauses to flag, acceptable ranges for key terms
3. Agent executes workflow on new documents — consistent, repeatable output
4. Human reviews exceptions only

**Key pattern**: Legal knowledge is captured in the workflow definition, not embedded in the LLM. This means domain experts configure once, agents execute many times.

### Flank — Paralegal Agents Embedded in Business Workflows

Flank agents "learn the legal policies specific to each company" and operate as junior paralegals. Instead of routing NDAs to a lawyer via email, employees ping Flank via Slack/existing tools. The agent:
1. Reviews NDA against company policy
2. Flags non-standard terms
3. Approves or escalates to counsel

**Pattern value**: Agentic legal review embedded at the point of need (Slack, email workflow) rather than a separate legal tool requiring context-switching.

---

## Common Patterns Across All Sources

### 1. Draft + Verify, Not Draft + Trust

Every production implementation maintains human review as a final gate. The AI accelerates research and drafting; the human attorney verifies, adjusts strategy, and signs off. Solo founders using AI-only are described as taking on explicit risk.

### 2. Structured Outputs Over Free Text

Production workflows use Pydantic models (LlamaIndex), spreadsheet outputs (Balaji), or track-changes redlines (GitLaw) rather than free-text chat. Structure makes AI output reviewable, diffable, and auditable.

### 3. Knowledge Base as the Differentiator

What separates commodity legal chatbots from agentic systems is the retrieval layer — a curated corpus of relevant regulation, precedent, and company policy. ProPlaintiff has 6.7M PI case law files; LlamaIndex uses LlamaCloudIndex; Harvey encodes team-specific knowledge. The LLM is interchangeable; the knowledge base is the moat.

### 4. Chief of Staff / Triage Layer

In multi-agent architectures (Aaron Sneed's council, Harvey workflows), a routing layer decides which agent handles each task. For legal agents, this prevents legal questions from being swallowed by finance or ops agents.

### 5. Template-Grounded Generation

GitLaw starts from lawyer-reviewed templates. Harvey starts from team-encoded workflows. This pattern bounds hallucination — the agent modifies a vetted baseline rather than generating from scratch.

### 6. Map-Reduce for Document Review

The LlamaIndex pattern demonstrates that multi-clause document review requires parallelism. Each clause is dispatched independently for guideline matching, then results are aggregated. This pattern scales to large contracts and regulatory frameworks without sequential bottlenecks.

---

## Crypto-Legal Specific Implementations

### Howey Test Classifier Agent Pattern

Inspired by the LlamaIndex contract review workflow, here is the target architecture for a crypto token compliance agent:

```
Input: Token offering document or white paper
  → LlamaParse: convert to structured markdown
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
    → Compliance report:
        - Risk level: LOW / MEDIUM / HIGH / VERY HIGH
        - Flagged language requiring revision
        - Recommended exemption strategy
        - Next-action checklist (legal counsel engagement, filing requirements)
```

**Knowledge base to build:**
- SEC FinHub Digital Asset Framework (full text + annotation)
- CLARITY Act / FIT21 digital commodity classification criteria
- GENIUS Act stablecoin requirements
- Key enforcement actions: Ripple, Coinbase, Binance, LBRY, Telegram
- Howey test application matrix (from SEC no-action letters and enforcement complaints)

### SAFE + Token Side Letter Review

Using GitLaw's template-grounded pattern + Balaji's multi-model verification:

1. Agent receives SAFE + token side letter
2. Extracts: valuation cap, discount, token allocation formula, conversion triggers, MFN clause
3. Checks against standard YC SAFE terms for deviations
4. Runs Howey analysis on token side letter terms (does token grant create investment contract?)
5. Multi-model verification (Claude + GPT-4 cross-check on securities law analysis)
6. Output: redline of deviations + Howey risk score + recommended revisions

---

## Sources

- [Business Insider — Aaron Sneed "The Council"](https://www.businessinsider.com/solo-founder-runs-company-with-15-ai-agents-heres-how-2026-2)
- [ProPlaintiff DocGen blog post](https://www.proplaintiff.ai/post/docgen-ai-powered-legal-document)
- [ProPlaintiff launch press release (EIN Presswire)](https://www.einpresswire.com/article/884888828/proplaintiff-launches-docgen-ai-for-legal-document-drafting)
- [LlamaIndex Agentic Document Workflows blog](https://www.llamaindex.ai/blog/introducing-agentic-document-workflows)
- [LlamaIndex contract review notebook](https://github.com/run-llama/llamacloud-demo/blob/main/examples/document_workflows/contract_review/contract_review.ipynb)
- [Balaji Srinivasan "Lawyers as Verifiers" thread](https://x.com/balajis/status/1941504015642337565)
- [Harvey Workflow Builder announcement](https://www.harvey.ai/blog/introducing-workflow-builder)
- [Insight Partners on Flank](https://www.insightpartners.com/ideas/workflow-automation-for-legal-teams-how-flank-is-empowering-law-yers-with-an-autonomous-ai-agent/)
- [GitLaw launch (Tech.eu)](https://tech.eu/2025/11/03/gitlaw-launches-ai-and-closes-3m-pre-seed-led-by-jackson-square-ventures/)
- [Paid.ai + GitLaw MSA for AI agents](https://paid.ai/blog/ai-agents/paid-gitlaw-introducing-legal-contracts-built-for-ai-agents)

---

# Tech Stacks, Frameworks & Data Pipeline Patterns

Technical reference for wiring up multi-agent systems to real legal data sources.
Oriented toward crypto/tokenization startups building continuous compliance monitoring.

---

## Framework Comparison: LangGraph vs CrewAI vs LlamaIndex Workflows

### LangGraph — Best for Complex Stateful Compliance Workflows

**Core model:** Directed graph where nodes are processing steps and edges encode routing logic.
State is typed, persisted, and resumable — the graph can pause for attorney review and resume later.

```python
from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict, Literal

class ComplianceState(TypedDict):
    token_description: str
    security_risk: float
    howey_analysis: dict
    attorney_approved: bool

def classify_token(state: ComplianceState):
    # Run Howey test analysis
    return {"security_risk": 0.85, "howey_analysis": {...}}

def route_by_risk(state: ComplianceState) -> Literal["escalate_to_attorney", "generate_memo"]:
    if state["security_risk"] > 0.7:
        return "escalate_to_attorney"
    return "generate_memo"

builder = StateGraph(ComplianceState)
builder.add_node("classify_token", classify_token)
builder.add_node("escalate_to_attorney", escalate_fn)
builder.add_node("generate_memo", memo_fn)
builder.add_edge(START, "classify_token")
builder.add_conditional_edges("classify_token", route_by_risk)

checkpointer = MemorySaver()
# interrupt_before pauses the graph — resumes after attorney approval
graph = builder.compile(checkpointer=checkpointer,
                        interrupt_before=["escalate_to_attorney"])
```

**Human-in-the-loop:** Set `interrupt_before=["node_name"]` to pause before any node.
The full graph state is serialized and stored; execution resumes by calling
`graph.invoke(None, config)` with the same thread ID after approval.

**Durable execution:** Graph state persists through failures — critical for long-running
compliance monitoring daemons that must resume exactly where they left off.

**Best for:** Multi-step compliance analysis with explicit routing logic, attorney review
gates, long-running bill tracking daemons, workflows where auditability is legally required.

**Observability:** LangSmith provides full trace visualization for every graph run —
critical for legal defensibility ("show your work").

---

### CrewAI — Best for Role-Based Legal Team Simulation

**Core model:** A Crew of agents each defined with role/goal/backstory. Tasks chain via the
`context` parameter; output from upstream tasks feeds as context into downstream tasks.

```python
from crewai import Agent, Task, Crew, Process
from pydantic import BaseModel
from typing import Literal

class HoweyAnalysis(BaseModel):
    prong_1_investment: float
    prong_2_common_enterprise: float
    prong_3_profit_expectation: float
    prong_4_efforts_of_others: float
    overall_security_risk: float
    key_evidence: list[str]
    comparable_cases: list[str]
    recommendation: Literal["likely_security", "likely_not", "ambiguous"]

researcher = Agent(
    role="Legal Research Specialist",
    goal="Find relevant case law and SEC enforcement actions",
    backstory="Securities attorney with 10 years at the SEC enforcement division",
    tools=[courtlistener_tool, edgar_tool, congress_tool],
    verbose=True
)

classifier = Agent(
    role="Howey Test Analyst",
    goal="Apply the four-prong Howey test to token structures",
    backstory="Former SEC enforcement analyst with deep token classification experience",
    tools=[search_tool],
    verbose=True
)

drafter = Agent(
    role="Legal Memo Writer",
    goal="Produce clear, actionable legal memos for non-lawyer founders",
    backstory="Experienced at translating complex securities law for technical founders",
    verbose=True
)

research_task = Task(
    description="Research SEC enforcement actions and case law for {token_name}",
    agent=researcher,
    output_pydantic=ResearchFindings
)

classify_task = Task(
    description="Apply Howey test to token based on research findings",
    agent=classifier,
    context=[research_task],           # upstream output injected here
    output_pydantic=HoweyAnalysis
)

draft_task = Task(
    description="Draft compliance memo with specific risk mitigation steps",
    agent=drafter,
    context=[research_task, classify_task],
    output_file="compliance_memo.md"
)

crew = Crew(
    agents=[researcher, classifier, drafter],
    tasks=[research_task, classify_task, draft_task],
    process=Process.sequential       # or Process.hierarchical for manager-led
)
result = crew.kickoff(inputs={"token_name": "ACME Governance Token"})
```

**Parallel tasks:** Add `async_execution=True` to independent tasks; dependent tasks use
`context` to await their results without blocking the crew.

**Enterprise hosting:** CrewAI supports self-hosting for data-sensitive deployments where
tokens and client docs must stay on-premises.

**Best for:** Workflows that mirror real legal team roles, research → analysis → drafting
→ review pipelines, rapid prototyping of crypto-legal compliance flows.

---

### LlamaIndex Workflows — Best for Document-Heavy RAG Pipelines

**Core model:** Event-driven workflow where steps emit typed events consumed by other steps.
Excellent for ingesting large legal document corpora and multi-document analysis at scale.

```python
from llama_index.core.workflow import Workflow, step, StartEvent, StopEvent, Event
from llama_index.core import VectorStoreIndex
from llama_index.core.node_parser import HierarchicalNodeParser
from pydantic import BaseModel

class DocumentsLoaded(Event):
    index: VectorStoreIndex

class ClauseCheckEvent(Event):
    clause: str
    clause_type: str

class ClauseResult(Event):
    clause: str
    compliant: bool
    evidence: str

class LegalRAGWorkflow(Workflow):
    @step
    async def ingest_documents(self, ev: StartEvent) -> DocumentsLoaded:
        docs = SimpleDirectoryReader(ev.doc_path).load_data()
        # Hierarchical chunking: parent=2048, child=512, sentence=128
        parser = HierarchicalNodeParser.from_defaults(chunk_sizes=[2048, 512, 128])
        nodes = parser.get_nodes_from_documents(docs)
        index = VectorStoreIndex(nodes)
        return DocumentsLoaded(index=index)

    @step
    async def dispatch_clause_checks(self, ev: DocumentsLoaded) -> list[ClauseCheckEvent]:
        clauses = await extract_clauses(ev.index)
        for clause in clauses:
            self.ctx.send_event(ClauseCheckEvent(clause=clause.text, clause_type=clause.type))

    @step
    async def check_clause(self, ev: ClauseCheckEvent) -> ClauseResult:
        # Parallel — each clause checked independently against the guideline corpus
        guidelines = await self.guideline_index.aretrieve(ev.clause)
        result = await llm.astructured_predict(
            ClauseComplianceCheck, clause=ev.clause, guidelines=guidelines
        )
        return ClauseResult(clause=ev.clause, compliant=result.compliant, evidence=result.evidence)

    @step
    async def compile_report(self, ev: ClauseResult) -> StopEvent:
        # Reduce: collect all clause results
        results = await self.ctx.collect_events(ClauseResult, self.expected_count)
        report = ComplianceReport(non_compliant=[r for r in results if not r.compliant])
        return StopEvent(result=report)
```

**Map-reduce pattern:** `ctx.send_event()` dispatches clause checks in parallel (map);
`ctx.collect_events()` aggregates all results (reduce). Scales to large contracts without
sequential bottlenecks.

**Best for:** Indexing large corpora (CourtListener opinions, EDGAR filings), semantic
search over legal documents, extracting structured data from unstructured legal text,
GDPR/Howey/GENIUS Act multi-clause compliance checking.

---

### Framework Selection Matrix

| Scenario | Best Choice |
|---|---|
| Multi-step compliance analysis with branching | LangGraph |
| Attorney-in-the-loop review gate | LangGraph (interrupt_before) |
| Role-based research → draft → review pipeline | CrewAI |
| Indexing 10k+ legal documents for RAG | LlamaIndex |
| Daily bill tracking + alert monitoring | LangGraph (long-running daemon) |
| Contract clause extraction at scale | LlamaIndex + Pydantic structured output |
| Rapid prototype for crypto startup | CrewAI |
| Production with full audit trail | LangGraph + LangSmith |
| Document retrieval + agent roles combined | CrewAI tools wrapping LlamaIndex query engines |

**Recommended hybrid architecture:** LlamaIndex for the knowledge layer (document indexing
and retrieval), CrewAI for agent role orchestration with LlamaIndex query engines as agent
tools, and LangGraph for the outer compliance monitoring loop with state persistence.

---

## Legal Data Source Integration Guide

### CourtListener API v4

**Base URL:** `https://www.courtlistener.com/api/rest/v4/`
**Auth:** Token header — `Authorization: Token <your-token>`
**Rate limit:** 5,000 requests/hour authenticated; v4.3+ returns 401 for anonymous requests

**Key endpoints:**
```
GET /search/?q={query}&type=o          # Opinion search (case law)
GET /search/?q={query}&type=d          # Docket search
GET /search/?q={query}&type=r          # RECAP dockets (PACER filings)
GET /opinions/{id}/                    # Specific opinion
GET /clusters/{id}/                    # Opinion cluster with citations
```

**Semantic search (added late 2025):** Natural language queries using vector embeddings —
ideal for "find cases like this token offering structure."

**MCP integration:** Two open-source MCP servers exist on GitHub (`courtlistener-mcp`,
`DefendTheDisabled/courtlistener-mcp`) enabling direct Claude agent access without custom API code.

**Agent tool pattern:**
```python
@tool
def search_case_law(query: str, court: str = None) -> list[dict]:
    """Search CourtListener for relevant case law and SEC enforcement opinions."""
    params = {"q": query, "type": "o", "order_by": "score desc"}
    if court:
        params["court"] = court
    resp = requests.get(
        "https://www.courtlistener.com/api/rest/v4/search/",
        headers={"Authorization": f"Token {CL_TOKEN}"},
        params=params
    )
    return resp.json()["results"][:10]
```

---

### Congress.gov API

**Base URL:** `https://api.congress.gov/v3/`
**Auth:** API key from api.data.gov — append `?api_key={key}` to requests
**Coverage:** Bills, amendments, committee reports, CRS reports, member votes, hearings

**Digital assets bill tracking — currently relevant:**
- `GET /bill/119/s/1582` — GENIUS Act (stablecoin regulation, enacted July 2025)
- `GET /bill/119/hr/3633` — CLARITY Act (FIT21 digital commodity framework, House-passed 2025)

**Pattern for monitoring new crypto legislation:**
```python
@tool
def check_crypto_legislation(congress: int = 119) -> list[dict]:
    """Check Congress.gov for new digital asset legislation."""
    CRYPTO_KEYWORDS = ["digital asset", "stablecoin", "cryptocurrency",
                       "token", "blockchain", "decentralized finance"]
    bills = []
    for bill_type in ["hr", "s"]:
        resp = requests.get(
            f"https://api.congress.gov/v3/bill/{congress}/{bill_type}",
            params={"api_key": CONGRESS_KEY, "limit": 250,
                    "fromDateTime": "2025-01-01T00:00:00Z",
                    "sort": "updateDate+desc"}
        )
        for bill in resp.json().get("bills", []):
            title = bill.get("title", "").lower()
            if any(kw in title for kw in CRYPTO_KEYWORDS):
                bills.append(bill)
    return bills
```

**Topic filtering note:** The API does not have built-in crypto/digital assets filtering.
Filter client-side by keywords in title/policyArea after retrieval.

---

### EDGAR EFTS (Full Text Search)

**Base URL:** `https://efts.sec.gov/LATEST/search-index`
**Auth:** No authentication required; `User-Agent` header required per SEC policy
**Coverage:** All electronically filed documents since 2001, including attachments

**Boolean operators:** `AND`, `OR`, `NOT`, exact phrase with `"quotes"`, wildcard `*`
**Natural language:** Not supported — use Boolean/phrase queries

```python
@tool
def search_edgar_filings(query: str, form_types: str = "S-1,10-K") -> list[dict]:
    """Search EDGAR full text for SEC filings matching the query."""
    resp = requests.get(
        "https://efts.sec.gov/LATEST/search-index",
        params={
            "q": query,                    # e.g., '"investment contract" "digital token"'
            "forms": form_types,
            "dateRange": "custom",
            "startdt": "2020-01-01"
        },
        headers={"User-Agent": "LegalAgent/1.0 contact@yourcompany.com"}
    )
    return resp.json().get("hits", {}).get("hits", [])[:20]

# Example: Find SAFT-related S-1 filings
results = search_edgar_filings('"simple agreement for future tokens" OR "SAFT"', "S-1")
```

**LAW system pattern (from COLING 2025 paper):** Production legal AI systems process
EDGAR contracts continuously via distributed offline pipelines that update OpenSearch
caches — not real-time API calls per analysis.

---

### GovInfo API (Federal Statutes & Regulations)

**Base URL:** `https://api.govinfo.gov/`
**Auth:** API key from api.data.gov
**Coverage:** Federal Register, Code of Federal Regulations, Congressional Record, U.S. Code

```python
# FinCEN/BSA regulatory guidance for crypto AML compliance
GET /search?query=stablecoin+AML&collections=FR,CFR&pageSize=20

# Title 31 CFR (BSA regulations covering crypto MSBs)
GET /packages/CFR-2025-title31-vol3/summary
```

**FinCEN guidance note:** No formal API exists for FinCEN guidance documents.
Best practice: download key guidance PDFs (FIN-2019-G001, FIN-2013-G001) and index them
in your vector store for RAG retrieval. GovInfo covers Federal Register published guidance.

---

## Vector Indexing Strategy for Legal Knowledge Bases

### Chunking Strategy by Document Type

**Case law opinions and appellate briefs — hierarchical chunking:**
```python
from llama_index.core.node_parser import HierarchicalNodeParser

# Three-level hierarchy matches legal document structure:
# Level 1 (2048 tokens): Sections / Arguments / Holdings
# Level 2 (512 tokens): Paragraphs / Sub-arguments
# Level 3 (128 tokens): Sentences (for pinpoint citations)
parser = HierarchicalNodeParser.from_defaults(chunk_sizes=[2048, 512, 128])
```

**Regulatory text (CFR, statutes):** 400-600 token chunks with section boundaries as
natural break points. Always preserve the section number as metadata.

**Contracts, SAFTs, term sheets:** Clause-level chunking (200-400 tokens) with clause type
as metadata: `{"clause_type": "liquidation_preference", "risk_flag": "high"}`.

**Starting point from LlamaIndex team:** 512-1024 tokens with ~50 token overlap; evaluate
retrieval quality against your specific legal corpus and adjust.

### Metadata Enrichment for Legal Citations
```python
node.metadata = {
    "source": "CourtListener",
    "citation": "SEC v. W.J. Howey Co., 328 U.S. 293 (1946)",
    "court": "SCOTUS",
    "date": "1946-05-27",
    "doc_type": "opinion",
    "relevance_tags": ["investment_contract", "howey_test", "securities_law"]
}
```

### Vector Store Selection

| Store | Best For | Notes |
|---|---|---|
| Chroma | Local dev, small corpus | Zero config, embedded, good for prototyping |
| Qdrant | Production semantic search | Payload filtering for jurisdiction/doc_type queries |
| Weaviate | Hybrid BM25 + vector | Legal text benefits from keyword + semantic combined |
| pgvector | Existing Postgres stack | Low ops overhead; avoid if already managing Postgres |

**Recommended:** Qdrant for production (payload filtering by jurisdiction, doc_type, date range);
Chroma for local development and prototyping.

---

## Local vs Cloud LLM Decision Framework

### Run Local When (Ollama + llama.cpp)

- Documents contain cap table details, investor names, or funding amounts
- Attorney-client privilege applies to documents being analyzed
- GDPR/CCPA applies and you cannot use a third-party data processor
- Competitive sensitivity (term sheet structures, acquisition docs, unreleased token mechanics)

**Practical local setup:**
```bash
# Pull models — legal analysis quality ranking
ollama pull llama3.2:70b-instruct-q4_K_M   # Best quality; needs 40GB+ VRAM
ollama pull llama3.2:8b-instruct-q4_K_M    # Good for classification; needs 6GB VRAM
ollama pull mistral:7b-instruct             # Fast drafting tasks; needs 5GB VRAM
```

**GPU requirements (2025/2026):**
- 8B models (Q4_K_M): ~6GB VRAM — RTX 3060/4060 sufficient
- 70B models (Q4_K_M): 40GB+ VRAM — requires A100 or multi-GPU consumer setup
- CPU inference: Viable on M2/M3 Mac for 7-8B models (~20-25 tokens/sec)

**Quality tradeoff:** Local 70B ≈ GPT-4o-mini for structured legal analysis tasks.
For Howey test classification on well-defined inputs, 8B models perform adequately.
For nuanced memo drafting or novel legal questions, 70B or cloud API preferred.

**Privacy guarantee:** Data never leaves the machine — eliminates GDPR data-in-transit risk
and third-party processor compliance vectors.

### Use Cloud API When

- Documents are already public (filed with SEC, published case law, enacted statutes)
- Speed matters more than privacy (real-time classification during token review session)
- Deep legal reasoning needed — Howey nuances, novel structures without clear precedent
- Budget allows ($0.01-0.03/page vs $0 marginal for local)

**Recommended cloud models for legal tasks:**
- `claude-opus-4-6` — best for complex Howey analysis requiring nuanced reasoning
- `claude-sonnet-4-6` — good balance for document review workflows and drafting
- `gpt-4o` — strong for structured extraction tasks with consistent JSON output

---

## Crypto-Legal Specific Agent Implementations

### Agent 1: Howey Test Classifier

**Purpose:** Token/offering description → 4-prong Howey analysis → security risk score + evidence

**Data sources:** CourtListener (SEC enforcement opinions), EDGAR (S-1 filings with comparable
offerings), internal knowledge base seeded with SEC no-action letters and enforcement complaints

**Pydantic output schema:**
```python
class HoweyAnalysis(BaseModel):
    prong_1_investment_of_money: float       # 0-1 confidence score per prong
    prong_2_common_enterprise: float
    prong_3_expectation_of_profit: float
    prong_4_efforts_of_others: float
    overall_security_risk: float             # weighted aggregate
    key_evidence: list[str]                  # quoted language from the offering doc
    comparable_cases: list[str]              # CourtListener citation strings
    recommendation: Literal["likely_security", "likely_not", "ambiguous"]
    recommended_exemption: str | None        # Reg D 506(c), utility argument, etc.
```

**Workflow (CrewAI, 4 parallel prong agents + 1 aggregator):**
1. Parse offering doc with LlamaParse → structured markdown
2. Extract: token sale mechanics, profit expectation language, decentralization claims,
   utility use cases, lock-up provisions, issuer promises
3. Dispatch 4 parallel prong-analysis tasks (one per Howey prong)
4. Each prong agent queries CourtListener for relevant precedent
5. Aggregator synthesizes prong scores → overall risk score + memo

**Key cases to seed the knowledge base:** SEC v. W.J. Howey Co. (1946),
SEC v. Ripple Labs (2023), SEC v. Terraform Labs (2024), SEC v. LBRY (2022),
Reves v. Ernst & Young (1990), Coinbase Wells Notice (2023), SEC FinHub Digital Asset Framework

---

### Agent 2: GENIUS Act Stablecoin Compliance Monitor

**Purpose:** Stablecoin design document → structured gap analysis against enacted GENIUS Act requirements

**Key requirements the agent checks (GENIUS Act, enacted July 18, 2025):**
- 1:1 reserve requirement — permitted assets only (Treasuries, FDIC-insured deposits, etc.)
- Monthly attestation + CEO/CFO certification process
- AML/KYC: CIP program, OFAC SDN screening, FATF Travel Rule ($3k threshold)
- NIST CSF 2.0 cybersecurity program documentation
- Independent smart contract audit requirement
- Redemption policy public disclosure

```python
class GeniusActGap(BaseModel):
    requirement: str              # "1:1 Reserve Requirement"
    statutory_citation: str       # "GENIUS Act § 4(a)"
    status: Literal["compliant", "gap", "unclear"]
    evidence_from_doc: str        # quoted text from stablecoin whitepaper
    remediation_needed: str | None

class GeniusActReport(BaseModel):
    overall_status: Literal["compliant", "gaps_found", "non_compliant"]
    gaps: list[GeniusActGap]
    critical_gaps: int            # count of "gap" status items
    summary: str
```

---

### Agent 3: FIT21/CLARITY Act Bill Tracker

**Purpose:** Daily Congress.gov polling → impact analysis → alert routing for crypto startup

**Workflow (LangGraph long-running daemon):**
```python
class BillTrackerState(TypedDict):
    last_checked: str
    raw_bills: list[dict]
    analyzed_bills: list[dict]
    high_impact_alerts: list[dict]
    weekly_digest: list[dict]

# Nodes
# 1. poll_congress: GET new bills since last_checked
# 2. filter_crypto: keyword filter (digital asset, stablecoin, etc.)
# 3. analyze_impact: score 0-10 severity for crypto startup
# 4. route_alerts: high impact → immediate alert; low → weekly digest
```

**Currently active bills to seed the tracker:**
- S.1582 (GENIUS Act) — enacted July 2025, stablecoin regulation
- H.R.3633 (CLARITY Act) — House-passed June 2025, digital commodity framework
- Senate Ag discussion draft — November 2025 update to CLARITY Act, focuses on intermediaries

---

### Agent 4: DAO Liability Analyzer

**Purpose:** DAO structure description → liability exposure assessment across jurisdictions

**Analysis dimensions:**
1. Entity type: Unincorporated association vs. LLC vs. foundation (Wyoming DAO LLC Act,
   Marshall Islands DAO Act, Delaware LLC)
2. Control concentration: Do token holders have meaningful governance? Bona Fide DAO test
3. CFTC commodity pool analysis: Does DAO treasury management qualify as pooled investment?
4. Tax classification: Partnership vs. corporation for token distributions (IRS Notice 2023-27)
5. Jurisdiction choice: Developer locations, user concentration, governing law analysis

**Output:** Risk matrix with jurisdiction-specific recommendations and formation structure options

---

## Recommended Tech Stacks

### Bootstrapped / Local-First (Zero data leaves premises)

```
LLM:           Ollama + Llama 3.2 70B for complex analysis
               Ollama + Mistral 7B for fast classification tasks
Vector DB:     Chroma (embedded, zero ops overhead)
Orchestration: LangGraph (state persistence + human-in-loop interrupt)
Data sources:  CourtListener API + Congress.gov API + EDGAR EFTS
Serving:       FastAPI + SQLite for task queue
Cost:          ~$0 marginal per analysis after hardware
Best for:      Early-stage startup with sensitive client docs, law firms with
               attorney-client privilege concerns, NDA-covered documents
```

### Cloud Startup (Speed + quality prioritized)

```
LLM:           claude-opus-4-6 for complex Howey analysis
               claude-sonnet-4-6 for document review pipelines
Vector DB:     Qdrant Cloud (managed, payload filtering by doc_type/date)
Orchestration: CrewAI + LlamaIndex query engines as agent tools
Data sources:  All public APIs + CourtListener MCP server for Claude integration
State/DB:      Convex or Supabase for agent state
Serving:       Vercel / Railway
Observability: LangSmith for agent trace capture
Cost:          ~$0.05-0.20 per complex analysis
Best for:      B2B SaaS legal tool, compliance monitoring product where speed matters
```

### Enterprise (Auditability + data residency required)

```
LLM:           claude-opus-4-6 via Bedrock or Azure OpenAI (data residency SLA)
Vector DB:     Weaviate on-prem OR pgvector (existing Postgres infrastructure)
Orchestration: LangGraph + LangSmith (full trace capture, every decision logged)
Human-in-loop: LangGraph interrupt + async task queue + attorney review UI
Audit trail:   Every agent run produces a LangSmith trace ID for legal record
Data sources:  All public APIs + licensed FactSet/Bloomberg legal data feeds
Cost:          Infrastructure + $1-5 per complex analysis
Best for:      General counsel offices, compliance teams at exchanges/issuers,
               law firms automating high-volume contract review with attorney sign-off
```

---

## Implementation Priorities for Crypto Startup

Recommended build order for a crypto-legal AI agent (Anthony):

1. **Week 1-2:** Seed vector knowledge base — GENIUS Act text, CLARITY Act, SEC Digital Asset
   Framework, key Howey case law, recent enforcement actions (Ripple, Terraform, Coinbase).
   Use LlamaIndex + Chroma locally.
2. **Week 3-4:** Howey Test Classifier — CrewAI crew with 4 prong-specialist agents + aggregator,
   Pydantic output schema, CourtListener tool integration.
3. **Week 5-6:** GENIUS Act compliance checker — structured gap analysis against stablecoin designs.
4. **Week 7-8:** Congress.gov bill tracker — LangGraph daemon, daily polling, keyword filtering,
   impact scoring, alert routing.
5. **Ongoing:** DAO liability analyzer, EDGAR contract search, expand knowledge base with new
   enforcement actions as they occur.

**Migration path:** Start local with Ollama for privacy (handles sensitive cap table / investor
docs). Migrate hot paths (public document analysis, bill tracking) to Claude API when quality
gap or latency matters.

---

## Tech Stack Sources

- [CourtListener REST API v4](https://www.courtlistener.com/help/api/rest/)
- [CourtListener v4 Migration Guide](https://www.courtlistener.com/help/api/rest/v4/migration-guide/)
- [Congress.gov API documentation](https://api.congress.gov/)
- [EDGAR Full Text Search FAQ](https://www.sec.gov/edgar/search/efts-faq.html)
- [GENIUS Act stablecoin compliance checklist — Hacken](https://hacken.io/discover/genius-act-security-compliance-checklist/)
- [GENIUS Act text — Congress.gov S.1582](https://www.congress.gov/bill/119th-congress/senate-bill/1582/text)
- [CLARITY Act — Congress.gov H.R.3633](https://www.congress.gov/bill/119th-congress/house-bill/3633/text)
- [LangGraph overview — LangChain docs](https://www.langchain.com/langgraph)
- [LangGraph human-in-the-loop with Elasticsearch](https://www.elastic.co/search-labs/blog/human-in-the-loop-hitllanggraph-elasticsearch)
- [CrewAI regulatory compliance with Amazon Bedrock](https://aws.amazon.com/blogs/machine-learning/automating-regulatory-compliance-a-multi-agent-solution-using-amazon-bedrock-and-crewai/)
- [LangGraph vs CrewAI vs LlamaIndex comparison](https://servicesground.com/blog/ai-orchestration-frameworks-comparison/)
- [LlamaIndex vs CrewAI — ZenML Blog](https://www.zenml.io/blog/llamaindex-vs-crewai)
- [Local LLM privacy guide 2025 — Cohorte](https://www.cohorte.co/blog/run-llms-locally-with-ollama-privacy-first-ai-for-developers-in-2025)
- [Ollama VRAM requirements — LocalLLM.in](https://localllm.in/blog/ollama-vram-requirements-for-local-llms)
- [LAW: Legal Agentic Workflows paper — COLING 2025](https://aclanthology.org/2025.coling-industry.50.pdf)
- [CourtListener MCP server — DefendTheDisabled](https://github.com/DefendTheDisabled/courtlistener-mcp)
- [LlamaIndex chunking strategies — Medium](https://medium.com/@bavalpreetsinghh/llamaindex-chunking-strategies-for-large-language-models-part-1-ded1218cfd30)
