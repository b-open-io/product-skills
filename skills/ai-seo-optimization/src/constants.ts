/**
 * Constants for AI SEO Optimization
 */

export const AI_PLATFORMS = {
  CHATGPT: 'chatgpt',
  PERPLEXITY: 'perplexity',
  CLAUDE: 'claude',
  BARD: 'bard',
  BING: 'bing',
  YOU: 'you.com'
} as const;

export const SCHEMA_TYPES = {
  ARTICLE: 'Article',
  FAQ: 'FAQPage',
  HOWTO: 'HowTo',
  PERSON: 'Person',
  ORGANIZATION: 'Organization',
  PRODUCT: 'Product',
  REVIEW: 'Review',
  LOCAL_BUSINESS: 'LocalBusiness',
  EVENT: 'Event'
} as const;

export const EEAT_WEIGHTS = {
  EXPERTISE: 0.3,
  EXPERIENCE: 0.25,
  AUTHORITATIVENESS: 0.25,
  TRUSTWORTHINESS: 0.2
};

export const FRESHNESS_THRESHOLDS = {
  CRITICAL: 7, // days
  HIGH: 30,
  MEDIUM: 90,
  LOW: 180
};

export const AI_HUMAN_BALANCE_TARGET = {
  MIN: 0.3, // Minimum 30% human-written
  MAX: 0.7, // Maximum 70% human-written
  OPTIMAL: 0.5 // 50/50 balance
};

export const CITATION_QUALITY_FACTORS = {
  POSITION_WEIGHT: 0.4,
  CONTEXT_RELEVANCE: 0.3,
  QUERY_MATCH: 0.2,
  RECENCY: 0.1
};

export const KPI_BENCHMARKS = {
  CITATION_SHARE: {
    POOR: 0.05,
    AVERAGE: 0.15,
    GOOD: 0.25,
    EXCELLENT: 0.35
  },
  AI_VISIBILITY: {
    POOR: 0.2,
    AVERAGE: 0.4,
    GOOD: 0.6,
    EXCELLENT: 0.8
  }
};

export const ENTITY_TYPES = {
  ORGANIZATION: 'Organization',
  PERSON: 'Person',
  BRAND: 'Brand',
  PRODUCT: 'Product',
  SERVICE: 'Service',
  EVENT: 'Event',
  PLACE: 'Place'
} as const;

export const AI_PLATFORMS_2025 = {
  GOOGLE_AI_OVERVIEW: 'google_ai_overview',
  CHATGPT: 'chatgpt',
  PERPLEXITY: 'perplexity',
  GEMINI: 'gemini',
  BING_CHAT: 'bing_chat',
  CLAUDE: 'claude',
  YOU_COM: 'you.com'
} as const;

export const CONTENT_PATTERNS = {
  AI_GENERATED: [
    'it is important to note',
    'in conclusion',
    'moreover',
    'furthermore',
    'in today\'s digital age',
    'cutting-edge',
    'revolutionary',
    'game-changing',
    'leverage',
    'utilize'
  ],
  HUMAN_INDICATORS: [
    'I think',
    'in my experience',
    'I\'ve found that',
    'personally',
    'we discovered',
    'our team',
    'surprisingly',
    'honestly'
  ]
};

export const SCHEMA_PRIORITY = {
  FAQ: 1,
  HOWTO: 2,
  ORGANIZATION: 3,
  PERSON: 4,
  PRODUCT: 5,
  ARTICLE: 6,
  REVIEW: 7,
  EVENT: 8
};

export const CITATION_WORTHINESS_FACTORS = {
  UNIQUE_DATA: 0.25,
  EXPERT_QUOTES: 0.2,
  ORIGINAL_RESEARCH: 0.2,
  COMPREHENSIVE_COVERAGE: 0.15,
  VISUAL_CONTENT: 0.1,
  RECENCY: 0.1
};

export const PLATFORM_OPTIMIZATION_WEIGHTS = {
  google_ai_overview: {
    structured_data: 0.3,
    entity_optimization: 0.25,
    content_depth: 0.2,
    freshness: 0.15,
    eeat_signals: 0.1
  },
  chatgpt: {
    citation_quality: 0.3,
    unique_insights: 0.25,
    comprehensive_coverage: 0.2,
    structured_format: 0.15,
    brand_mentions: 0.1
  },
  perplexity: {
    source_authority: 0.3,
    data_accuracy: 0.25,
    content_recency: 0.2,
    citation_format: 0.15,
    visual_content: 0.1
  },
  gemini: {
    factual_accuracy: 0.3,
    multimodal_content: 0.25,
    entity_relationships: 0.2,
    structured_data: 0.15,
    eeat_signals: 0.1
  }
};