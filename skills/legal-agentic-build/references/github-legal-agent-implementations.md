# GitHub Legal AI Agent Implementations: Reference Guide

Technical deep-dive into open-source legal AI agent repositories, patterns, and architectures observed across GitHub as of March 2026.

---

## 1. LegalAnt (ishwarjha/legalant) — 18-Agent Claude Plugin

**Summary:** Most architecturally sophisticated legal agent system found. Built as a Claude Code plugin for Indian law. Hierarchical dispatch with model-tiered agents.

### Architecture

```
lexis (Claude Opus)          ← Entry point: classifies matter, routes
├── Specialist Agents (Opus)
│   ├── Document Review      ← 4-layer CONTRACT protocol
│   ├── Legal Research       ← indiankanoon.org, RBI, SEBI sources
│   ├── Redline Analysis     ← clause-by-clause comparison
│   ├── Translation          ← 200+ languages, Translator's Notes
│   └── MCA Documents        ← 10-category summary with RAG rating
├── Specialist Agents (Haiku) ← lightweight ops
│   ├── File Library         ← document indexing
│   ├── Chronology Builder   ← timeline creation
│   └── Document Table       ← bulk field extraction
└── Practice Orchestrators
    ├── In-house (Sonnet)    ← dual output: legal + plain-language
    ├── Transactions (Haiku) ← negotiation with negotiation.json state
    ├── Advisory (Sonnet)    ← maps applicable regulators first
    └── Due Diligence (Haiku)← splits docs into 4 parallel streams
```

### Key Patterns

**Model tiering by task complexity:**
- Opus: classification, research, document review (high-reasoning tasks)
- Sonnet: orchestration, advisory (medium complexity)
- Haiku: indexing, table extraction, timeline (speed-critical lightweight ops)

**Human-in-the-loop gates:** Every agent requires explicit `APPROVED` or `REVISE: [instructions]`. Hard stops for court filings and SEBI submissions—silence is never approval.

**Foundational skill composition:** Four cross-cutting rules loaded automatically:
1. CONTRACT analysis checklist
2. Modal verb auditing (SHALL/WILL/WOULD/MAY taxonomy)
3. Universal quality gates
4. Indian legal framework defaults

**State management:** Only the Transactions orchestrator persists state (`negotiation.json`). All other agents are stateless.

**Multi-regulator coverage:** RBI, SEBI, MCA, FEMA, IRDAI, DPDP Act — agent maps applicable regulators before research begins.

**No paid APIs required at baseline.** Web search for case law, HITL-assisted MCA lookups. Optional drop-ins: Indian Kanoon API, Finanvo MCA V3 via `.env`.

---

## 2. Is-It-Legal Agent (elinapohrebna/is-it-legall-agent) — LangGraph 6-Node Pipeline

**Summary:** Clean LangGraph implementation for jurisdiction-specific legal compliance Q&A. Sequential pipeline with shared state accumulation.

### Architecture

```python
# Shared state across all nodes
class ProcessState(TypedDict):
    query: str
    jurisdiction: str
    research_results: list
    legal_claims: list
    contradictions: list
    verdict: str
    compliance_steps: list

# Graph nodes (sequential)
graph = StateGraph(ProcessState)
graph.add_node("intent", IntentNode)          # validate + normalize jurisdiction
graph.add_node("researcher", ResearcherNode)   # Tavily web fetch
graph.add_node("extractor", ClaimExtractionNode)
graph.add_node("checker", ContradictionCheckerNode)  # OpenAI embeddings
graph.add_node("reasoner", ReasonerNode)
graph.add_node("checklist", ChecklisterNode)
graph.set_entry_point("intent")
graph.add_edge("intent", "researcher")
# ... sequential edges through to checklist
```

### Six Node Roles

1. **IntentNode** — validates input, normalizes country codes, extracts query intent
2. **ResearcherNode** — generates jurisdiction-specific search queries, fetches via Tavily API targeting official government sources
3. **ClaimExtractionNode** — pulls structured legal claims from research materials
4. **ContradictionCheckerNode** — semantic similarity via OpenAI embeddings to detect conflicting claims
5. **ReasonerNode** — final verdict with supporting evidence
6. **ChecklisterNode** — actionable compliance steps

### Key Patterns

- Jurisdiction normalization at entry point establishes context for all downstream nodes
- Incremental state accumulation: each node adds to shared state, downstream nodes build on upstream findings
- Contradiction detection as a dedicated node prevents confident-but-wrong outputs
- Tavily prioritizes official government sources for legal accuracy

---

