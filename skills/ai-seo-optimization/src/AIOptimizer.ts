/**
 * Main AI Optimizer class that orchestrates all optimization strategies
 */

import { AIOptimizerConfig, ContentAnalysis, KPIMetrics } from './types';
import { EntityOptimizer } from './optimizers/EntityOptimizer';
import { ContentStructurer } from './optimizers/ContentStructurer';
import { EEATSignalBuilder } from './optimizers/EEATSignalBuilder';
import { AIContentBalancer } from './optimizers/AIContentBalancer';
import { AICitationAnalyzer } from './analyzers/AICitationAnalyzer';
import { MultiPlatformAnalyzer } from './analyzers/MultiPlatformAnalyzer';
import { KPITracker } from './analyzers/KPITracker';
import { FreshnessMonitor } from './monitors/FreshnessMonitor';

export class AIOptimizer {
  private config: AIOptimizerConfig;
  private entityOptimizer: EntityOptimizer;
  private contentStructurer: ContentStructurer;
  private eeatBuilder: EEATSignalBuilder;
  private contentBalancer: AIContentBalancer;
  private citationAnalyzer: AICitationAnalyzer;
  private platformAnalyzer: MultiPlatformAnalyzer;
  private kpiTracker: KPITracker;
  private freshnessMonitor: FreshnessMonitor;

  constructor(config: AIOptimizerConfig) {
    this.config = config;
    this.entityOptimizer = new EntityOptimizer(config);
    this.contentStructurer = new ContentStructurer();
    this.eeatBuilder = new EEATSignalBuilder();
    this.contentBalancer = new AIContentBalancer();
    this.citationAnalyzer = new AICitationAnalyzer(config);
    this.platformAnalyzer = new MultiPlatformAnalyzer(config);
    this.kpiTracker = new KPITracker(config);
    this.freshnessMonitor = new FreshnessMonitor();
  }

  /**
   * Analyze content for AI SEO optimization opportunities
   */
  async analyzeContent(html: string, url: string): Promise<ContentAnalysis> {
    const [
      entityScore,
      structure,
      eeatSignals,
      freshness,
      aiHumanBalance,
      citationPotential
    ] = await Promise.all([
      this.entityOptimizer.analyzeEntities(html),
      this.contentStructurer.analyzeStructure(html),
      this.eeatBuilder.analyzeEEATSignals(html),
      this.freshnessMonitor.checkFreshness(html, url),
      this.contentBalancer.analyzeBalance(html),
      this.citationAnalyzer.analyzeCitationPotential(html)
    ]);

    const recommendations = this.generateRecommendations({
      entityScore,
      structure,
      eeatSignals,
      freshness,
      aiHumanBalance,
      citationPotential
    });

    return {
      entityScore: entityScore.score,
      aiCitationPotential: citationPotential.score,
      structureScore: structure.score,
      eeatSignals,
      freshness,
      aiHumanBalance: aiHumanBalance.ratio,
      recommendations
    };
  }

  /**
   * Apply AI SEO optimizations to content
   */
  async optimizeContent(html: string, analysis: ContentAnalysis): Promise<string> {
    let optimizedHtml = html;

    // Apply entity optimization
    optimizedHtml = await this.entityOptimizer.enhanceEntities(optimizedHtml);

    // Structure content for AI parsing
    optimizedHtml = await this.contentStructurer.restructureContent(optimizedHtml);

    // Add E-E-A-T signals
    optimizedHtml = await this.eeatBuilder.enhanceEEATSignals(optimizedHtml);

    // Balance AI and human content
    if (analysis.aiHumanBalance < 0.3 || analysis.aiHumanBalance > 0.7) {
      optimizedHtml = await this.contentBalancer.rebalanceContent(optimizedHtml);
    }

    return optimizedHtml;
  }

  /**
   * Track KPIs across AI platforms
   */
  async trackKPIs(url: string): Promise<KPIMetrics> {
    return this.kpiTracker.trackMetrics(url);
  }

  /**
   * Monitor content across multiple AI platforms
   */
  async monitorPlatforms(url: string, queries: string[]): Promise<any> {
    return this.platformAnalyzer.analyzeAcrossPlatforms(url, queries);
  }

  /**
   * Generate optimization recommendations based on analysis
   */
  private generateRecommendations(analysisData: any): any[] {
    const recommendations = [];

    if (analysisData.entityScore.score < 0.6) {
      recommendations.push({
        type: 'add_schema',
        priority: 'high',
        description: 'Add comprehensive schema markup to enhance entity recognition',
        implementation: 'Use EntityOptimizer.generateSchema() to create appropriate schemas',
        estimatedImpact: 0.25
      });
    }

    if (analysisData.structure.score < 0.7) {
      recommendations.push({
        type: 'improve_structure',
        priority: 'medium',
        description: 'Restructure content with FAQs, tables, and lists for better AI parsing',
        implementation: 'Apply ContentStructurer.restructureContent() to improve formatting',
        estimatedImpact: 0.2
      });
    }

    if (analysisData.eeatSignals.authoritativeness < 0.5) {
      recommendations.push({
        type: 'add_author_bio',
        priority: 'high',
        description: 'Add detailed author bios with credentials and expertise signals',
        implementation: 'Use EEATSignalBuilder.createAuthorBio() with proper schema',
        estimatedImpact: 0.3
      });
    }

    if (analysisData.freshness.updateUrgency === 'high' || analysisData.freshness.updateUrgency === 'critical') {
      recommendations.push({
        type: 'update_content',
        priority: 'high',
        description: 'Content is stale compared to competitors, requires immediate update',
        implementation: 'Use FreshnessMonitor.suggestUpdates() for specific update recommendations',
        estimatedImpact: 0.35
      });
    }

    return recommendations;
  }
}