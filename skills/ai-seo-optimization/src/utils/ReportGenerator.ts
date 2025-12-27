/**
 * Report Generator - Creates comprehensive AI SEO reports
 */

import { ContentAnalysis, KPIMetrics, MultiPlatformOptimization } from '../types';
import { KPI_BENCHMARKS } from '../constants';

export class ReportGenerator {
  /**
   * Generate comprehensive AI SEO report
   */
  async generateReport(data: {
    url: string;
    analysis: ContentAnalysis;
    kpis: KPIMetrics;
    platformAnalysis: MultiPlatformOptimization[];
    updateSuggestions: any;
  }): Promise<string> {
    const report = [
      this.generateHeader(data.url),
      this.generateExecutiveSummary(data),
      this.generateScorecard(data.analysis, data.kpis),
      this.generateAnalysisSection(data.analysis),
      this.generateKPISection(data.kpis),
      this.generatePlatformSection(data.platformAnalysis),
      this.generateRecommendations(data.analysis, data.updateSuggestions),
      this.generateActionPlan(data.updateSuggestions),
      this.generateAppendix()
    ].join('\n\n');

    return report;
  }

  /**
   * Generate report header
   */
  private generateHeader(url: string): string {
    return `# AI SEO Optimization Report

**URL:** ${url}
**Date:** ${new Date().toLocaleDateString()}
**Report Version:** 2.0 (2025 AI-First Edition)

---`;
  }

  /**
   * Generate executive summary
   */
  private generateExecutiveSummary(data: any): string {
    const overallScore = this.calculateOverallScore(data.analysis, data.kpis);
    const performance = this.getPerformanceLevel(overallScore);

    return `## Executive Summary

### Overall Performance: ${performance} (${(overallScore * 100).toFixed(1)}%)

**Key Findings:**
- Entity Optimization: ${this.getStatusEmoji(data.analysis.entityScore)} ${(data.analysis.entityScore * 100).toFixed(1)}%
- AI Citation Potential: ${this.getStatusEmoji(data.analysis.aiCitationPotential)} ${(data.analysis.aiCitationPotential * 100).toFixed(1)}%
- E-E-A-T Signals: ${this.getStatusEmoji(data.analysis.eeatSignals.expertise)} ${this.calculateEEATAverage(data.analysis.eeatSignals).toFixed(1)}%
- Content Freshness: ${this.getStatusEmoji(data.analysis.freshness.score)} ${data.analysis.freshness.updateUrgency.toUpperCase()}

**Top Opportunities:**
${data.analysis.recommendations
  .filter(r => r.priority === 'high')
  .slice(0, 3)
  .map(r => `- ${r.description} (Impact: ${(r.estimatedImpact * 100).toFixed(0)}%)`)
  .join('\n')}`;
  }

  /**
   * Generate scorecard section
   */
  private generateScorecard(analysis: ContentAnalysis, kpis: KPIMetrics): string {
    return `## AI SEO Scorecard

| Metric | Score | Status | Benchmark |
|--------|-------|--------|-----------|
| **Entity Recognition** | ${(analysis.entityScore * 100).toFixed(1)}% | ${this.getStatus(analysis.entityScore)} | Industry Avg: 65% |
| **AI Citation Potential** | ${(analysis.aiCitationPotential * 100).toFixed(1)}% | ${this.getStatus(analysis.aiCitationPotential)} | Target: 75% |
| **Content Structure** | ${(analysis.structureScore * 100).toFixed(1)}% | ${this.getStatus(analysis.structureScore)} | Best Practice: 80% |
| **E-E-A-T Score** | ${this.calculateEEATAverage(analysis.eeatSignals).toFixed(1)}% | ${this.getStatus(this.calculateEEATAverage(analysis.eeatSignals) / 100)} | Required: 70% |
| **AI-Human Balance** | ${(analysis.aiHumanBalance * 100).toFixed(1)}% | ${this.getBalanceStatus(analysis.aiHumanBalance)} | Optimal: 50% |
| **Citation Share** | ${(kpis.citationShare * 100).toFixed(1)}% | ${this.getBenchmarkStatus(kpis.citationShare, KPI_BENCHMARKS.CITATION_SHARE)} | Top 10%: 35% |
| **AI Visibility Index** | ${(kpis.aiVisibilityIndex * 100).toFixed(1)}% | ${this.getBenchmarkStatus(kpis.aiVisibilityIndex, KPI_BENCHMARKS.AI_VISIBILITY)} | Top 10%: 80% |`;
  }