## 3. LegalTrace (justinscott12/legaltrace) — LangGraph Lease Compliance with HITL Checkpoints

**Summary:** Production-pattern LangGraph system for Florida lease compliance. Demonstrates persistent checkpointing, human interrupts, and conditional re-analysis loops.

### Architecture

```python
# PostgresSaver enables persistent execution across restarts
from langgraph.checkpoint.postgres import PostgresSaver

class AuditState(TypedDict):
    lease_text: str
    statute_chunks: list
    compliance_scores: dict
    human_feedback: Optional[str]
    final_report: str

# Conditional edge: re-analyze if score below threshold
def route_after_scoring(state):
    if min(state["compliance_scores"].values()) < 0.7:
        return "re_analyze"
    return "human_review"

# Human interrupt node
def human_review(state):
    # Execution pauses here, waiting for explicit approval
    pass

graph.add_node("analyze", analyze_lease)
graph.add_node("retrieve_statutes", fetch_from_pgvector)
graph.add_node("score", score_compliance)
graph.add_node("human_review", human_review)  # interrupt point
graph.add_node("re_analyze", re_analyze_with_feedback)
graph.add_node("generate_report", generate_report)

graph.add_conditional_edges("score", route_after_scoring)
```

### Key Patterns

**Self-correction loop:** Compliance scores below 0.7 trigger re-analysis rather than proceeding—prevents low-confidence outputs from reaching users.

**MCP for statute retrieval:** Uses Model Context Protocol server for Florida statute queries, with `pgvector` for semantic search. Currently mock data; production requires full statute database.

**Persistent checkpointing via PostgresSaver:** Survives restarts, enables "long-running audits." Every state transition is logged, creating a complete audit trail.

**Multi-agent critique pattern:** Secondary validation agent checks analysis for hallucinations and inconsistencies before human review.

**UI transparency:** Real-time execution trace shows active nodes, tool calls, and decision points—critical for legal work where reasoning must be auditable.

---

## 4. crypto-reg-rag (Nudge-147/crypto-reg-rag) — Multi-Jurisdiction Crypto Regulation RAG

**Summary:** Well-engineered RAG system for comparing cryptocurrency regulations across 9 jurisdictions. No agent orchestration—pure RAG with jurisdiction-filtered retrieval. Best example of SAC (Summary-Augmented Chunking) for legal documents.

### Architecture

```
raw/
├── us/    # SEC, CFTC guidance PDFs
├── eu/    # MiCA regulation
├── sg/    # MAS Payment Services Act
├── hk/    # SFC crypto guidance
├── jp/    # FSA regulations
├── kr/    # FSCA guidance
├── uk/    # FCA crypto rules
├── ch/    # FINMA guidance
└── uae/   # VARA framework

indexes/
├── faiss.index    # Dense vector index (text-embedding-3-large)
└── meta.jsonl     # {jurisdiction, source, text, sac_summary}
```

### SAC Pipeline (Key Innovation)

Standard chunking loses regulatory context. SAC (Summary-Augmented Chunking) prepends a GPT-generated summary to each chunk before embedding:

```python
# 01_sac_pipeline.py pattern
for chunk in document_chunks:
    summary = llm.generate_summary(chunk)
    augmented = f"SUMMARY: {summary}\n\nCONTENT: {chunk}"
    embedding = embed(augmented)
    store(embedding, metadata={jurisdiction, source, text: chunk})
```

This significantly improves retrieval precision for regulatory text where key context (which regulation, which jurisdiction) appears in surrounding sections.

### Retrieval API

```python
# POST /query
{
  "query": "stablecoin reserve requirements",
  "jurisdictions": "sg,eu,uk"  # filter by jurisdiction codes
}

# Returns ranked chunks + synthesized answer with citations
```

### Benchmark Structure

Hand-curated test cases in `tests/manual/` with expected answers and source chunks. Measures retrieval precision and answer quality. Critical for legal use: synthetic benchmarks don't catch jurisdiction-specific edge cases.

### Crypto-Legal Coverage

While not implementing a Howey test classifier, the US jurisdiction data includes SEC guidance on token classification. Combining this with the filtering system enables comparative queries like:
- "How does the US securities framework compare to EU MiCA for utility tokens?"
- "What are reserve requirements for stablecoins in Singapore vs. UAE?"

---

## 5. Multi-AI-Agent-Tutorial (pavanbelagatti) — CrewAI + LlamaIndex Sequential Pattern

**Summary:** Financial analyst pattern, not legal-specific. Canonical reference for CrewAI + LlamaIndex integration. The Researcher→Writer pattern maps directly to legal Research→Drafting workflows.

