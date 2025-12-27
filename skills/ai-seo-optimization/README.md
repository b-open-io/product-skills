# AI SEO Optimization Skill

A comprehensive AI SEO optimization skill that implements 2025 best practices for maximizing visibility across AI-powered search platforms including Google AI Overview, ChatGPT, Perplexity, Gemini, and Bing Chat.

## Overview

This skill provides a complete toolkit for optimizing content for AI-powered search engines. It focuses on entity optimization, E-E-A-T signals, structured data, citation-worthiness, and multi-platform visibility.

## Key Features

### 1. Entity Optimization for AI Recognition
- **EntityOptimizer**: Extracts and enhances entities (Organizations, People, Brands, Products, Services)
- Automated entity detection with context analysis
- Brand entity building and strengthening
- Entity relationship mapping
- Microdata and schema.org integration

### 2. Schema Markup Generation
- **SchemaGenerator**: Creates comprehensive structured data
- Supports FAQ, HowTo, Organization, Person, Product, Service schemas
- Automatic schema prioritization
- Context-aware schema generation
- JSON-LD implementation

### 3. E-E-A-T Signal Enhancement
- **EEATSignalBuilder**: Builds Experience, Expertise, Authoritativeness, and Trustworthiness
- Author bio generation with credentials
- Trust signal implementation
- Citation and reference management
- Social proof integration
- Review schema implementation

### 4. Content Structuring for AI Parsing
- **ContentStructurer**: Optimizes content structure for AI comprehension
- Heading hierarchy optimization
- FAQ section creation and structuring
- Table and list enhancement
- Key takeaway extraction
- Readability scoring

### 5. Citation-Worthy Content Analysis
- **AICitationAnalyzer**: Analyzes and enhances citation potential
- Unique insight extraction
- Data point verification
- Expert quote identification
- Original research detection
- Citation tracking across AI platforms

### 6. Multi-Platform Optimization
- Google AI Overview optimization
- ChatGPT visibility enhancement
- Perplexity citation optimization
- Gemini compatibility
- Bing Chat optimization

### 7. Content Freshness Monitoring
- Automated staleness detection
- Competitor freshness comparison
- Update urgency scoring
- Content refresh recommendations

### 8. Brand Entity Building
- Brand attribute analysis
- Brand strength scoring
- Competitor brand comparison
- Brand mention optimization

### 9. AI vs Human Content Balance
- AI-generated content detection
- Human touch recommendations
- Content authenticity scoring
- Balance optimization strategies

### 10. New KPI Tracking
- Citation share measurement
- AI mention tracking
- Brand visibility monitoring
- Entity recognition scoring
- Platform-specific metrics

## Installation

```bash
npm install ai-seo-optimization
```

## Usage

### Basic Setup

```typescript
import { AIOptimizer } from 'ai-seo-optimization';

const optimizer = new AIOptimizer({
  brand: 'Your Brand Name',
  domain: 'yourdomain.com',
  apiKeys: {
    openai: 'your-openai-api-key',
    perplexity: 'your-perplexity-api-key',
    anthropic: 'your-anthropic-api-key',
    google: 'your-google-api-key'
  },
  monitoring: {
    checkInterval: 24, // hours
    notificationEmail: 'seo@yourdomain.com'
  }
});
```

### Analyze Content

```typescript
const analysis = await optimizer.analyzeContent(htmlContent, url);

console.log('Entity Score:', analysis.entityScore);
console.log('Citation Potential:', analysis.aiCitationPotential);
console.log('Structure Score:', analysis.structureScore);
console.log('E-E-A-T Signals:', analysis.eeatSignals);
console.log('Recommendations:', analysis.recommendations);
```

### Generate Schema Markup

```typescript
const schemas = await optimizer.generateSchemas(htmlContent, 'article');
// Returns array of JSON-LD schemas ready for implementation
```

### Optimize for Specific Platform

```typescript
const optimizedContent = await optimizer.optimizeForPlatform(
  content,
  'chatgpt'
);
```

### Track KPIs

```typescript
const metrics = await optimizer.trackKPIs(url);
console.log('Citation Share:', metrics.citationShare);
console.log('AI Mentions:', metrics.aiMentions);
console.log('Brand Visibility:', metrics.brandVisibility);
```

### Monitor Content Freshness

```typescript
const freshnessMap = await optimizer.monitorFreshness([url1, url2, url3]);
```

## 2025 Best Practices Implemented

### 1. Strong SEO Fundamentals = Strong AI Visibility
- Technical SEO optimization
- Mobile-first approach
- Core Web Vitals compliance
- Semantic HTML structure

