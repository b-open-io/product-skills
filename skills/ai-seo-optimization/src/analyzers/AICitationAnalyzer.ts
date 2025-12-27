/**
 * AI Citation Analyzer - Analyzes how content appears in AI responses
 */

import axios from 'axios';
import { parse } from 'node-html-parser';
import { AICitation, AIOptimizerConfig, CitationAnalysis, DataPoint, ExpertQuote } from '../types';
import { AI_PLATFORMS, CITATION_QUALITY_FACTORS, CITATION_WORTHINESS_FACTORS } from '../constants';

export class AICitationAnalyzer {
  private config: AIOptimizerConfig;

  constructor(config: AIOptimizerConfig) {
    this.config = config;
  }

  /**
   * Analyze citation potential of content
   */
  async analyzeCitationPotential(html: string): Promise<{ score: number; analysis: CitationAnalysis }> {
    const root = parse(html);

    // Extract unique insights
    const uniqueInsights = this.extractUniqueInsights(root);

    // Extract data points
    const dataPoints = this.extractDataPoints(root);

    // Check for original research
    const originalResearch = this.detectOriginalResearch(root);

    // Extract expert quotes
    const expertQuotes = this.extractExpertQuotes(root);

    // Calculate citation worthiness score
    const citationWorthiness = this.calculateCitationWorthiness({
      uniqueInsights,
      dataPoints,
      originalResearch,
      expertQuotes
    });

    const analysis: CitationAnalysis = {
      citationWorthiness,
      uniqueInsights,
      dataPoints,
      originalResearch,
      expertQuotes
    };

    return { score: citationWorthiness, analysis };
  }

  /**
   * Check how content appears in AI responses across platforms
   */
  async checkAICitations(url: string, queries: string[]): Promise<AICitation[]> {
    const citations: AICitation[] = [];

    // Check each platform (in production, use actual APIs)
    for (const query of queries) {
      // ChatGPT simulation
      if (this.config.apiKeys.openai) {
        const chatgptCitation = await this.checkChatGPTCitation(url, query);
        if (chatgptCitation) citations.push(chatgptCitation);
      }

      // Perplexity simulation
      if (this.config.apiKeys.perplexity) {
        const perplexityCitation = await this.checkPerplexityCitation(url, query);
        if (perplexityCitation) citations.push(perplexityCitation);
      }

      // Add other platforms as needed
    }

    return citations;
  }

  /**
   * Monitor citation trends over time
   */
  async monitorCitationTrends(url: string): Promise<any> {
    // In production, this would track citations over time
    return {
      trend: 'increasing',
      weeklyGrowth: 0.15,
      totalCitations: 42,
      platformBreakdown: {
        chatgpt: 18,
        perplexity: 12,
        claude: 8,
        bard: 4
      },
      topQueries: [
        'AI SEO best practices 2025',
        'entity optimization for search',
        'E-E-A-T signals implementation'
      ]
    };
  }

  /**
   * Extract unique insights from content
   */
  private extractUniqueInsights(root: any): string[] {
    const insights: string[] = [];

    // Look for unique claim patterns
    const paragraphs = root.querySelectorAll('p');
    paragraphs.forEach((p: any) => {
      const text = p.text;

      // Patterns that indicate unique insights
      if (text.match(/we discovered|our research shows|contrary to popular belief|surprisingly|unexpectedly/i)) {
        insights.push(text.substring(0, 200));
      }

      // Statistical claims that stand out
      if (text.match(/\b\d+x\s+(increase|improvement|faster|better)\b/i)) {
        insights.push(text.substring(0, 150));
      }
    });

    // Extract insights from headings that pose unique questions
    const headings = root.querySelectorAll('h2, h3');
    headings.forEach((h: any) => {
      if (h.text.includes('?') && h.text.match(/why|how|what if/i)) {
        const answer = h.nextElementSibling?.text;
        if (answer) {
          insights.push(`${h.text} ${answer.substring(0, 100)}`);
        }
      }
    });

    return insights.slice(0, 5);
  }

