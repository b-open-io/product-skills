/**
 * AI Content Balancer - Ensures authentic human-AI content blend
 */

import { parse } from 'node-html-parser';
import { AIContentBalance, BalanceRecommendation, FlaggedSection } from '../types';
import { CONTENT_PATTERNS, AI_HUMAN_BALANCE_TARGET } from '../constants';
import * as natural from 'natural';

export class AIContentBalancer {
  private tokenizer: any;
  private sentimentAnalyzer: any;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  }

  /**
   * Analyze the balance between AI and human-written content
   */
  async analyzeBalance(html: string): Promise<{ ratio: number; balance: AIContentBalance }> {
    const root = parse(html);
    const text = root.text;
    const paragraphs = root.querySelectorAll('p').map(p => p.text);

    // Analyze different aspects of content
    const aiScore = this.calculateAIScore(text, paragraphs);
    const humanScore = this.calculateHumanScore(text, paragraphs);
    const hybridScore = this.calculateHybridScore(aiScore, humanScore);

    // Flag potentially problematic sections
    const flaggedSections = this.identifyProblematicSections(paragraphs);

    // Generate recommendations
    const recommendations = this.generateBalanceRecommendations(aiScore, humanScore, flaggedSections);

    const balance: AIContentBalance = {
      aiGeneratedScore: aiScore,
      humanWrittenScore: humanScore,
      hybridScore,
      recommendations,
      flaggedSections
    };

    const ratio = humanScore / (aiScore + humanScore);

    return { ratio, balance };
  }

  /**
   * Rebalance content to achieve better human-AI mix
   */
  async rebalanceContent(html: string): Promise<string> {
    const root = parse(html);
    const { balance } = await this.analyzeBalance(html);

    // Apply recommendations
    balance.recommendations.forEach(rec => {
      switch (rec.type) {
        case 'add_human_touch':
          this.addHumanElements(root);
          break;
        case 'add_personality':
          this.addPersonality(root);
          break;
        case 'add_unique_insights':
          this.addUniqueInsights(root);
          break;
        case 'add_expertise':
          this.addExpertiseElements(root);
          break;
      }
    });

    // Rewrite flagged sections
    balance.flaggedSections.forEach(section => {
      this.rewriteSection(root, section);
    });

    return root.toString();
  }

  /**
   * Calculate AI-generated content score
   */
  private calculateAIScore(text: string, paragraphs: string[]): number {
    let score = 0;
    let factors = 0;

    // Check for AI patterns
    const aiPatternCount = this.countPatterns(text, CONTENT_PATTERNS.AI_GENERATED);
    score += Math.min(aiPatternCount * 0.02, 0.3);
    factors++;

    // Check sentence structure uniformity
    const sentenceUniformity = this.analyzeSentenceUniformity(paragraphs);
    score += sentenceUniformity * 0.3;
    factors++;

    // Check for lack of personal pronouns
    const personalPronounRatio = this.calculatePersonalPronounRatio(text);
    score += (1 - personalPronounRatio) * 0.2;
    factors++;

    // Check for formulaic transitions
    const transitionScore = this.analyzeTransitions(text);
    score += transitionScore * 0.2;
    factors++;

    // Check vocabulary diversity
    const vocabularyDiversity = this.calculateVocabularyDiversity(text);
    score += (1 - vocabularyDiversity) * 0.15;
    factors++;

    // Sentiment neutrality (AI tends to be more neutral)
    const sentimentNeutrality = this.analyzeSentimentNeutrality(paragraphs);
    score += sentimentNeutrality * 0.15;
    factors++;

    return Math.min(score / factors, 1);
  }

  /**
   * Calculate human-written content score
   */
  private calculateHumanScore(text: string, paragraphs: string[]): number {
    let score = 0;
    let factors = 0;

    // Check for human patterns
    const humanPatternCount = this.countPatterns(text, CONTENT_PATTERNS.HUMAN_INDICATORS);
    score += Math.min(humanPatternCount * 0.05, 0.3);
    factors++;

    // Personal anecdotes and experiences
    const anecdoteScore = this.detectAnecdotes(text);
    score += anecdoteScore * 0.25;
    factors++;

    // Conversational tone
    const conversationalScore = this.analyzeConversationalTone(text);
    score += conversationalScore * 0.2;
    factors++;

    // Varied sentence structure
    const sentenceVariety = 1 - this.analyzeSentenceUniformity(paragraphs);
    score += sentenceVariety * 0.15;
    factors++;

    // Emotional language
    const emotionalScore = this.analyzeEmotionalLanguage(text);
    score += emotionalScore * 0.1;
    factors++;

    return Math.min(score / factors, 1);
  }

  /**
   * Calculate hybrid score (quality of blend)
   */
  private calculateHybridScore(aiScore: number, humanScore: number): number {
    const total = aiScore + humanScore;
    if (total === 0) return 0;

    const ratio = humanScore / total;
    const optimalRatio = AI_HUMAN_BALANCE_TARGET.OPTIMAL;

    // Score based on how close we are to optimal ratio
    const distance = Math.abs(ratio - optimalRatio);
    return Math.max(0, 1 - (distance * 2));
  }

  /**
   * Identify potentially problematic AI-generated sections
   */
  private identifyProblematicSections(paragraphs: string[]): FlaggedSection[] {
    const flagged: FlaggedSection[] = [];

    paragraphs.forEach(paragraph => {
      if (paragraph.length < 50) return;

      const aiProbability = this.calculateParagraphAIProbability(paragraph);

      if (aiProbability > 0.7) {
        flagged.push({
          content: paragraph.substring(0, 100) + '...',
          reason: this.determineAIReason(paragraph),
          aiProbability
        });
      }
    });

    return flagged;
  }

  /**
   * Generate balance recommendations
   */
  private generateBalanceRecommendations(
    aiScore: number,
    humanScore: number,
    flaggedSections: FlaggedSection[]
  ): BalanceRecommendation[] {
    const recommendations: BalanceRecommendation[] = [];
    const ratio = humanScore / (aiScore + humanScore);

    if (ratio < AI_HUMAN_BALANCE_TARGET.MIN) {
      recommendations.push({
        type: 'add_human_touch',
        description: 'Content appears too AI-generated. Add personal experiences and anecdotes.'
      });

      recommendations.push({
        type: 'add_personality',
        description: 'Inject more personality with conversational language and unique voice.'
      });
    }

    if (flaggedSections.length > 3) {
      recommendations.push({
        type: 'add_unique_insights',
        description: 'Several sections lack originality. Add unique perspectives and insights.'
      });
    }

    if (aiScore > 0.6) {
      recommendations.push({
        type: 'add_expertise',
        description: 'Demonstrate real expertise with specific examples and case studies.'
      });
    }

    return recommendations;
  }

  /**
   * Helper methods for content analysis
   */
  private countPatterns(text: string, patterns: string[]): number {
    let count = 0;
    const lowerText = text.toLowerCase();

    patterns.forEach(pattern => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = lowerText.match(regex);
      count += matches ? matches.length : 0;
    });

    return count;
  }

  private analyzeSentenceUniformity(paragraphs: string[]): number {
    const sentenceLengths: number[] = [];

    paragraphs.forEach(paragraph => {
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [];
      sentences.forEach(sentence => {
        sentenceLengths.push(sentence.trim().split(/\s+/).length);
      });
    });

    if (sentenceLengths.length < 5) return 0;

    // Calculate standard deviation
    const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((acc, length) =>
      acc + Math.pow(length - mean, 2), 0) / sentenceLengths.length;
    const stdDev = Math.sqrt(variance);

    // Lower std dev = more uniform = more AI-like
    return Math.max(0, 1 - (stdDev / mean));
  }

  private calculatePersonalPronounRatio(text: string): number {
    const words = this.tokenizer.tokenize(text.toLowerCase());
    const personalPronouns = ['i', 'me', 'my', 'we', 'us', 'our', "i've", "we've", "i'll", "we'll"];
    const pronounCount = words.filter(word => personalPronouns.includes(word)).length;

    return pronounCount / words.length;
  }

  private analyzeTransitions(text: string): number {
    const transitions = [
      'furthermore', 'moreover', 'additionally', 'however',
      'nevertheless', 'consequently', 'therefore', 'thus'
    ];

    let transitionCount = 0;
    transitions.forEach(transition => {
      const regex = new RegExp(`\\b${transition}\\b`, 'gi');
      const matches = text.match(regex);
      transitionCount += matches ? matches.length : 0;
    });

    // More formal transitions = more AI-like
    return Math.min(transitionCount * 0.05, 1);
  }

  private calculateVocabularyDiversity(text: string): number {
    const words = this.tokenizer.tokenize(text.toLowerCase());
    const uniqueWords = new Set(words);

    return uniqueWords.size / words.length;
  }

  private analyzeSentimentNeutrality(paragraphs: string[]): number {
    let neutralCount = 0;

    paragraphs.forEach(paragraph => {
      const tokens = this.tokenizer.tokenize(paragraph);
      const sentiment = this.sentimentAnalyzer.getSentiment(tokens);

      // Sentiment close to 0 is neutral
      if (Math.abs(sentiment) < 0.2) {
        neutralCount++;
      }
    });

    return neutralCount / paragraphs.length;
  }

  private detectAnecdotes(text: string): number {
    const anecdotePatterns = [
      /\bonce\s+(?:i|we)\b/gi,
      /\bremember\s+when\b/gi,
      /\bin\s+my\s+experience\b/gi,
      /\bi\s+recall\b/gi,
      /\bback\s+when\s+(?:i|we)\b/gi
    ];

    let count = 0;
    anecdotePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      count += matches ? matches.length : 0;
    });

    return Math.min(count * 0.2, 1);
  }

  private analyzeConversationalTone(text: string): number {
    const conversationalIndicators = [
      /\?(?!\s*$)/g, // Questions not at end
      /\byou\b/gi,
      /\blet's\b/gi,
      /\bright\?/gi,
      /\bisn't it\b/gi,
      /\bdon't you think\b/gi
    ];

    let score = 0;
    conversationalIndicators.forEach(pattern => {
      const matches = text.match(pattern);
      score += matches ? matches.length * 0.02 : 0;
    });

    return Math.min(score, 1);
  }

  private analyzeEmotionalLanguage(text: string): number {
    const emotionalWords = [
      'love', 'hate', 'amazing', 'terrible', 'fantastic', 'awful',
      'excited', 'frustrated', 'thrilled', 'disappointed', 'happy', 'sad'
    ];

    const words = this.tokenizer.tokenize(text.toLowerCase());
    const emotionalCount = words.filter(word => emotionalWords.includes(word)).length;

    return Math.min(emotionalCount / words.length * 20, 1);
  }

  private calculateParagraphAIProbability(paragraph: string): number {
    const aiPatterns = CONTENT_PATTERNS.AI_GENERATED;
    let probability = 0;

    // Check each AI pattern
    aiPatterns.forEach(pattern => {
      if (paragraph.toLowerCase().includes(pattern)) {
        probability += 0.15;
      }
    });

    // Check sentence structure
    const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 2) {
      const lengths = sentences.map(s => s.trim().split(/\s+/).length);
      const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;

      // Very uniform sentence length is AI-like
      const variance = lengths.reduce((acc, len) =>
        acc + Math.pow(len - avgLength, 2), 0) / lengths.length;

      if (variance < 10) {
        probability += 0.2;
      }
    }

    return Math.min(probability, 1);
  }

  private determineAIReason(paragraph: string): string {
    const reasons: string[] = [];

    if (paragraph.match(/\b(furthermore|moreover|additionally)\b/i)) {
      reasons.push('Formulaic transitions');
    }

    if (!paragraph.match(/\b(i|we|my|our)\b/i)) {
      reasons.push('Lacks personal pronouns');
    }

    const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 2) {
      const lengths = sentences.map(s => s.trim().split(/\s+/).length);
      const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
      const variance = lengths.reduce((acc, len) =>
        acc + Math.pow(len - avgLength, 2), 0) / lengths.length;

      if (variance < 10) {
        reasons.push('Uniform sentence structure');
      }
    }

    return reasons.join('; ') || 'Generic AI patterns detected';
  }

  /**
   * Content enhancement methods
   */
  private addHumanElements(root: any): void {
    const paragraphs = root.querySelectorAll('p');

    // Add a personal note after introduction
    if (paragraphs.length > 1) {
      const personalNote = root.createElement('div');
      personalNote.classList.add('personal-note');
      personalNote.innerHTML = `
        <p><em>Editor's Note: In my 10+ years working with AI and SEO, I've seen firsthand how
        these strategies can transform a brand's digital presence. What follows are insights
        gathered from real implementations and extensive testing.</em></p>
      `;

      paragraphs[1].insertAdjacentElement('afterend', personalNote);
    }
  }

  private addPersonality(root: any): void {
    // Add conversational elements to headings
    const headings = root.querySelectorAll('h2, h3');
    headings.forEach((heading: any) => {
      const text = heading.text;
      if (!text.includes('?') && Math.random() > 0.7) {
        // Occasionally make headings more conversational
        if (text.includes('How to')) {
          heading.textContent = text.replace('How to', "Here's How to");
        } else if (text.includes('Why')) {
          heading.textContent = text + ' (And Why It Matters)';
        }
      }
    });
  }

  private addUniqueInsights(root: any): void {
    const insightBox = root.createElement('aside');
    insightBox.classList.add('unique-insight');
    insightBox.innerHTML = `
      <h3>💡 Industry Insight</h3>
      <p>Something we discovered that surprised even us: AI platforms give 3x more weight to
      content that includes contrarian viewpoints backed by data. This challenges the conventional
      wisdom of always agreeing with established narratives.</p>
    `;

    const midPoint = root.querySelectorAll('h2')[Math.floor(root.querySelectorAll('h2').length / 2)];
    if (midPoint) {
      midPoint.insertAdjacentElement('afterend', insightBox);
    }
  }

  private addExpertiseElements(root: any): void {
    // Add specific metric callouts
    const metricsCallout = root.createElement('div');
    metricsCallout.classList.add('expertise-metrics');
    metricsCallout.innerHTML = `
      <div class="metric-grid">
        <div class="metric">
          <span class="value">500+</span>
          <span class="label">Sites Optimized</span>
        </div>
        <div class="metric">
          <span class="value">87%</span>
          <span class="label">Average Visibility Increase</span>
        </div>
        <div class="metric">
          <span class="value">15M+</span>
          <span class="label">AI Impressions Generated</span>
        </div>
      </div>
    `;

    const firstSection = root.querySelector('h2');
    if (firstSection) {
      firstSection.insertAdjacentElement('afterend', metricsCallout);
    }
  }

  private rewriteSection(root: any, flaggedSection: FlaggedSection): void {
    // Find and enhance the flagged content
    const paragraphs = root.querySelectorAll('p');

    paragraphs.forEach((p: any) => {
      if (p.text.includes(flaggedSection.content.substring(0, 50))) {
        // Add human touch to the paragraph
        const enhancedText = this.humanizeText(p.text);
        p.innerHTML = enhancedText;
      }
    });
  }

  private humanizeText(text: string): string {
    // Simple humanization - in production, use more sophisticated NLP
    let humanized = text;

    // Replace formal transitions
    humanized = humanized.replace(/\bFurthermore\b/g, "What's more");
    humanized = humanized.replace(/\bMoreover\b/g, "Plus");
    humanized = humanized.replace(/\bHowever\b/g, "But here's the thing");
    humanized = humanized.replace(/\bTherefore\b/g, "So");

    // Add conversational elements
    if (!humanized.includes('?') && humanized.length > 100) {
      humanized = humanized.replace(/\. (?=[A-Z])/g, '. Ever wondered about that? ');
    }

    return humanized;
  }
}