### 2. Prioritize Brand/Entity Building Over Keywords
- Entity-first content strategy
- Brand attribute optimization
- Entity relationship building
- Knowledge graph optimization

### 3. Create Citation-Worthy Content
- Unique data points and insights
- Original research integration
- Expert quotes and testimonials
- Comprehensive topic coverage

### 4. Demonstrate E-E-A-T Explicitly
- Author expertise showcasing
- First-hand experience indicators
- Authority building signals
- Trust factor implementation

### 5. Use Structured Data Aggressively
- Multiple schema types per page
- Nested schema relationships
- Schema validation and testing
- Rich snippet optimization

### 6. Refresh Content Regularly
- Automated freshness monitoring
- Competitor update tracking
- Strategic content updates
- Version history management

### 7. Diversify Beyond Google
- Multi-platform optimization
- Platform-specific features
- Cross-platform citation building
- Unified visibility strategy

### 8. Focus on Natural Language Queries
- Conversational content structure
- Question-based optimization
- Long-tail query targeting
- Voice search compatibility

### 9. Human + AI Hybrid Approach
- Balance detection algorithms
- Human touch integration
- Authenticity preservation
- Personality injection

### 10. Measure New KPIs
- Citation share tracking
- AI mention monitoring
- Brand entity strength
- Platform visibility scores

## API Reference

### AIOptimizer

Main class that orchestrates all optimization components.

#### Methods

- `analyzeContent(content: string, url?: string): Promise<ContentAnalysis>`
- `generateSchemas(content: string, contentType?: string): Promise<SchemaMarkup[]>`
- `optimizeForPlatform(content: string, platform: string): Promise<string>`
- `trackKPIs(url: string): Promise<KPIMetrics>`
- `monitorFreshness(urls: string[]): Promise<Map<string, FreshnessScore>>`
- `enhanceEEAT(content: string, authorInfo?: AuthorBio): Promise<string>`
- `buildBrandEntity(content: string): Promise<BrandEntity>`

### Individual Components

Each component can also be used independently:

- `EntityOptimizer`: Entity extraction and enhancement
- `SchemaGenerator`: Schema markup generation
- `EEATSignalBuilder`: E-E-A-T signal enhancement
- `ContentStructurer`: Content structure optimization
- `AICitationAnalyzer`: Citation analysis and tracking

## Examples

### Complete Page Optimization

```typescript
// 1. Analyze current state
const analysis = await optimizer.analyzeContent(pageContent, pageUrl);

// 2. Apply recommendations
for (const recommendation of analysis.recommendations) {
  if (recommendation.priority === 'high') {
    console.log(`Applying: ${recommendation.description}`);
    // Apply the recommendation
  }
}

// 3. Generate and add schemas
const schemas = await optimizer.generateSchemas(pageContent);
schemas.forEach(schema => {
  // Add to page head
  addJsonLdToPage(schema);
});

// 4. Track performance
const metrics = await optimizer.trackKPIs(pageUrl);
```

### Entity-First Content Creation

```typescript
// Build brand entity
const brandEntity = await optimizer.buildBrandEntity(content);

// Enhance with entity optimization
const entityOptimizer = new EntityOptimizer(config);
const enhancedContent = await entityOptimizer.enhanceEntities(content);
```

## Configuration Options

```typescript
interface AIOptimizerConfig {
  brand: string;              // Your brand name
  domain: string;             // Your domain
  apiKeys: {
    openai?: string;          // OpenAI API key
    perplexity?: string;      // Perplexity API key
    anthropic?: string;       // Anthropic API key
    google?: string;          // Google API key
  };
  monitoring?: {
    checkInterval?: number;   // Check interval in hours
    notificationEmail?: string; // Email for notifications
  };
}
```

## Best Practices

1. **Regular Analysis**: Run content analysis at least weekly
2. **Schema Updates**: Keep schemas updated with content changes
3. **Platform Monitoring**: Track performance across all AI platforms
4. **Content Refresh**: Update content based on freshness scores
5. **Entity Consistency**: Maintain consistent entity naming and attributes

## Troubleshooting

### Low Entity Score
- Add more structured entities
- Improve brand mentions
- Use consistent entity naming

### Poor Citation Performance
- Add unique data points
- Include expert quotes
- Create original research

### Low E-E-A-T Signals
- Add comprehensive author bios
- Include credentials and expertise
- Add trust signals and reviews

## License

MIT

## Support

For support and questions, please visit our [GitHub repository](https://github.com/your-org/ai-seo-optimization) or contact support@yourdomain.com