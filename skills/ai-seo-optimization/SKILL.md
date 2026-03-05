---
name: ai-seo-optimization
description: "This skill should be used when the user asks to audit a website for SEO, improve search rankings, optimize content for AI search (ChatGPT, Perplexity, Google AI Overviews), implement schema markup, build entity recognition, analyze keyword opportunities, improve E-E-A-T signals, create an SEO strategy, or when they mention 'SEO', 'search optimization', 'rankings', 'schema', 'structured data', 'AI search', 'featured snippets', or 'knowledge graph'. Provides modern SEO workflows for the AI-powered search era including entity-based optimization, multi-platform visibility (Google, ChatGPT, Perplexity, Gemini), and technical SEO for 2025."
version: 0.1.0
---

# AI SEO Optimization Skill

Modern SEO for the AI-powered search era. Covers entity-based optimization, AI citation building, multi-platform visibility, E-E-A-T implementation, and technical SEO for 2025 and beyond.

## AI SEO Audit Process

Run this sequence for any SEO analysis task:

1. **Entity Analysis** — Check brand recognition across AI platforms (Google Knowledge Graph, Wikidata, Wikipedia)
2. **Content Structure** — Assess AI-readability: clear headings, tables, FAQs, direct answers at top
3. **Schema Coverage** — Audit structured data completeness (Organization, Article, FAQ, HowTo, Product)
4. **Citation Tracking** — Check visibility in AI responses (Google AI Overviews, ChatGPT, Perplexity)
5. **Technical Health** — Core Web Vitals, mobile-first, robots.txt, XML sitemaps

## Entity-Based SEO

**Brand Entity Building:**
- Establish unique, consistent brand name and description across all platforms
- Create and verify Wikipedia/Wikidata entries where notability exists
- Build social profile network (Twitter/X, LinkedIn, GitHub, Crunchbase) with consistent brand data
- Implement `sameAs` schema markup linking all brand entity sources

**Schema Priority Order:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "name": "...", "sameAs": ["..."] },
    { "@type": "WebSite", "publisher": {"@id": "#organization"} },
    { "@type": "Article", "author": {"@type": "Person"}, "dateModified": "2025-01-01" }
  ]
}
```

## AI Citation Optimization

Content structure for AI platforms to cite:

1. **Quick Answer at top** — Direct 2-3 sentence response to the main question before any detail
2. **Structured sections** — Clear H2/H3 hierarchy with descriptive headings
3. **Data tables** — Comparisons and specifications in table format (AI systems love to pull these)
4. **FAQ sections** — Q&A format at the bottom of long-form content
5. **Authoritative sources** — External citations, author credentials, publication dates

**Platform-Specific Requirements:**

| Platform | Key Factor | Optimization |
|---------|-----------|-------------|
| Google AI Overviews | Featured snippet presence | Direct answer + FAQ schema |
| ChatGPT | Training data coverage + recency | Authoritative content + consistent publishing |
| Perplexity | Source credibility + freshness | High-quality external links + recent dates |
| Gemini | Technical accuracy + depth | Expert author bios + citations |
| Bing Chat | Microsoft ecosystem | Bing Webmaster Tools + IndexNow |

## Content Optimization Workflow

1. **Query Analysis** — Identify natural language and long-tail variations of the target topic
2. **Topic Clustering** — Map all subtopics and create comprehensive coverage across linked pages
3. **Internal Linking** — Build semantic relationships between related content
4. **Format Variety** — Use tables, numbered lists, Q&As, and comparison charts (all AI-parseable formats)
5. **Human Voice** — Add first-person experience, original data, and brand-specific perspective

## E-E-A-T Implementation

**Experience:** Demonstrate first-hand knowledge — case studies, original research, specific examples from actual use

**Expertise:** Author credentials in bio, bylines on all content, topic specialization signals

**Authoritativeness:** Industry citations, press mentions, guest contributions to authority publications

**Trustworthiness:** Transparent sourcing, fact-checking processes, clear contact information, privacy policy

**Notability:** Brand mentions across independent sources, recognition from authorities in the field

## Technical SEO

**Core Web Vitals targets:**
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

**Crawl and index health:**
- XML sitemap with priority and lastmod signals
- robots.txt with explicit AI crawler rules (note: blocking AI crawlers affects training inclusion)
- Canonical tags to prevent duplicate content
- Hreflang for international sites

**AI Crawler Management (robots.txt):**
```
# Allow all crawlers including AI
User-agent: *
Allow: /

# Or selectively block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /
```

## Key AI SEO Metrics

| Metric | What It Measures |
|--------|-----------------|
| Citation Share | % of AI responses mentioning brand for target queries |
| Entity Score | Knowledge graph completeness (Wikidata + schema coverage) |
| AI Visibility Index | Cross-platform presence in AI-generated responses |
| Query Coverage | % of natural language query variants ranking |
| Featured Snippet Share | % of target queries where content appears in featured snippet |

## Reference Files

For detailed implementation guidance, consult:
- **Invoke `Skill(marketing-skills:seo-audit)`** for full SEO audit workflow
- **Invoke `Skill(marketing-skills:schema-markup)`** for structured data implementation
- **Invoke `Skill(marketing-skills:programmatic-seo)`** for programmatic SEO strategies
