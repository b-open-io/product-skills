/**
 * Freshness Monitor - Tracks content freshness and suggests updates
 */

import { parse } from 'node-html-parser';
import axios from 'axios';
import { FreshnessScore } from '../types';
import { FRESHNESS_THRESHOLDS } from '../constants';

export class FreshnessMonitor {
  /**
   * Check content freshness against competitors
   */
  async checkFreshness(html: string, url: string): Promise<FreshnessScore> {
    const root = parse(html);

    // Extract last updated date
    const lastUpdated = this.extractLastUpdated(root);

    // Calculate days since update
    const daysSinceUpdate = this.calculateDaysSince(lastUpdated);

    // Get competitor freshness (simulated)
    const competitorAverage = await this.getCompetitorFreshness(url);

    // Calculate freshness score
    const score = this.calculateFreshnessScore(daysSinceUpdate, competitorAverage);

    // Determine update urgency
    const updateUrgency = this.determineUpdateUrgency(daysSinceUpdate, competitorAverage);

    return {
      score,
      lastUpdated,
      competitorAverage,
      updateUrgency
    };
  }

  /**
   * Monitor content staleness across site
   */
  async monitorSiteFreshness(urls: string[]): Promise<any[]> {
    const freshnessReports = [];

    for (const url of urls) {
      // In production, fetch actual content
      const mockFreshness = {
        url,
        lastUpdated: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
        freshnessScore: Math.random(),
        updatePriority: Math.random() > 0.5 ? 'high' : 'medium',
        suggestedUpdates: this.generateUpdateSuggestions(url)
      };

      freshnessReports.push(mockFreshness);
    }

    return freshnessReports.sort((a, b) => a.freshnessScore - b.freshnessScore);
  }

  /**
   * Suggest specific content updates
   */
  async suggestUpdates(html: string, url: string): Promise<any> {
    const root = parse(html);
    const suggestions = {
      statistical: this.findOutdatedStatistics(root),
      temporal: this.findTemporalReferences(root),
      competitive: await this.getCompetitiveUpdates(url),
      trending: await this.getTrendingTopics(url),
      structural: this.suggestStructuralUpdates(root)
    };

    return {
      urgentUpdates: this.prioritizeUpdates(suggestions),
      allSuggestions: suggestions,
      estimatedImpact: this.calculateUpdateImpact(suggestions)
    };
  }

  /**
   * Set up automated freshness alerts
   */
  async setupFreshnessAlerts(urls: string[], notificationEmail?: string): Promise<void> {
    // In production, this would set up scheduled monitoring
    console.log(`Freshness monitoring set up for ${urls.length} URLs`);
    if (notificationEmail) {
      console.log(`Alerts will be sent to: ${notificationEmail}`);
    }
  }

  /**
   * Extract last updated date from content
   */
  private extractLastUpdated(root: any): Date {
    // Check for explicit update date
    const updateElements = root.querySelectorAll(
      'time[datetime], .updated, .last-updated, .modified-date, meta[property="article:modified_time"]'
    );

    if (updateElements.length > 0) {
      const dateStr = updateElements[0].getAttribute('datetime') ||
                     updateElements[0].getAttribute('content') ||
                     updateElements[0].text;

      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        return new Date(parsed);
      }
    }