### Core Pattern (Adaptable to Legal)

```python
from crewai import Agent, Task, Crew
from llama_index.tools.crewai import LlamaIndexTool

# LlamaIndex wraps document corpus as a CrewAI tool
query_engine = index.as_query_engine(llm=groq_llm)
query_tool = LlamaIndexTool.from_query_engine(
    query_engine,
    name="Legal Document Query",
    description="Query the regulatory corpus"
)

researcher = Agent(
    role="Legal Researcher",
    goal="Find relevant precedents and statutes",
    backstory="Expert at navigating legal databases",
    tools=[query_tool],
    llm=chat_llm,
)

drafter = Agent(
    role="Legal Writer",
    goal="Draft clear legal documents from research",
    backstory="Transforms research into actionable legal documents",
    llm=chat_llm,
)

research_task = Task(
    description="Research [legal question] in the document corpus",
    expected_output="Bullet-point analysis with citations",
    agent=researcher,
)

draft_task = Task(
    description="Draft memo based on research findings",
    expected_output="Professional legal memo",
    agent=drafter,
)

crew = Crew(agents=[researcher, drafter], tasks=[research_task, draft_task], verbose=2)
```

### Legal Adaptation Notes

Replace `query_tool` with:
- `courtlistener_search_cases_semantic` (MCP tool)
- Congress.gov API tool
- EDGAR EDGAR full-text search tool

The Researcher→Drafter pattern maps cleanly to:
- **Legal Research Agent** → scrapes CourtListener, finds precedents
- **Classifier Agent** → applies Howey test factors to findings
- **Drafter Agent** → produces legal opinion memo
- **Reviewer Agent** → checks citations, flags hedging needed

---

## 6. extrawest/multi_agent_workflow_demo_in_langgraph — Hierarchical LangGraph Patterns

**Summary:** Three canonical LangGraph orchestration patterns. Most relevant: hierarchical_agent_teams.py and agent_supervisor.py.

### Hierarchical Teams Pattern

```python
# Supervisor decides which team to route to
# Team supervisors decide which agent within team handles it

supervisor → [research_team, doc_team]
research_team_supervisor → [web_search_agent, scraper_agent]
doc_team_supervisor → [writer_agent, formatter_agent]
```

**Legal adaptation:** Replace research team with [case_law_agent, statute_agent, regulatory_agent], doc team with [drafter_agent, reviewer_agent].

### Agent Supervisor Pattern (Core LangGraph Idiom)

```python
from langgraph.graph import StateGraph, END
from typing import Annotated, Sequence, TypedDict
import operator

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str  # which agent to route to

def supervisor_node(state):
    # LLM decides which agent should act next
    response = llm.invoke(supervisor_prompt + str(state["messages"]))
    return {"next": response.next_agent}  # or END

graph = StateGraph(AgentState)
graph.add_node("supervisor", supervisor_node)
graph.add_node("researcher", researcher_node)
graph.add_node("drafter", drafter_node)

# Conditional routing from supervisor
graph.add_conditional_edges("supervisor", lambda s: s["next"], {
    "researcher": "researcher",
    "drafter": "drafter",
    END: END
})
graph.add_edge("researcher", "supervisor")  # return to supervisor
graph.add_edge("drafter", "supervisor")
```

---

## 7. crew-llamafile (heaversm) — Local CrewAI for Privacy-Sensitive Legal Work

**Summary:** CrewAI fully local via Mozilla Llamafile. No cloud API calls. Critical for legal work with privileged or confidential documents.

### Local Execution Pattern

```bash
# Download and run Llamafile model locally
./mistral-7b-instruct-v0.2.Q4_K_M.llamafile --server --nobrowser --port 8080

# CrewAI connects to local endpoint
```

```python
from langchain_community.llms import OpenAI

local_llm = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="not-needed",
    model="local-model"
)

researcher = Agent(
    role="Document Researcher",
    llm=local_llm,
    tools=[local_search_tool]
)
```

### Privacy Argument for Legal Use

- Attorney-client privilege requires no transmission of client communications to external servers
- Local execution eliminates cloud API logging of privileged matter details
- Consumer hardware (M1 Mac) sufficient for Mistral 7B or LLaVA models
- Tradeoff: smaller models mean lower reasoning quality vs. GPT-4/Claude Opus

### Recommended Models for Legal Work (Local)

- **Mistral 7B Instruct** — good general legal reasoning at consumer hardware
- **LLaVA** — multimodal, handles scanned PDFs via OCR
- **Llama 3.1 8B** — improved instruction following for structured outputs