  /**
   * Generate detailed analysis section
   */
  private generateAnalysisSection(analysis: ContentAnalysis): string {
    return `## Detailed Analysis

### 1. Entity Optimization (${(analysis.entityScore * 100).toFixed(1)}%)

${this.getEntityAnalysis(analysis)}

### 2. E-E-A-T Signals

| Component | Score | Signals Found |
|-----------|-------|---------------|
| **Expertise** | ${(analysis.eeatSignals.expertise * 100).toFixed(1)}% | ${this.countSignalsByType(analysis.eeatSignals.signals, 'credential')} credentials |
| **Experience** | ${(analysis.eeatSignals.experience * 100).toFixed(1)}% | ${this.countSignalsByType(analysis.eeatSignals.signals, 'experience')} indicators |
| **Authoritativeness** | ${(analysis.eeatSignals.authoritativeness * 100).toFixed(1)}% | ${this.countSignalsByType(analysis.eeatSignals.signals, 'citation')} citations |
| **Trustworthiness** | ${(analysis.eeatSignals.trustworthiness * 100).toFixed(1)}% | ${this.countSignalsByType(analysis.eeatSignals.signals, 'social_proof')} trust signals |

### 3. Content Structure Analysis

${this.getStructureAnalysis(analysis)}

### 4. Content Freshness

- **Last Updated:** ${analysis.freshness.lastUpdated.toLocaleDateString()}
- **Competitor Average:** ${analysis.freshness.competitorAverage} days old
- **Update Priority:** ${analysis.freshness.updateUrgency.toUpperCase()}
- **Freshness Score:** ${(analysis.freshness.score * 100).toFixed(1)}%`;
  }

  /**
   * Generate KPI section
   */
  private generateKPISection(kpis: KPIMetrics): string {
    const trend = this.analyzeTrend(kpis.trends.weekly);

    return `## Key Performance Indicators

### Citation Metrics
- **Citation Share:** ${(kpis.citationShare * 100).toFixed(1)}% ${this.getTrendEmoji(trend)}
- **Brand Mentions:** ${kpis.brandMentions} across AI platforms
- **Entity Recognition:** ${(kpis.entityRecognition * 100).toFixed(1)}%

### Visibility Trends
- **Current AI Visibility:** ${(kpis.aiVisibilityIndex * 100).toFixed(1)}%
- **7-Day Trend:** ${trend > 0 ? '+' : ''}${(trend * 100).toFixed(1)}%
- **Performance:** ${this.getVisibilityPerformance(kpis.aiVisibilityIndex)}

### Weekly Performance Chart
\`\`\`
${this.generateASCIIChart(kpis.trends.weekly)}
\`\`\``;
  }

  /**
   * Generate platform analysis section
   */
  private generatePlatformSection(platforms: MultiPlatformOptimization[]): string {
    const sortedPlatforms = platforms.sort((a, b) => b.score - a.score);

    let section = `## Multi-Platform Analysis\n\n`;

    sortedPlatforms.forEach(platform => {
      section += `### ${this.formatPlatformName(platform.platform)} (Score: ${(platform.score * 100).toFixed(1)}%)

**Visibility Status:**
- Indexed: ${platform.visibility.indexed ? '✅ Yes' : '❌ No'}
- Citation Frequency: ${platform.visibility.citationFrequency} times
- Average Position: #${platform.visibility.averagePosition}

**Top Recommendations:**
${platform.recommendations
  .filter(r => r.priority === 'high')
  .slice(0, 2)
  .map(r => `- ${r.description}`)
  .join('\n')}

`;
    });

    return section;
  }