    // Check for date in content
    const datePattern = /(?:updated?|modified|revised):?\s*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\w+ \d{1,2},? \d{4})/gi;
    const matches = root.text.match(datePattern);

    if (matches && matches.length > 0) {
      const dateStr = matches[0].replace(/(?:updated?|modified|revised):?\s*/i, '');
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        return new Date(parsed);
      }
    }

    // Default to current date if not found
    return new Date();
  }

  /**
   * Calculate days since date
   */
  private calculateDaysSince(date: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get competitor content freshness
   */
  private async getCompetitorFreshness(url: string): Promise<number> {
    // In production, this would analyze actual competitor content
    // Simulating competitor average days since update
    return Math.floor(Math.random() * 60) + 15; // 15-75 days
  }

  /**
   * Calculate freshness score (0-1)
   */
  private calculateFreshnessScore(daysSinceUpdate: number, competitorAverage: number): number {
    let score = 1;

    // Decay based on age
    if (daysSinceUpdate > 7) score -= 0.1;
    if (daysSinceUpdate > 30) score -= 0.2;
    if (daysSinceUpdate > 60) score -= 0.2;
    if (daysSinceUpdate > 90) score -= 0.2;
    if (daysSinceUpdate > 180) score -= 0.3;

    // Bonus for being fresher than competitors
    if (daysSinceUpdate < competitorAverage) {
      score += 0.2;
    }

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Determine update urgency
   */
  private determineUpdateUrgency(daysSinceUpdate: number, competitorAverage: number): FreshnessScore['updateUrgency'] {
    // Behind competitors by significant margin
    if (daysSinceUpdate > competitorAverage * 2) {
      return 'critical';
    }

    // Content-type based thresholds
    if (daysSinceUpdate > FRESHNESS_THRESHOLDS.CRITICAL) {
      return 'critical';
    }
    if (daysSinceUpdate > FRESHNESS_THRESHOLDS.HIGH) {
      return 'high';
    }
    if (daysSinceUpdate > FRESHNESS_THRESHOLDS.MEDIUM) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Find outdated statistics in content
   */
  private findOutdatedStatistics(root: any): any[] {
    const suggestions: any[] = [];
    const currentYear = new Date().getFullYear();

    // Find year references
    const yearPattern = /\b(20\d{2})\b/g;
    const text = root.text;
    let match;

    while ((match = yearPattern.exec(text)) !== null) {
      const year = parseInt(match[1]);
      if (year < currentYear - 2) {
        const context = text.substring(Math.max(0, match.index - 50), match.index + 50);
        suggestions.push({
          type: 'outdated_year',
          finding: `Reference to ${year}`,
          context: context,
          suggestion: `Update to ${currentYear} data if available`
        });
      }
    }

    // Find outdated terminology
    const outdatedTerms = [
      { old: 'SEO best practices 2023', new: 'SEO best practices 2025' },
      { old: 'Google algorithm', new: 'Google AI algorithm' },
      { old: 'voice search', new: 'AI-powered search' }
    ];

    outdatedTerms.forEach(term => {
      if (text.includes(term.old)) {
        suggestions.push({
          type: 'outdated_term',
          finding: term.old,
          suggestion: `Update to: ${term.new}`
        });
      }
    });

    return suggestions;
  }

  /**
   * Find temporal references that need updating
   */
  private findTemporalReferences(root: any): any[] {
    const suggestions: any[] = [];
    const temporalPhrases = [
      /\blast\s+(month|year|week)\b/gi,
      /\brecently\b/gi,
      /\b(this|next)\s+(month|year|quarter)\b/gi,
      /\bupcoming\b/gi
    ];

    temporalPhrases.forEach(pattern => {
      const matches = root.text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          suggestions.push({
            type: 'temporal_reference',
            finding: match,
            suggestion: 'Update or make reference timeless'
          });
        });
      }
    });

    return suggestions;
  }

  /**
   * Get competitive content updates
   */
  private async getCompetitiveUpdates(url: string): Promise<any[]> {
    // Simulate competitive analysis
    return [
      {
        type: 'competitor_feature',
        finding: 'Competitors added AI platform comparison tables',
        suggestion: 'Add comprehensive platform comparison section'
      },
      {
        type: 'missing_topic',
        finding: 'New industry development not covered',
        suggestion: 'Add section on GPT-5 implications for SEO'
      }
    ];
  }

  /**
   * Get trending topics to add
   */
  private async getTrendingTopics(url: string): Promise<any[]> {
    // Simulate trending topic analysis
    return [
      {
        type: 'trending_topic',
        topic: 'AI Overviews impact on CTR',
        searchVolume: 'High',
        suggestion: 'Add dedicated section with data and case studies'
      },
      {
        type: 'emerging_trend',
        topic: 'Multimodal search optimization',
        searchVolume: 'Growing',
        suggestion: 'Include image and video optimization strategies'
      }
    ];
  }

  /**
   * Suggest structural updates
   */
  private suggestStructuralUpdates(root: any): any[] {
    const suggestions: any[] = [];

    // Check for missing modern elements
    if (!root.querySelector('.key-takeaways, .tldr, .summary')) {
      suggestions.push({
        type: 'structure',
        finding: 'Missing key takeaways section',
        suggestion: 'Add TLDR or key takeaways at the beginning'
      });
    }

    if (!root.querySelector('video, iframe[src*="youtube"], iframe[src*="vimeo"]')) {
      suggestions.push({
        type: 'multimedia',
        finding: 'No video content',
        suggestion: 'Add explanatory video or embed relevant content'
      });
    }

    if (!root.querySelector('.faq, [itemtype*="FAQPage"]')) {
      suggestions.push({
        type: 'structure',
        finding: 'Missing FAQ section',
        suggestion: 'Add FAQ section with schema markup'
      });
    }

    return suggestions;
  }

  /**
   * Prioritize updates by impact
   */
  private prioritizeUpdates(suggestions: any): any[] {
    const allUpdates: any[] = [];

    Object.entries(suggestions).forEach(([category, updates]) => {
      (updates as any[]).forEach(update => {
        allUpdates.push({ ...update, category });
      });
    });

    // Sort by priority
    const priorityOrder = {
      'outdated_year': 1,
      'competitor_feature': 2,
      'trending_topic': 3,
      'temporal_reference': 4,
      'structure': 5,
      'outdated_term': 6
    };

    return allUpdates.sort((a, b) => {
      const aPriority = priorityOrder[a.type as keyof typeof priorityOrder] || 999;
      const bPriority = priorityOrder[b.type as keyof typeof priorityOrder] || 999;
      return aPriority - bPriority;
    }).slice(0, 10); // Top 10 updates
  }

  /**
   * Calculate estimated impact of updates
   */
  private calculateUpdateImpact(suggestions: any): number {
    let impact = 0;
    const impactScores = {
      statistical: 0.2,
      temporal: 0.1,
      competitive: 0.3,
      trending: 0.25,
      structural: 0.15
    };

    Object.entries(suggestions).forEach(([category, updates]) => {
      if ((updates as any[]).length > 0) {
        impact += impactScores[category as keyof typeof impactScores] || 0;
      }
    });

    return Math.min(impact, 1);
  }

  /**
   * Generate update suggestions for URL
   */
  private generateUpdateSuggestions(url: string): string[] {
    // Simulate update suggestions
    return [
      'Update 2023 statistics to 2025 data',
      'Add section on AI Overview optimization',
      'Refresh case studies with recent examples',
      'Update tool recommendations',
      'Add new KPI metrics section'
    ];
  }
}