---

## 8. lex-intelligentia-skills (fbmoulin) — Brazilian Legal Skills Ecosystem

**Summary:** 21 modular Claude skills covering the full Brazilian legal workflow. Best example of skill-based composition with automatic triggering.

### Architecture: Skills as Composable Modules

Each skill is a `SKILL.md` file with YAML frontmatter and detailed methodology. Skills activate automatically based on contextual keywords—no manual invocation.

### The Full Judicial Pipeline

```
peticao-analyzer (petition input)
    ↓
jurisprudencia-miner (precedent research, anti-hallucination protocol)
    ↓
tese-juridica-validator (argument validation against case law)
    ↓
checklist-saneamento (CPC Art. 357 compliance check)
    ↓
sentenca-judicial-br (FIRAC-JB sentence draft)
    ↓
relatorio-produtividade (CNJ metrics output)
```

### Automation Integration Layer

- **lex-rag-builder** — builds RAG pipeline for legal knowledge base
- **n8n-workflow-generator** — generates n8n automation workflows for legal processes
- **n8n-legal-config** — configures n8n nodes for legal pipelines
- **dje-monitor** — monitors official gazette for relevant publications

### Anti-Hallucination Protocol (jurisprudencia-miner)

Dedicated skill with explicit protocol: verifies citations exist before including them, cross-references multiple sources, flags low-confidence citations. Critical for legal work where hallucinated citations are a disqualifying failure mode.

---

## 9. CourtListener MCP Server (DefendTheDisabled/courtlistener-mcp)

**Summary:** Production-ready MCP server wrapping CourtListener's full API. 12 tools exposing 9M+ cases, semantic search, and citation verification. The right way to give legal agents case law access.

### 12 MCP Tools

**Search:**
- `courtlistener_search_cases_semantic` — natural language to vector search
- `courtlistener_search_cases_keyword` — Boolean/fielded queries
- `courtlistener_search_cases_hybrid` — semantic + required keywords
- `courtlistener_verify_citation` — prevents hallucinated citations

**Retrieval:**
- `courtlistener_get_case` — full metadata
- `courtlistener_get_opinion` — complete opinion text
- `courtlistener_get_docket` — filing history
- `courtlistener_get_citing_cases` — precedent tracking (is this still good law?)

**Research:**
- `courtlistener_search_judges` — judicial background research
- `courtlistener_search_oral_arguments`
- `courtlistener_list_courts`
- `courtlistener_get_court_info`

### Agent Research Workflow

```
1. courtlistener_search_cases_semantic("exchange of value, expectation of profit, common enterprise")
   → returns semantically related Howey test cases
2. courtlistener_search_cases_hybrid("investment contract", required="Howey")
   → narrows to cases applying Howey test
3. courtlistener_verify_citation("SEC v. W.J. Howey Co., 328 U.S. 293")
   → confirms citation is valid
4. courtlistener_get_citing_cases(case_id)
   → finds recent token classification cases citing Howey
5. courtlistener_get_opinion(case_id)
   → full text for analysis
```

**Rate limit:** 5,000 requests/hour. FastMCP 2.x with async httpx. STDIO transport for Claude Code integration.

---

## Common Implementation Patterns Across All Repos

### 1. Role Specialization Over Monolithic Agents

Every successful implementation splits by legal function:
- **Researcher** — fetches/retrieves from authoritative sources
- **Classifier/Analyzer** — applies legal framework (Howey factors, risk scoring)
- **Drafter** — generates document output
- **Reviewer** — checks quality, flags issues, validates citations
- **Router/Supervisor** — decides which specialist handles which input

### 2. Human-in-the-Loop at Decision Gates

All production-oriented repos treat HITL as mandatory for legal work:
- LegalAnt: explicit `APPROVED`/`REVISE` for every output
- LegalTrace: `human_review` node that pauses execution
- lex-intelligentia: mandatory disclaimer + qualified advocate review
- Pattern: automate research/drafting, require human approval before external communication or filing

### 3. Anti-Hallucination as First-Class Concern

Legal hallucinations (invented citations, wrong statutes) are disqualifying. Observed mitigations:
- Citation verification as dedicated step (CourtListener MCP, jurisprudencia-miner skill)
- Contradiction detection node (is-it-legall-agent)
- Self-correction loops triggered by confidence scores (LegalTrace)
- Explicit anti-hallucination protocols in skill SKILL.md files

### 4. State Schema Drives Architecture

