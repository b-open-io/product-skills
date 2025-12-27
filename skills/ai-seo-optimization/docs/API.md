# AI SEO Optimization API Documentation

## Table of Contents
- [Core Classes](#core-classes)
- [Optimizers](#optimizers)
- [Analyzers](#analyzers)
- [Monitors](#monitors)
- [Utilities](#utilities)
- [Types and Interfaces](#types-and-interfaces)

## Core Classes

### AIOptimizer

The main orchestrator class that coordinates all optimization components.

#### Constructor
```typescript
new AIOptimizer(config: AIOptimizerConfig)
```

#### Methods

##### analyzeContent
```typescript
async analyzeContent(html: string, url: string): Promise<ContentAnalysis>
```
Analyzes content for AI SEO optimization opportunities.

**Parameters:**
- `html`: The HTML content to analyze
- `url`: The URL of the content

**Returns:** `ContentAnalysis` object containing scores and recommendations

##### optimizeContent
```typescript
async optimizeContent(html: string, analysis: ContentAnalysis): Promise<string>
```
Applies AI SEO optimizations to content based on analysis.

**Parameters:**
- `html`: The HTML content to optimize
- `analysis`: The analysis results from `analyzeContent`

**Returns:** Optimized HTML string

##### trackKPIs
```typescript
async trackKPIs(url: string): Promise<KPIMetrics>
```
Tracks KPI metrics across AI platforms.

**Parameters:**
- `url`: The URL to track

**Returns:** `KPIMetrics` object with current metrics and trends

##### monitorPlatforms
```typescript
async monitorPlatforms(url: string, queries: string[]): Promise<MultiPlatformOptimization[]>
```
Monitors content performance across multiple AI platforms.

**Parameters:**
- `url`: The URL to monitor
- `queries`: Array of search queries to track

**Returns:** Array of platform-specific optimization data

## Optimizers

### EntityOptimizer

Handles entity extraction, enhancement, and schema generation.

#### Constructor
```typescript
new EntityOptimizer(config: AIOptimizerConfig)
```

#### Methods

##### analyzeEntities
```typescript
async analyzeEntities(html: string): Promise<{ score: number; entities: any[] }>
```
Analyzes existing entities in content.

##### enhanceEntities
```typescript
async enhanceEntities(html: string): Promise<string>
```
Enhances content with entity optimization and schema markup.

##### generateComprehensiveSchema
```typescript
async generateComprehensiveSchema(html: string): Promise<SchemaMarkup[]>
```
Generates comprehensive schema markup for the content.

### ContentStructurer

Formats content for optimal AI parsing.

#### Methods

##### analyzeStructure
```typescript
async analyzeStructure(html: string): Promise<{ score: number; structure: ContentStructure }>
```
Analyzes content structure for AI readability.

##### restructureContent
```typescript
async restructureContent(html: string): Promise<string>
```
Restructures content for better AI parsing.

### EEATSignalBuilder

Builds and enhances E-E-A-T signals.

#### Methods

##### analyzeEEATSignals
```typescript
async analyzeEEATSignals(html: string): Promise<EEATAnalysis>
```
Analyzes existing E-E-A-T signals in content.

##### enhanceEEATSignals
```typescript
async enhanceEEATSignals(html: string): Promise<string>
```
Enhances content with E-E-A-T signals.

##### createAuthorBio
```typescript
async createAuthorBio(
  authorName: string,
  expertise: string[],
  credentials: string[]
): Promise<AuthorBio>
```
Creates comprehensive author bio with schema.

### AIContentBalancer

Ensures authentic human-AI content blend.

#### Methods

##### analyzeBalance
```typescript
async analyzeBalance(html: string): Promise<{ ratio: number; balance: AIContentBalance }>
```
Analyzes the balance between AI and human-written content.

##### rebalanceContent
```typescript
async rebalanceContent(html: string): Promise<string>
```
Rebalances content to achieve better human-AI mix.

## Analyzers

### AICitationAnalyzer

Analyzes how content appears in AI responses.

#### Constructor
```typescript
new AICitationAnalyzer(config: AIOptimizerConfig)
```

#### Methods

##### analyzeCitationPotential
```typescript
async analyzeCitationPotential(html: string): Promise<{ score: number; analysis: CitationAnalysis }>
```
Analyzes citation potential of content.

##### checkAICitations
```typescript
async checkAICitations(url: string, queries: string[]): Promise<AICitation[]>
```
Checks how content appears in AI responses across platforms.

##### monitorCitationTrends
```typescript
async monitorCitationTrends(url: string): Promise<any>
```
Monitors citation trends over time.

### MultiPlatformAnalyzer

Analyzes performance across different AI platforms.

#### Constructor
```typescript
new MultiPlatformAnalyzer(config: AIOptimizerConfig)
```

#### Methods

##### analyzeAcrossPlatforms
```typescript
async analyzeAcrossPlatforms(
  url: string,
  queries: string[]
): Promise<MultiPlatformOptimization[]>
```
Analyzes content across multiple AI platforms.

##### getPlatformOptimizations
```typescript
async getPlatformOptimizations(
  platform: string,
  currentContent: string
): Promise<any>
```
Gets platform-specific optimization recommendations.

##### trackPlatformVisibility
```typescript
async trackPlatformVisibility(url: string): Promise<Record<string, PlatformVisibility>>
```
Tracks visibility metrics across platforms.

### KPITracker

Tracks new SEO KPIs including citation share and brand mentions.

#### Constructor
```typescript
new KPITracker(config: AIOptimizerConfig)
```

#### Methods

##### trackMetrics
```typescript
async trackMetrics(url: string): Promise<KPIMetrics>
```
Tracks all KPI metrics for a URL.

##### getBenchmarkComparison
```typescript
async getBenchmarkComparison(metrics: KPIMetrics): Promise<any>
```
Compares metrics against industry benchmarks.

##### exportMetrics
```typescript
async exportMetrics(url: string, format: 'json' | 'csv'): Promise<string>
```
Exports metrics for reporting.

## Monitors

### FreshnessMonitor

Tracks content freshness and suggests updates.

#### Methods

##### checkFreshness
```typescript
async checkFreshness(html: string, url: string): Promise<FreshnessScore>
```
Checks content freshness against competitors.

##### suggestUpdates
```typescript
async suggestUpdates(html: string, url: string): Promise<any>
```
Suggests specific content updates.

##### setupFreshnessAlerts
```typescript
async setupFreshnessAlerts(urls: string[], notificationEmail?: string): Promise<void>
```
Sets up automated freshness alerts.

### ContentUpdateSuggester

Provides specific content update recommendations.

#### Methods

##### generateUpdateSuggestions
```typescript
async generateUpdateSuggestions(html: string, metrics: any): Promise<any>
```
Generates comprehensive update suggestions.

##### monitorUpdateOpportunities
```typescript
async monitorUpdateOpportunities(urls: string[]): Promise<any[]>
```
Monitors content for update opportunities.

## Utilities

### AIDetector

Detects AI-generated content.

#### Methods

##### detectAIContent
```typescript
async detectAIContent(text: string): Promise<{
  isAIGenerated: boolean;
  confidence: number;
  indicators: string[];
}>
```
Detects if content is likely AI-generated.

### ReportGenerator

Creates comprehensive AI SEO reports.

#### Methods

##### generateReport
```typescript
async generateReport(data: {
  url: string;
  analysis: ContentAnalysis;
  kpis: KPIMetrics;
  platformAnalysis: MultiPlatformOptimization[];
  updateSuggestions: any;
}): Promise<string>
```
Generates comprehensive AI SEO report in Markdown format.

## Types and Interfaces

### AIOptimizerConfig
```typescript
interface AIOptimizerConfig {
  brand: string;
  domain: string;
  apiKeys: {
    openai?: string;
    perplexity?: string;
    anthropic?: string;
    google?: string;
  };
  monitoring?: {
    checkInterval?: number;
    notificationEmail?: string;
  };
}
```

### ContentAnalysis
```typescript
interface ContentAnalysis {
  entityScore: number;
  aiCitationPotential: number;
  structureScore: number;
  eeatSignals: EEATAnalysis;
  freshness: FreshnessScore;
  aiHumanBalance: number;
  recommendations: Recommendation[];
}
```

### EEATAnalysis
```typescript
interface EEATAnalysis {
  expertise: number;
  experience: number;
  authoritativeness: number;
  trustworthiness: number;
  signals: EEATSignal[];
}
```

### KPIMetrics
```typescript
interface KPIMetrics {
  citationShare: number;
  brandMentions: number;
  entityRecognition: number;
  aiVisibilityIndex: number;
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}
```

### SchemaMarkup
```typescript
interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}
```

### AICitation
```typescript
interface AICitation {
  platform: 'chatgpt' | 'perplexity' | 'claude' | 'bard' | 'bing';
  query: string;
  appeared: boolean;
  position?: number;
  context: string;
  timestamp: Date;
}
```

### MultiPlatformOptimization
```typescript
interface MultiPlatformOptimization {
  platform: string;
  recommendations: OptimizationRecommendation[];
  score: number;
  visibility: PlatformVisibility;
}
```

### FreshnessScore
```typescript
interface FreshnessScore {
  score: number;
  lastUpdated: Date;
  competitorAverage: number;
  updateUrgency: 'low' | 'medium' | 'high' | 'critical';
}
```

## Error Handling

All methods may throw errors in the following cases:
- Invalid HTML input
- Network errors when calling external APIs
- Invalid configuration
- Rate limiting from AI platforms

Always wrap API calls in try-catch blocks:

```typescript
try {
  const analysis = await optimizer.analyzeContent(html, url);
} catch (error) {
  console.error('Analysis failed:', error);
}
```

## Rate Limiting

When using external APIs (OpenAI, Perplexity, etc.), be aware of rate limits:
- Implement exponential backoff for retries
- Cache results when possible
- Use batch operations where available

## Best Practices

1. **Initialize once**: Create optimizer instances at application startup
2. **Cache results**: Store analysis results to avoid redundant API calls
3. **Batch operations**: Process multiple URLs together when possible
4. **Monitor API usage**: Track API calls to stay within limits
5. **Handle errors gracefully**: Implement proper error handling and fallbacks