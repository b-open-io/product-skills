# Agentic Legal Tech Stack

Our stack for building legal agents: Vercel AI SDK for individual agent logic and tool calling, CrewAI for multi-agent orchestration, deployed on Vercel (API routes + streaming) or Railway (long-running jobs).

---

## Section 1: Vercel AI SDK for Legal Agents

**Docs:** https://sdk.vercel.ai/docs

The Vercel AI SDK handles single-agent workflows: tool calling, structured output, streaming, and agent chaining. Use `generateText` with tools for research agents, `generateObject` with Zod schemas for structured legal analysis.

### Tool Calling for Legal Data Sources

Define a tool for each legal data source the agent can access. The SDK handles the tool call loop automatically.

```typescript
import { generateText, tool } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'

const courtListenerTool = tool({
  description: 'Search CourtListener for relevant case law and SEC enforcement opinions',
  parameters: z.object({
    query: z.string().describe('Search query, e.g. "Howey test token offering"'),
    court: z.string().optional().describe('Filter by court, e.g. "scotus", "ca9"'),
  }),
  execute: async ({ query, court }) => {
    const params = new URLSearchParams({ q: query, type: 'o', order_by: 'score desc' })
    if (court) params.set('court', court)
    const resp = await fetch(`https://www.courtlistener.com/api/rest/v4/search/?${params}`, {
      headers: { Authorization: `Token ${process.env.COURTLISTENER_TOKEN}` },
    })
    const data = await resp.json()
    return data.results.slice(0, 10)
  },
})

const result = await generateText({
  model: anthropic('claude-opus-4-6'),
  tools: { courtListener: courtListenerTool },
  maxSteps: 5, // allow multi-turn tool use
  prompt: 'Research SEC enforcement actions relevant to governance token structures.',
})
```

### Structured Output with Zod Schemas

Use `generateObject` whenever the downstream system needs machine-readable output — compliance reports, risk scores, gap analyses.

```typescript
import { generateObject } from 'ai'
import { z } from 'zod'

const HoweyAnalysisSchema = z.object({
  prong1InvestmentOfMoney: z.number().min(0).max(1).describe('Confidence score 0-1'),
  prong2CommonEnterprise: z.number().min(0).max(1),
  prong3ExpectationOfProfit: z.number().min(0).max(1),
  prong4EffortsOfOthers: z.number().min(0).max(1),
  overallSecurityRisk: z.number().min(0).max(1),
  keyEvidence: z.array(z.string()).describe('Quoted language from the offering document'),
  comparableCases: z.array(z.string()).describe('Citation strings from case law'),
  recommendation: z.enum(['likely_security', 'likely_not', 'ambiguous']),
  recommendedExemption: z.string().nullable().describe('e.g. Reg D 506(c), utility argument'),
})

const { object } = await generateObject({
  model: anthropic('claude-opus-4-6'),
  schema: HoweyAnalysisSchema,
  prompt: `Apply the four-prong Howey test to this token offering document: ${offeringText}`,
})
// object is typed as z.infer<typeof HoweyAnalysisSchema>
```

### Streaming for Long Legal Analysis

Stream responses for document review workflows where the user is waiting. Use `streamText` for attorney-facing interfaces.

```typescript
import { streamText } from 'ai'

const { textStream } = await streamText({
  model: anthropic('claude-sonnet-4-6'),
  tools: { courtListener: courtListenerTool, edgar: edgarTool },
  maxSteps: 8,
  prompt: `Review this SAFT agreement for securities law compliance: ${saftText}`,
})

for await (const chunk of textStream) {
  process.stdout.write(chunk)
}
```

### Chaining Agents (Research → Classify → Draft)

Pass structured output from one agent as the prompt input to the next. This is the Vercel AI SDK equivalent of CrewAI's `context` parameter.

```typescript
// Step 1: Research agent gathers precedent
const { object: research } = await generateObject({
  model: anthropic('claude-sonnet-4-6'),
  schema: ResearchFindingsSchema,
  tools: { courtListener: courtListenerTool, congress: congressTool },
  maxSteps: 6,
  prompt: `Find SEC enforcement actions and case law relevant to: ${tokenDescription}`,
})