  /**
   * Extract data points from content
   */
  private extractDataPoints(root: any): DataPoint[] {
    const dataPoints: DataPoint[] = [];
    const text = root.text;

    // Pattern for statistics and data
    const dataPatterns = [
      /(\b\d+(?:\.\d+)?%)\s+([^.]+)/g,
      /(\b\d+(?:,\d{3})*(?:\.\d+)?)\s+(users?|visitors?|companies|businesses|websites?)/gi,
      /(\$\d+(?:,\d{3})*(?:\.\d+)?(?:\s*(?:million|billion|trillion))?)/gi,
      /(\b\d+x)\s+(?:increase|improvement|faster|growth)/gi
    ];

    dataPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const value = match[1];
        const context = match[0];

        // Check if this data point has a source
        const sourcePattern = /according to|source:|study by|research from|data from/i;
        const hasSource = text.substring(Math.max(0, match.index - 100), match.index).match(sourcePattern);

        dataPoints.push({
          value,
          source: hasSource ? 'Referenced' : 'Internal',
          unique: this.isUniqueDataPoint(value, context),
          verifiable: !!hasSource
        });
      }
    });

    return dataPoints.slice(0, 10);
  }

  /**
   * Detect original research in content
   */
  private detectOriginalResearch(root: any): boolean {
    const indicators = [
      'our study',
      'we surveyed',
      'we analyzed',
      'our research',
      'we conducted',
      'our findings',
      'we tested',
      'our experiment',
      'proprietary data',
      'exclusive data'
    ];

    const text = root.text.toLowerCase();
    return indicators.some(indicator => text.includes(indicator));
  }

  /**
   * Extract expert quotes from content
   */
  private extractExpertQuotes(root: any): ExpertQuote[] {
    const quotes: ExpertQuote[] = [];

    // Look for blockquotes
    const blockquotes = root.querySelectorAll('blockquote');
    blockquotes.forEach((bq: any) => {
      const quote = bq.text;
      const cite = bq.querySelector('cite')?.text || '';

      if (quote && cite) {
        quotes.push({
          quote: quote.replace(cite, '').trim(),
          expert: this.extractExpertName(cite),
          credentials: this.extractCredentials(cite),
          context: 'Featured Quote'
        });
      }
    });

    // Look for inline quotes with attribution
    const paragraphs = root.querySelectorAll('p');
    paragraphs.forEach((p: any) => {
      const quotePattern = /"([^"]+)"\s*(?:[-–—]|said|says|according to)\s*([^,.]+(?:,\s*[^.]+)?)/gi;
      let match;

      while ((match = quotePattern.exec(p.text)) !== null) {
        quotes.push({
          quote: match[1],
          expert: this.extractExpertName(match[2]),
          credentials: this.extractCredentials(match[2]),
          context: 'Inline Quote'
        });
      }
    });

    return quotes.slice(0, 5);
  }

  /**
   * Calculate overall citation worthiness
   */
  private calculateCitationWorthiness(data: {
    uniqueInsights: string[],
    dataPoints: DataPoint[],
    originalResearch: boolean,
    expertQuotes: ExpertQuote[]
  }): number {
    let score = 0;

    // Unique insights factor
    score += Math.min(data.uniqueInsights.length * 0.05, 0.25) * CITATION_WORTHINESS_FACTORS.UNIQUE_DATA;

    // Data points factor
    const verifiableData = data.dataPoints.filter(dp => dp.verifiable).length;
    score += Math.min(verifiableData * 0.05, 0.25) * CITATION_WORTHINESS_FACTORS.UNIQUE_DATA;

    // Expert quotes factor
    score += Math.min(data.expertQuotes.length * 0.04, 0.2) * CITATION_WORTHINESS_FACTORS.EXPERT_QUOTES;

    // Original research factor
    if (data.originalResearch) {
      score += CITATION_WORTHINESS_FACTORS.ORIGINAL_RESEARCH;
    }

    // Comprehensive coverage (based on total valuable elements)
    const totalElements = data.uniqueInsights.length + data.dataPoints.length + data.expertQuotes.length;
    if (totalElements > 10) {
      score += CITATION_WORTHINESS_FACTORS.COMPREHENSIVE_COVERAGE;
    }

    return Math.min(score, 1);
  }

  /**
   * Check ChatGPT citation (simulated)
   */
  private async checkChatGPTCitation(url: string, query: string): Promise<AICitation | null> {
    // In production, use actual OpenAI API
    // This is a simulation for demonstration

    const mockResponse = {
      appeared: Math.random() > 0.5,
      position: Math.floor(Math.random() * 5) + 1,
      context: `In discussing ${query}, this source provides comprehensive insights...`
    };

    if (mockResponse.appeared) {
      return {
        platform: 'chatgpt',
        query,
        appeared: true,
        position: mockResponse.position,
        context: mockResponse.context,
        timestamp: new Date()
      };
    }

    return null;
  }

  /**
   * Check Perplexity citation (simulated)
   */
  private async checkPerplexityCitation(url: string, query: string): Promise<AICitation | null> {
    // In production, use actual Perplexity API
    // This is a simulation for demonstration

    const mockResponse = {
      appeared: Math.random() > 0.4,
      position: Math.floor(Math.random() * 3) + 1,
      context: `According to ${this.config.domain}, ${query} involves...`
    };

    if (mockResponse.appeared) {
      return {
        platform: 'perplexity',
        query,
        appeared: true,
        position: mockResponse.position,
        context: mockResponse.context,
        timestamp: new Date()
      };
    }

    return null;
  }

  /**
   * Helper methods
   */
  private isUniqueDataPoint(value: string, context: string): boolean {
    // Check if this is a commonly cited statistic
    const commonStats = ['50%', '90%', '2x', '3x', '10x'];
    return !commonStats.includes(value);
  }

  private extractExpertName(text: string): string {
    // Remove common titles and extract name
    const cleaned = text.replace(/(?:Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/gi, '');
    const nameMatch = cleaned.match(/([A-Z][a-z]+ (?:[A-Z][a-z]+ )?[A-Z][a-z]+)/);
    return nameMatch ? nameMatch[1] : cleaned.split(',')[0].trim();
  }

  private extractCredentials(text: string): string {
    // Look for credentials after comma
    const parts = text.split(',');
    if (parts.length > 1) {
      return parts.slice(1).join(',').trim();
    }

    // Look for common credential patterns
    const credentialMatch = text.match(/(?:PhD|MD|CEO|CTO|Director|Professor|Expert)/i);
    return credentialMatch ? credentialMatch[0] : 'Industry Expert';
  }
}