  /**
   * Generate recommendations section
   */
  private generateRecommendations(analysis: ContentAnalysis, updateSuggestions: any): string {
    const prioritizedRecs = this.prioritizeAllRecommendations(analysis.recommendations, updateSuggestions);

    return `## Recommendations

### 🚨 Critical Actions (Do This Week)
${prioritizedRecs.critical.map(r => `- **${r.type}:** ${r.description}`).join('\n')}

### ⚡ Quick Wins (1-2 Hours Each)
${prioritizedRecs.quickWins.map(r => `- ${r.description}`).join('\n')}

### 📈 Strategic Improvements (2-4 Weeks)
${prioritizedRecs.strategic.map(r => `- ${r.description}`).join('\n')}`;
  }

  /**
   * Generate action plan
   */
  private generateActionPlan(updateSuggestions: any): string {
    if (!updateSuggestions.timeline) return '';

    return `## Implementation Action Plan

${updateSuggestions.timeline.map((phase: any) => `### ${phase.period}
**Focus:** ${phase.focus}

${phase.tasks.map((task: any) => `- [ ] ${task.action}`).join('\n')}`).join('\n\n')}

### Estimated Impact
- **Overall Impact:** ${(updateSuggestions.impact.overallImpact * 100).toFixed(0)}% improvement potential
- **Visibility Increase:** ${updateSuggestions.impact.visibilityIncrease}
- **Time to Results:** ${updateSuggestions.impact.timeToResults}`;
  }

  /**
   * Generate appendix
   */
  private generateAppendix(): string {
    return `## Appendix

### Glossary
- **Entity Score:** How well search engines understand your brand/organization
- **Citation Share:** Percentage of relevant queries where your content is cited
- **E-E-A-T:** Expertise, Experience, Authoritativeness, Trustworthiness
- **AI Visibility Index:** Composite score of presence across AI platforms

### Methodology
This report uses advanced AI SEO analysis incorporating:
- Natural language processing for content analysis
- Multi-platform visibility tracking
- Competitive benchmarking
- 2025 best practices for AI optimization

### Next Steps
1. Review and prioritize recommendations
2. Implement quick wins immediately
3. Schedule strategic improvements
4. Set up monitoring for KPIs
5. Re-analyze in 30 days

---
*Generated by AI SEO Optimization Skill v1.0*`;
  }

  /**
   * Helper methods
   */
  private calculateOverallScore(analysis: ContentAnalysis, kpis: KPIMetrics): number {
    const weights = {
      entity: 0.2,
      citation: 0.25,
      structure: 0.15,
      eeat: 0.2,
      visibility: 0.2
    };

    const scores = {
      entity: analysis.entityScore,
      citation: analysis.aiCitationPotential,
      structure: analysis.structureScore,
      eeat: this.calculateEEATAverage(analysis.eeatSignals) / 100,
      visibility: kpis.aiVisibilityIndex
    };

    let overall = 0;
    Object.entries(weights).forEach(([key, weight]) => {
      overall += scores[key as keyof typeof scores] * weight;
    });

    return overall;
  }

  private calculateEEATAverage(eeat: any): number {
    return ((eeat.expertise + eeat.experience + eeat.authoritativeness + eeat.trustworthiness) / 4) * 100;
  }

  private getPerformanceLevel(score: number): string {
    if (score >= 0.8) return 'EXCELLENT';
    if (score >= 0.6) return 'GOOD';
    if (score >= 0.4) return 'AVERAGE';
    return 'NEEDS IMPROVEMENT';
  }

  private getStatus(score: number): string {
    if (score >= 0.8) return '🟢 Excellent';
    if (score >= 0.6) return '🟡 Good';
    if (score >= 0.4) return '🟠 Fair';
    return '🔴 Poor';
  }