// Step 2: Classifier uses research output
const { object: analysis } = await generateObject({
  model: anthropic('claude-opus-4-6'),
  schema: HoweyAnalysisSchema,
  prompt: `Apply the Howey test to this token. Research findings: ${JSON.stringify(research)}
           Token description: ${tokenDescription}`,
})

// Step 3: Drafter uses both upstream outputs
const { text: memo } = await generateText({
  model: anthropic('claude-sonnet-4-6'),
  prompt: `Draft a compliance memo for a non-lawyer founder.
           Token: ${tokenDescription}
           Howey analysis: ${JSON.stringify(analysis)}
           Supporting research: ${JSON.stringify(research)}`,
})
```

---

## Section 2: CrewAI for Legal Multi-Agent Systems

**Docs:** https://docs.crewai.com

Use CrewAI when coordinating multiple specialized agents with different roles, tools, and areas of expertise. CrewAI's role/goal/backstory pattern is well-suited to legal team simulation.

### Defining Legal Agent Roles

```python
from crewai import Agent, Task, Crew, Process
from pydantic import BaseModel

researcher = Agent(
    role="Legal Research Specialist",
    goal="Find relevant case law, SEC enforcement actions, and legislative history",
    backstory="Securities attorney with 10 years at the SEC enforcement division",
    tools=[courtlistener_tool, edgar_tool, congress_tool],
    verbose=True,
)

classifier = Agent(
    role="Howey Test Analyst",
    goal="Apply the four-prong Howey test to token structures and produce risk scores",
    backstory="Former SEC enforcement analyst with deep token classification experience",
    tools=[search_tool],
    verbose=True,
)

drafter = Agent(
    role="Legal Memo Writer",
    goal="Produce clear, actionable compliance memos for non-lawyer founders",
    backstory="Experienced at translating complex securities law for technical founders",
    verbose=True,
)

reviewer = Agent(
    role="Senior Compliance Reviewer",
    goal="Quality-check all analysis for accuracy, completeness, and defensibility",
    backstory="General counsel with experience in crypto regulatory matters",
    verbose=True,
)
```

### Process Types: Sequential vs Hierarchical

**Use `Process.sequential`** for linear pipelines where each step feeds into the next:

```python
crew = Crew(
    agents=[researcher, classifier, drafter],
    tasks=[research_task, classify_task, draft_task],
    process=Process.sequential,
)
```

**Use `Process.hierarchical`** for legal work — a manager agent routes to specialists based on the incoming task. The manager decides which agents handle which sub-tasks, which mirrors how a supervising attorney delegates work.

```python
manager = Agent(
    role="Legal Team Manager",
    goal="Route tasks to the right specialist and ensure quality output",
    backstory="Managing partner who oversees research, analysis, and drafting teams",
    verbose=True,
    allow_delegation=True,
)

crew = Crew(
    agents=[researcher, classifier, drafter, reviewer],
    tasks=[compliance_task],  # high-level task; manager decomposes it
    process=Process.hierarchical,
    manager_agent=manager,
)
```

### Task Chaining with Context

Wire tasks together using `context` — upstream task output flows as context into downstream tasks automatically:

```python
research_task = Task(
    description="Research SEC enforcement actions and case law for {token_name}",
    agent=researcher,
    output_pydantic=ResearchFindings,
)

classify_task = Task(
    description="Apply Howey test to token structure based on research findings",
    agent=classifier,
    context=[research_task],  # research output injected here
    output_pydantic=HoweyAnalysis,
)

draft_task = Task(
    description="Draft compliance memo with specific risk mitigation steps",
    agent=drafter,
    context=[research_task, classify_task],  # both upstream outputs available
    output_file="compliance_memo.md",
)

result = crew.kickoff(inputs={"token_name": "ACME Governance Token"})
```

### Integrating CrewAI with Vercel AI SDK via LiteLLM

CrewAI uses LiteLLM under the hood, which proxies to any OpenAI-compatible endpoint. To use Claude models:

```python
import os
os.environ["ANTHROPIC_API_KEY"] = "sk-ant-..."

