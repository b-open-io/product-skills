/**
 * KPI Tracker - Tracks new SEO KPIs including citation share and brand mentions
 */

import axios from 'axios';
import { AIOptimizerConfig, KPIMetrics, AICitation } from '../types';
import { KPI_BENCHMARKS, AI_PLATFORMS } from '../constants';

export class KPITracker {
  private config: AIOptimizerConfig;
  private historicalData: Map<string, KPIMetrics[]>;

  constructor(config: AIOptimizerConfig) {
    this.config = config;
    this.historicalData = new Map();
  }

  /**
   * Track all KPI metrics for a URL
   */
  async trackMetrics(url: string): Promise<KPIMetrics> {
    const [
      citationShare,
      brandMentions,
      entityRecognition,
      aiVisibilityIndex
    ] = await Promise.all([
      this.calculateCitationShare(url),
      this.trackBrandMentions(url),
      this.measureEntityRecognition(url),
      this.calculateAIVisibilityIndex(url)
    ]);

    const trends = this.calculateTrends(url, {
      citationShare,
      brandMentions,
      entityRecognition,
      aiVisibilityIndex
    });

    const metrics: KPIMetrics = {
      citationShare,
      brandMentions,
      entityRecognition,
      aiVisibilityIndex,
      trends
    };

    // Store for historical tracking
    this.storeMetrics(url, metrics);

    return metrics;
  }

  /**
   * Calculate citation share across AI platforms
   */
  private async calculateCitationShare(url: string): Promise<number> {
    // In production, this would query actual AI platforms
    // Simulating citation share calculation

    const totalQueries = 100; // Total relevant queries tracked
    const citedQueries = 23;  // Queries where URL was cited

    return citedQueries / totalQueries;
  }

  /**
   * Track brand mentions in AI responses
   */
  private async trackBrandMentions(url: string): Promise<number> {
    // Simulate tracking brand mentions across platforms
    const platforms = Object.values(AI_PLATFORMS);
    let totalMentions = 0;

    for (const platform of platforms) {
      const mentions = await this.checkPlatformMentions(platform, this.config.brand);
      totalMentions += mentions;
    }

    return totalMentions;
  }

  /**
   * Measure entity recognition score
   */
  private async measureEntityRecognition(url: string): Promise<number> {
    // Simulate entity recognition measurement
    // In production, this would analyze how well AI systems recognize the brand entity

    const factors = {
      brandKnowledgeScore: 0.75,     // How well AI knows the brand
      attributeAccuracy: 0.82,        // Accuracy of brand attributes
      relationshipMappingM: 0.68,     // Related entities correctly mapped
      disambiguationScore: 0.90       // Correctly distinguished from similar entities
    };

    return Object.values(factors).reduce((a, b) => a + b) / Object.values(factors).length;
  }

  /**
   * Calculate overall AI visibility index
   */
  private async calculateAIVisibilityIndex(url: string): Promise<number> {
    const metrics = {
      citationFrequency: 0.7,
      positionScore: 0.65,
      platformCoverage: 0.8,
      queryDiversity: 0.55,
      freshness: 0.75
    };

    // Weighted average
    const weights = {
      citationFrequency: 0.3,
      positionScore: 0.25,
      platformCoverage: 0.2,
      queryDiversity: 0.15,
      freshness: 0.1
    };

    let index = 0;
    for (const [key, value] of Object.entries(metrics)) {
      index += value * weights[key as keyof typeof weights];
    }

    return index;
  }

  /**
   * Calculate trends from historical data
   */
  private calculateTrends(url: string, currentMetrics: Omit<KPIMetrics, 'trends'>): KPIMetrics['trends'] {
    const history = this.historicalData.get(url) || [];

    // Add current metrics to generate trends
    const allMetrics = [...history, { ...currentMetrics, trends: { daily: [], weekly: [], monthly: [] } }];

    // Generate trend data (simplified - in production, use actual time series)
    const daily = this.generateTrendData(allMetrics, 7, 'aiVisibilityIndex');
    const weekly = this.generateTrendData(allMetrics, 4, 'aiVisibilityIndex');
    const monthly = this.generateTrendData(allMetrics, 12, 'aiVisibilityIndex');

    return { daily, weekly, monthly };
  }

  /**
   * Generate trend data for visualization
   */
  private generateTrendData(metrics: KPIMetrics[], periods: number, metric: keyof KPIMetrics): number[] {
    // Simulate trend data generation
    const trend: number[] = [];
    const baseValue = metrics[metrics.length - 1]?.[metric] as number || 0.5;

    for (let i = 0; i < periods; i++) {
      const variance = (Math.random() - 0.5) * 0.1;
      const value = Math.max(0, Math.min(1, baseValue + variance));
      trend.push(value);
    }

    return trend;
  }