  private getStatusEmoji(score: number): string {
    if (score >= 0.8) return '✅';
    if (score >= 0.6) return '⚠️';
    return '❌';
  }

  private getBalanceStatus(ratio: number): string {
    const distance = Math.abs(ratio - 0.5);
    if (distance < 0.1) return '🟢 Optimal';
    if (distance < 0.2) return '🟡 Good';
    return '🔴 Imbalanced';
  }

  private getBenchmarkStatus(value: number, benchmarks: any): string {
    if (value >= benchmarks.EXCELLENT) return '🟢 Top 10%';
    if (value >= benchmarks.GOOD) return '🟡 Top 25%';
    if (value >= benchmarks.AVERAGE) return '🟠 Average';
    return '🔴 Below Average';
  }

  private getTrendEmoji(trend: number): string {
    if (trend > 0.05) return '📈';
    if (trend < -0.05) return '📉';
    return '➡️';
  }

  private analyzeTrend(data: number[]): number {
    if (data.length < 2) return 0;
    const recent = data.slice(-Math.min(3, data.length));
    const earlier = data.slice(0, Math.min(3, data.length));
    const recentAvg = recent.reduce((a, b) => a + b) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b) / earlier.length;
    return (recentAvg - earlierAvg) / earlierAvg;
  }

  private generateASCIIChart(data: number[]): string {
    const maxValue = Math.max(...data);
    const height = 5;
    const chart: string[] = [];

    for (let i = height; i > 0; i--) {
      let row = '';
      for (const value of data) {
        const barHeight = Math.round((value / maxValue) * height);
        row += barHeight >= i ? '█' : ' ';
      }
      chart.push(row);
    }

    return chart.join('\n');
  }

  private countSignalsByType(signals: any[], type: string): number {
    return signals.filter(s => s.type === type).length;
  }

  private getEntityAnalysis(analysis: any): string {
    if (analysis.entityScore > 0.7) {
      return 'Strong entity presence detected with comprehensive schema markup and consistent brand signals.';
    } else if (analysis.entityScore > 0.4) {
      return 'Moderate entity presence. Additional schema markup and brand building recommended.';
    }
    return 'Weak entity presence. Immediate entity optimization required for AI visibility.';
  }

  private getStructureAnalysis(analysis: any): string {
    if (analysis.structureScore > 0.7) {
      return 'Well-structured content optimized for AI parsing with proper headings, lists, and FAQs.';
    } else if (analysis.structureScore > 0.4) {
      return 'Adequate structure but improvements needed in content organization and formatting.';
    }
    return 'Poor content structure hindering AI comprehension. Major restructuring required.';
  }

  private formatPlatformName(platform: string): string {
    const names: Record<string, string> = {
      google_ai_overview: 'Google AI Overview',
      chatgpt: 'ChatGPT',
      perplexity: 'Perplexity AI',
      gemini: 'Google Gemini',
      bing_chat: 'Bing Chat'
    };
    return names[platform] || platform;
  }

  private getVisibilityPerformance(index: number): string {
    if (index >= 0.8) return 'Leading in AI visibility';
    if (index >= 0.6) return 'Strong AI presence';
    if (index >= 0.4) return 'Moderate visibility';
    return 'Limited AI visibility';
  }

  private prioritizeAllRecommendations(analysisRecs: any[], updateSuggestions: any): any {
    const all = [...analysisRecs];

    if (updateSuggestions.suggestions) {
      Object.values(updateSuggestions.suggestions).forEach((category: any) => {
        all.push(...category);
      });
    }

    return {
      critical: all.filter(r => r.priority === 'high' || r.priority === 'urgent').slice(0, 3),
      quickWins: all.filter(r => r.effort === 'low' && r.priority !== 'low').slice(0, 3),
      strategic: all.filter(r => r.priority === 'medium' && r.effort !== 'low').slice(0, 3)
    };
  }
}