researcher = Agent(
    role="Legal Research Specialist",
    llm="claude-sonnet-4-6",   # LiteLLM resolves this to Anthropic API
    tools=[courtlistener_tool],
    # ...
)
```

For hybrid architectures where the Vercel AI SDK handles the API layer and CrewAI handles orchestration: expose a Vercel Function that wraps `generateText` or `generateObject`, then call it as an HTTP tool from a CrewAI agent. This keeps streaming and structured output at the Vercel layer while CrewAI manages multi-agent coordination.

---

## Section 3: Crypto-Legal Agent Implementations

### 1. Howey Test Classifier

**Data sources:** CourtListener (SEC enforcement opinions), EDGAR EFTS (S-1 filings with comparable offerings), internal knowledge base seeded with SEC no-action letters.

**Zod output schema (Vercel AI SDK):**
```typescript
const HoweyAnalysisSchema = z.object({
  prong1InvestmentOfMoney: z.number().min(0).max(1),
  prong2CommonEnterprise: z.number().min(0).max(1),
  prong3ExpectationOfProfit: z.number().min(0).max(1),
  prong4EffortsOfOthers: z.number().min(0).max(1),
  overallSecurityRisk: z.number().min(0).max(1),
  keyEvidence: z.array(z.string()),
  comparableCases: z.array(z.string()),
  recommendation: z.enum(['likely_security', 'likely_not', 'ambiguous']),
  recommendedExemption: z.string().nullable(),
})
```

**Analysis steps:**
1. Parse offering document to structured markdown
2. Extract: token sale mechanics, profit expectation language, decentralization claims, utility use cases, lock-up terms, issuer promises
3. Research: query CourtListener for each of the four Howey prongs
4. Classify: apply prong analysis, produce confidence scores
5. Output: risk score + flagged language + recommended exemption strategy

**Key cases to seed the knowledge base:** SEC v. W.J. Howey Co. (1946), SEC v. Ripple Labs (2023), SEC v. Terraform Labs (2024), SEC v. LBRY (2022), SEC FinHub Digital Asset Framework.

### 2. GENIUS Act Stablecoin Compliance Monitor

**Data sources:** Enacted GENIUS Act text (Congress.gov S.1582), GENIUS Act compliance checklist (Hacken), issuer-submitted stablecoin design documents.

**Pydantic output schema (CrewAI):**
```python
from pydantic import BaseModel
from typing import Literal

class GeniusActGap(BaseModel):
    requirement: str              # "1:1 Reserve Requirement"
    statutory_citation: str       # "GENIUS Act § 4(a)"
    status: Literal["compliant", "gap", "unclear"]
    evidence_from_doc: str        # quoted text from stablecoin whitepaper
    remediation_needed: str | None

class GeniusActReport(BaseModel):
    overall_status: Literal["compliant", "gaps_found", "non_compliant"]
    gaps: list[GeniusActGap]
    critical_gaps: int
    summary: str
```

**Requirements checked:** 1:1 reserve (permitted assets), monthly attestation + CEO/CFO certification, AML/KYC (CIP program, OFAC SDN screening, FATF Travel Rule at $3k threshold), NIST CSF 2.0 cybersecurity documentation, independent smart contract audit, public redemption policy.

### 3. Digital Asset Bill Tracker

**Data sources:** Congress.gov API v3, keyword filtering client-side (no native crypto filter in the API).

**Analysis steps:**
1. Poll `https://api.congress.gov/v3/bill/{congress}/{type}` daily
2. Filter bills by title/policyArea keywords: `digital asset`, `stablecoin`, `cryptocurrency`, `token`, `blockchain`, `decentralized finance`
3. Score 0–10 for crypto startup impact severity
4. Route: high-impact (score ≥ 7) → immediate alert; low-impact → weekly digest

**Active bills to seed the tracker:** S.1582 GENIUS Act (enacted July 2025), H.R.3633 CLARITY Act (House-passed June 2025), Senate Agriculture Committee discussion draft (November 2025).

### 4. DAO Liability Analyzer

**Data sources:** CFTC v. Ooki DAO (2023) filings via CourtListener, Wyoming DAO LLC Act text via GovInfo, Marshall Islands DAO Act, IRS Notice 2023-27.

