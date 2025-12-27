/**
 * Type definitions for AI SEO Optimization
 */

export interface AIOptimizerConfig {
  brand: string;
  domain: string;
  apiKeys: {
    openai?: string;
    perplexity?: string;
    anthropic?: string;
    google?: string;
  };
  monitoring?: {
    checkInterval?: number; // in hours
    notificationEmail?: string;
  };
}

export interface ContentAnalysis {
  entityScore: number;
  aiCitationPotential: number;
  structureScore: number;
  eeatSignals: EEATAnalysis;
  freshness: FreshnessScore;
  aiHumanBalance: number;
  recommendations: Recommendation[];
}

export interface EEATAnalysis {
  expertise: number;
  experience: number;
  authoritativeness: number;
  trustworthiness: number;
  signals: EEATSignal[];
}

export interface EEATSignal {
  type: 'author_bio' | 'citation' | 'credential' | 'social_proof' | 'review';
  strength: number;
  description: string;
  location: string;
}

export interface FreshnessScore {
  score: number;
  lastUpdated: Date;
  competitorAverage: number;
  updateUrgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface Recommendation {
  type: RecommendationType;
  priority: 'low' | 'medium' | 'high';
  description: string;
  implementation: string;
  estimatedImpact: number;
}

export type RecommendationType =
  | 'add_schema'
  | 'improve_structure'
  | 'add_author_bio'
  | 'update_content'
  | 'add_citations'
  | 'optimize_for_ai'
  | 'balance_ai_content';

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface AICitation {
  platform: 'chatgpt' | 'perplexity' | 'claude' | 'bard' | 'bing';
  query: string;
  appeared: boolean;
  position?: number;
  context: string;
  timestamp: Date;
}

export interface KPIMetrics {
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

export interface ContentStructure {
  headings: HeadingStructure[];
  faqs: FAQ[];
  tables: Table[];
  lists: List[];
  readabilityScore: number;
}

export interface HeadingStructure {
  level: number;
  text: string;
  keywords: string[];
  hasSchema: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  schema: SchemaMarkup;
}

export interface Table {
  headers: string[];
  rows: string[][];
  caption?: string;
  schema?: SchemaMarkup;
}

export interface List {
  type: 'ordered' | 'unordered';
  items: ListItem[];
  purpose: string;
}

export interface ListItem {
  text: string;
  subItems?: ListItem[];
}

export interface AuthorBio {
  name: string;
  expertise: string[];
  credentials: string[];
  socialProfiles: SocialProfile[];
  schema: SchemaMarkup;
}

export interface SocialProfile {
  platform: string;
  url: string;
  followers?: number;
}

// Additional types for comprehensive AI SEO

export interface Entity {
  name: string;
  type: 'Organization' | 'Person' | 'Brand' | 'Product' | 'Service' | 'Event' | 'Place';
  attributes: Record<string, any>;
  mentions: EntityMention[];
  sameAs?: string[];
  description?: string;
  url?: string;
}

export interface EntityMention {
  context: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  relevance: number;
  position: number;
}

export interface MultiPlatformOptimization {
  platform: 'google_ai_overview' | 'chatgpt' | 'perplexity' | 'gemini' | 'bing_chat';
  recommendations: OptimizationRecommendation[];
  score: number;
  visibility: PlatformVisibility;
}

export interface OptimizationRecommendation {
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  implementation?: string;
}

export interface PlatformVisibility {
  indexed: boolean;
  citationFrequency: number;
  averagePosition: number;
  queries: string[];
}

export interface BrandEntity {
  brandName: string;
  brandAttributes: BrandAttribute[];
  brandMentions: number;
  brandStrength: number;
  competitorComparison?: CompetitorBrand[];
}

export interface BrandAttribute {
  attribute: string;
  value: string;
  frequency: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface CompetitorBrand {
  name: string;
  strength: number;
  attributes: string[];
}

export interface AIContentBalance {
  aiGeneratedScore: number;
  humanWrittenScore: number;
  hybridScore: number;
  recommendations: BalanceRecommendation[];
  flaggedSections: FlaggedSection[];
}

export interface BalanceRecommendation {
  type: 'add_human_touch' | 'add_data' | 'add_expertise' | 'add_personality' | 'add_unique_insights';
  description: string;
  section?: string;
}

export interface FlaggedSection {
  content: string;
  reason: string;
  aiProbability: number;
}

export interface CitationAnalysis {
  citationWorthiness: number;
  uniqueInsights: string[];
  dataPoints: DataPoint[];
  originalResearch: boolean;
  expertQuotes: ExpertQuote[];
}

export interface DataPoint {
  value: string;
  source: string;
  unique: boolean;
  verifiable: boolean;
}

export interface ExpertQuote {
  quote: string;
  expert: string;
  credentials: string;
  context: string;
}