  /**
   * Check platform-specific brand mentions
   */
  private async checkPlatformMentions(platform: string, brand: string): Promise<number> {
    // Simulate platform API calls
    // In production, use actual platform APIs

    const mockMentions = {
      [AI_PLATFORMS.CHATGPT]: Math.floor(Math.random() * 15) + 5,
      [AI_PLATFORMS.PERPLEXITY]: Math.floor(Math.random() * 10) + 3,
      [AI_PLATFORMS.CLAUDE]: Math.floor(Math.random() * 8) + 2,
      [AI_PLATFORMS.BARD]: Math.floor(Math.random() * 6) + 1,
      [AI_PLATFORMS.BING]: Math.floor(Math.random() * 12) + 4
    };

    return mockMentions[platform] || 0;
  }

  /**
   * Store metrics for historical tracking
   */
  private storeMetrics(url: string, metrics: KPIMetrics): void {
    const history = this.historicalData.get(url) || [];
    history.push(metrics);

    // Keep last 90 days of data
    if (history.length > 90) {
      history.shift();
    }

    this.historicalData.set(url, history);
  }

  /**
   * Get performance benchmarks
   */
  async getBenchmarkComparison(metrics: KPIMetrics): Promise<any> {
    const citationBenchmark = this.getBenchmarkLevel(metrics.citationShare, KPI_BENCHMARKS.CITATION_SHARE);
    const visibilityBenchmark = this.getBenchmarkLevel(metrics.aiVisibilityIndex, KPI_BENCHMARKS.AI_VISIBILITY);

    return {
      citationShare: {
        current: metrics.citationShare,
        benchmark: citationBenchmark,
        percentile: this.calculatePercentile(metrics.citationShare, KPI_BENCHMARKS.CITATION_SHARE)
      },
      aiVisibility: {
        current: metrics.aiVisibilityIndex,
        benchmark: visibilityBenchmark,
        percentile: this.calculatePercentile(metrics.aiVisibilityIndex, KPI_BENCHMARKS.AI_VISIBILITY)
      },
      recommendations: this.generateKPIRecommendations(metrics, citationBenchmark, visibilityBenchmark)
    };
  }

  /**
   * Determine benchmark level
   */
  private getBenchmarkLevel(value: number, benchmarks: any): string {
    if (value >= benchmarks.EXCELLENT) return 'Excellent';
    if (value >= benchmarks.GOOD) return 'Good';
    if (value >= benchmarks.AVERAGE) return 'Average';
    return 'Poor';
  }

  /**
   * Calculate percentile ranking
   */
  private calculatePercentile(value: number, benchmarks: any): number {
    if (value >= benchmarks.EXCELLENT) return 90;
    if (value >= benchmarks.GOOD) return 70;
    if (value >= benchmarks.AVERAGE) return 50;
    if (value >= benchmarks.POOR) return 30;
    return 10;
  }

  /**
   * Generate KPI-based recommendations
   */
  private generateKPIRecommendations(
    metrics: KPIMetrics,
    citationLevel: string,
    visibilityLevel: string
  ): string[] {
    const recommendations: string[] = [];

    if (citationLevel === 'Poor' || citationLevel === 'Average') {
      recommendations.push('Increase unique data points and original research to improve citation share');
      recommendations.push('Add more comprehensive coverage of topics to become a go-to resource');
    }

    if (metrics.brandMentions < 20) {
      recommendations.push('Strengthen brand entity with consistent mentions and schema markup');
      recommendations.push('Create branded methodologies or frameworks that AI systems will reference');
    }

    if (metrics.entityRecognition < 0.7) {
      recommendations.push('Improve entity disambiguation with clearer brand descriptions');
      recommendations.push('Build stronger entity relationships through co-occurrences and citations');
    }

    if (visibilityLevel !== 'Excellent') {
      recommendations.push('Optimize content structure for all major AI platforms');
      recommendations.push('Increase content freshness and update frequency');
    }

    // Trend-based recommendations
    const recentTrend = metrics.trends.weekly.slice(-2);
    if (recentTrend[1] < recentTrend[0]) {
      recommendations.push('Visibility trending downward - immediate content refresh recommended');
    }

    return recommendations;
  }

  /**
   * Export metrics for reporting
   */
  async exportMetrics(url: string, format: 'json' | 'csv' = 'json'): Promise<string> {
    const history = this.historicalData.get(url) || [];

    if (format === 'json') {
      return JSON.stringify(history, null, 2);
    }

    // CSV format
    const headers = ['Date', 'Citation Share', 'Brand Mentions', 'Entity Recognition', 'AI Visibility Index'];
    const rows = history.map(metric => [
      new Date().toISOString(),
      metric.citationShare.toFixed(3),
      metric.brandMentions.toString(),
      metric.entityRecognition.toFixed(3),
      metric.aiVisibilityIndex.toFixed(3)
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}