LangGraph repos all share the pattern: define `TypedDict` state first, then build nodes around it. State accumulates incrementally — each node reads upstream data and adds its own. This replaces message-passing with shared context.

### 5. RAG for Legal Corpus Access

All repos doing document analysis use RAG:
- FAISS or pgvector for semantic similarity
- Jurisdiction-aware filtering in metadata
- SAC (Summary-Augmented Chunking) outperforms standard chunking for regulatory text
- Document-to-query embedding model must match (text-embedding-3-large common choice)

### 6. Model Tiering by Task

Pattern from LegalAnt (most explicit, but observed across others):
- Expensive Opus/GPT-4: classification, complex reasoning, document review
- Mid-tier Sonnet/GPT-4o: orchestration, drafting
- Fast Haiku/GPT-4o-mini: routing, indexing, extraction, table parsing

---

## Crypto-Legal Specific Patterns

### Howey Test Classification Architecture (Derived from Patterns)

No repo implements a complete Howey test classifier, but the components exist across repos:

```python
# Recommended architecture combining observed patterns:

class HoweyState(TypedDict):
    token_description: str
    research_results: list       # from CourtListener MCP
    howey_factors: dict          # investment of money, common enterprise, etc.
    factor_analysis: list
    classification: str          # security / not security / unclear
    confidence: float
    case_citations: list
    memo: str

# Factor analysis agent applies each Howey prong:
HOWEY_FACTORS = [
    "investment_of_money",          # Was there an investment of money?
    "common_enterprise",            # Was there a common enterprise?
    "expectation_of_profits",       # Was profit expected?
    "from_efforts_of_others",       # Do profits depend on promoter efforts?
]

# Researcher: search CourtListener for token classification cases
# Classifier: apply each factor with case law citations
# Reviewer: check for contrary authority, circuit splits
# Drafter: produce legal opinion memo with risk rating
```

### Multi-Jurisdiction Crypto Reg Pattern (from crypto-reg-rag)

For stablecoin/token compliance across jurisdictions:

```
User query: "Do I need a license to issue a stablecoin in Singapore?"

1. Jurisdiction normalization → "sg"
2. Semantic search FAISS index filtered to sg/* documents
3. Retrieve MAS Payment Services Act chunks (SAC-augmented)
4. Cross-reference with EU MiCA if EU expansion planned
5. Synthesize with jurisdiction-specific citations
6. Generate compliance checklist
```

**Data sources by jurisdiction:**
- US: SEC guidance PDFs, CFTC advisories, FinCEN BSA rules
- EU: MiCA regulation text, EBA guidance
- SG: MAS Payment Services Act, MAS digital payment token framework
- HK: SFC licensing requirements
- UAE: VARA regulatory framework

---

## Recommended Starting Points

### For a Solo Founder Building a Legal Agent

**Fastest path to working prototype:**
1. Start with CrewAI + LlamaIndex pattern (pavanbelagatti notebook)
2. Replace financial data with legal PDFs (SEC guidance, relevant statutes)
3. Add CourtListener MCP for case law access
4. Four agents: Researcher → Classifier → Drafter → Reviewer

**For crypto/securities compliance specifically:**
1. Use crypto-reg-rag as the data layer (fork the SAC pipeline for your jurisdiction set)
2. Add Howey factor analysis as a dedicated Classifier agent
3. Use CourtListener MCP for precedent research
4. Use LangGraph with human_review checkpoint before any client output

**For local/private deployment (attorney-client privilege):**
1. Use crew-llamafile pattern with Mistral 7B or Llama 3.1 8B
2. No cloud API calls — all reasoning stays local
3. Acceptable for research/drafting; upgrade to cloud models for final review

**For a production multi-agent system:**
1. LegalAnt architecture for model tiering and routing
2. LangGraph StateGraph with PostgresSaver for persistent checkpoints
3. Mandatory HITL gates before court filings or external communications
4. Anti-hallucination: citation verification as dedicated step

### Tech Stack Recommendation

```
Orchestration:    LangGraph (for complex stateful workflows) or CrewAI (simpler sequential)
LLM:              Claude Opus 4 (routing, analysis) + Haiku (extraction, indexing)
Case Law:         CourtListener MCP (courtlistener-mcp)
Regulatory Docs:  FAISS with SAC chunking (crypto-reg-rag pattern)
Local Option:     Llamafile + CrewAI (crew-llamafile pattern)
State Persistence: PostgresSaver (LangGraph) or negotiation.json (simple JSON for session state)
Framework:        FastAPI backend, pgvector for semantic search
```

---

*Research conducted March 2026. Repos verified as public and accessible at time of research.*