**Analysis dimensions:**
1. Entity type: Unincorporated association vs. LLC vs. foundation (Wyoming DAO LLC Act, Marshall Islands DAO Act, Delaware LLC)
2. Control concentration: Do token holders have meaningful governance? Bona Fide DAO test
3. CFTC commodity pool: Does DAO treasury management qualify as a pooled investment vehicle?
4. Tax classification: Partnership vs. corporation for token distributions (IRS Notice 2023-27)
5. Jurisdiction: Developer locations, user concentration, governing law analysis

**Output:** Risk matrix with jurisdiction-specific recommendations and recommended formation structure options.

---

## Section 4: Data Source Integration

### CourtListener REST API v4

**Base URL:** `https://www.courtlistener.com/api/rest/v4/`
**Auth:** `Authorization: Token <your-token>`
**Rate limit:** 5,000 requests/hour authenticated
**Docs:** https://www.courtlistener.com/help/api/rest/

Key endpoints:
```
GET /search/?q={query}&type=o    # Opinion search (case law)
GET /search/?q={query}&type=d    # Docket search
GET /opinions/{id}/              # Specific opinion text
GET /clusters/{id}/              # Opinion cluster with citations
```

Semantic search (added late 2025): natural language queries using vector embeddings — use for "find cases like this token offering structure."

MCP integration: the `DefendTheDisabled/courtlistener-mcp` server on GitHub enables direct Claude agent access without custom API code. Drop into any MCP-aware setup.

### Congress.gov API v3

**Base URL:** `https://api.congress.gov/v3/`
**Auth:** API key from api.data.gov — append `?api_key={key}` to requests
**Coverage:** Bills, amendments, committee reports, CRS reports, member votes, hearings
**Docs:** https://api.congress.gov/

Digital assets tracking:
```
GET /bill/119/s/1582    # GENIUS Act
GET /bill/119/hr/3633   # CLARITY Act
```

No built-in crypto/digital assets filter. Filter client-side by keywords in `title` and `policyArea` after retrieval.

### EDGAR EFTS (Full Text Search)

**Base URL:** `https://efts.sec.gov/LATEST/search-index`
**Auth:** None required; `User-Agent` header required per SEC policy
**Coverage:** All electronically filed documents since 2001
**Docs:** https://www.sec.gov/edgar/search/efts-faq.html

Supports Boolean operators (`AND`, `OR`, `NOT`), exact phrase with `"quotes"`, wildcard `*`. No natural language — use Boolean/phrase queries.

```typescript
const resp = await fetch('https://efts.sec.gov/LATEST/search-index?' + new URLSearchParams({
  q: '"investment contract" "digital token"',
  forms: 'S-1,10-K',
  dateRange: 'custom',
  startdt: '2020-01-01',
}), {
  headers: { 'User-Agent': 'LegalAgent/1.0 contact@yourcompany.com' },
})
```

### GovInfo MCP

**Package:** `@modelcontextprotocol/server-govinfo` (or community equivalent)
**Coverage:** Federal Register, CFR, Congressional Record, U.S. Code
**Auth:** API key from api.data.gov
**API docs:** https://api.govinfo.gov/docs

Drop-in MCP server for GovInfo — connects Claude Code SDK agents directly to federal statutes and regulations without custom API code. Useful for loading GENIUS Act text, Title 31 CFR (BSA), and FinCEN guidance into agent context.

FinCEN note: no formal API exists for FinCEN guidance. Download key guidance PDFs (FIN-2019-G001, FIN-2013-G001) and index them in a vector store for RAG retrieval. GovInfo covers only Federal Register-published guidance.

### FinCEN / BSA Compliance References

FinCEN MSB registration rules, AML requirements, and Travel Rule guidance:

- **MSB Registration:** FinCEN Form 107, required within 180 days of commencing operations — https://www.fincen.gov/resources/money-services-business-msb-registration
- **AML Program Requirements:** 31 CFR § 1022.210 (money services businesses)
- **Travel Rule threshold:** $3,000 for crypto (FATF-aligned)
- **OFAC SDN screening:** Required for all transaction counterparties — https://sanctionssearch.ofac.treas.gov/
- **FIN-2019-G001:** FinCEN guidance on convertible virtual currency (CVC) and the BSA

---

## Section 5: Deployment on Vercel and Railway

### Vercel for API Routes and Streaming

Deploy legal agent logic as Vercel Functions. Use Edge Runtime for low-latency streaming; Node.js Runtime for CrewAI subprocess calls and anything that requires full Node.js APIs.

```typescript
// app/api/howey-classify/route.ts
import { streamObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { HoweyAnalysisSchema } from '@/lib/schemas'

export const runtime = 'nodejs' // Edge doesn't support subprocess calls

export async function POST(req: Request) {
  const { offeringText } = await req.json()

  const result = streamObject({
    model: anthropic('claude-opus-4-6'),
    schema: HoweyAnalysisSchema,
    prompt: `Apply the four-prong Howey test to this token offering: ${offeringText}`,
  })

  return result.toTextStreamResponse()
}
```

Vercel Function timeout defaults to 10s (Hobby) or 60s (Pro). For longer legal analysis jobs, upgrade to Pro or route to Railway.

### Railway for Long-Running CrewAI Jobs

Railway suits background processing where Vercel's timeout limits are a constraint: multi-agent CrewAI crews, daily Congress.gov polling, large document batch processing.

Deployment pattern:
1. Expose a Railway service with a FastAPI or Hono HTTP endpoint
2. Vercel API route enqueues the job (POST to Railway) and returns a job ID immediately
3. Client polls a `/status/{jobId}` endpoint or receives a webhook on completion
4. Railway runs the CrewAI crew, writes results to shared DB (Supabase, Convex, or Postgres on Railway)

```typescript
// Vercel API route — enqueue
export async function POST(req: Request) {
  const { tokenDescription } = await req.json()
  const resp = await fetch(`${process.env.RAILWAY_SERVICE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.RAILWAY_SECRET}` },
    body: JSON.stringify({ tokenDescription }),
  })
  const { jobId } = await resp.json()
  return Response.json({ jobId })
}
```

### Environment Variables

Manage secrets in Vercel dashboard (project → Settings → Environment Variables) and Railway dashboard (service → Variables).

Required keys for legal agents:

| Variable | Used By | Where to Get |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel AI SDK, CrewAI (via LiteLLM) | console.anthropic.com |
| `COURTLISTENER_TOKEN` | CourtListener API v4 | courtlistener.com/profile/tokens/ |
| `CONGRESS_API_KEY` | Congress.gov API v3 | api.data.gov/signup |
| `GOVINFO_API_KEY` | GovInfo API | api.data.gov/signup |
| `EDGAR_USER_AGENT` | EDGAR EFTS (required header) | any contact email |
| `RAILWAY_SECRET` | Vercel → Railway auth | set manually, match both sides |

### When to Use Vercel vs Railway

| Scenario | Use |
|---|---|
| Howey classifier returning JSON in < 30s | Vercel Function (Node.js runtime) |
| Streaming legal analysis to UI | Vercel Function (Edge or Node.js) |
| Multi-agent CrewAI crew (60s–5min) | Railway background service |
| Daily Congress.gov bill tracker (cron) | Railway cron job |
| Large document batch processing | Railway (no timeout limit) |
| Real-time compliance check during user session | Vercel (lower latency) |

---

## Sources

- [Vercel AI SDK docs](https://sdk.vercel.ai/docs)
- [Vercel AI SDK — generateObject](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object)
- [Vercel AI SDK — streamText](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text)
- [CrewAI docs](https://docs.crewai.com)
- [CrewAI — Process types](https://docs.crewai.com/concepts/processes)
- [LiteLLM — Anthropic provider](https://docs.litellm.ai/docs/providers/anthropic)
- [CourtListener REST API v4](https://www.courtlistener.com/help/api/rest/)
- [CourtListener MCP server — DefendTheDisabled](https://github.com/DefendTheDisabled/courtlistener-mcp)
- [Congress.gov API documentation](https://api.congress.gov/)
- [EDGAR Full Text Search FAQ](https://www.sec.gov/edgar/search/efts-faq.html)
- [GovInfo API docs](https://api.govinfo.gov/docs)
- [GENIUS Act stablecoin compliance checklist — Hacken](https://hacken.io/discover/genius-act-security-compliance-checklist/)
- [FinCEN MSB registration](https://www.fincen.gov/resources/money-services-business-msb-registration)
- [Railway docs](https://docs.railway.app)
- [Vercel Functions docs](https://vercel.com/docs/functions)
