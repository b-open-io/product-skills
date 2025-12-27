/**
 * AI Content Detector - Utility for detecting AI-generated content
 */

import * as natural from 'natural';
import { CONTENT_PATTERNS } from '../constants';

export class AIDetector {
  private tokenizer: any;
  private sentimentAnalyzer: any;
  private tfidf: any;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    this.tfidf = new natural.TfIdf();
  }

  /**
   * Detect if content is likely AI-generated
   */
  async detectAIContent(text: string): Promise<{
    isAIGenerated: boolean;
    confidence: number;
    indicators: string[];
  }> {
    const features = await this.extractFeatures(text);
    const confidence = this.calculateAIConfidence(features);
    const indicators = this.identifyAIIndicators(features);

    return {
      isAIGenerated: confidence > 0.6,
      confidence,
      indicators
    };
  }

  /**
   * Extract linguistic features for AI detection
   */
  private async extractFeatures(text: string): Promise<any> {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const words = this.tokenizer.tokenize(text.toLowerCase());
    const paragraphs = text.split(/\n\n+/);

    return {
      // Lexical features
      avgWordLength: this.calculateAverageWordLength(words),
      vocabularyRichness: this.calculateVocabularyRichness(words),
      wordFrequencyDistribution: this.analyzeWordFrequency(words),

      // Syntactic features
      avgSentenceLength: words.length / sentences.length,
      sentenceLengthVariance: this.calculateSentenceLengthVariance(sentences),
      punctuationDensity: this.calculatePunctuationDensity(text),

      // Semantic features
      sentimentConsistency: this.analyzeSentimentConsistency(sentences),
      topicCoherence: this.analyzeTopicCoherence(paragraphs),
      transitionPatterns: this.analyzeTransitions(text),

      // Stylistic features
      personalPronounRatio: this.calculatePersonalPronounRatio(words),
      passiveVoiceRatio: this.detectPassiveVoice(sentences),
      hedgingLanguage: this.detectHedgingLanguage(text),

      // AI-specific patterns
      formulaicPhrases: this.countFormulaicPhrases(text),
      repetitiveStructures: this.detectRepetitiveStructures(sentences),
      unnaturalPerfection: this.detectUnnaturalPerfection(text)
    };
  }

  /**
   * Calculate AI confidence score based on features
   */
  private calculateAIConfidence(features: any): number {
    let score = 0;
    const weights = {
      vocabularyRichness: -0.15,      // Lower is more AI-like
      sentenceLengthVariance: -0.20,  // Lower variance is more AI-like
      sentimentConsistency: 0.15,     // Higher consistency is more AI-like
      personalPronounRatio: -0.10,    // Lower ratio is more AI-like
      formulaicPhrases: 0.25,         // More formulaic phrases indicate AI
      repetitiveStructures: 0.20,     // More repetition indicates AI
      unnaturalPerfection: 0.15       // Perfect grammar/structure indicates AI
    };

    // Apply weighted scoring
    Object.entries(weights).forEach(([feature, weight]) => {
      if (features[feature] !== undefined) {
        score += features[feature] * weight;
      }
    });

    // Normalize to 0-1 range
    return Math.max(0, Math.min(1, score + 0.5));
  }

  /**
   * Feature calculation methods
   */
  private calculateAverageWordLength(words: string[]): number {
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return totalLength / words.length;
  }

  private calculateVocabularyRichness(words: string[]): number {
    const uniqueWords = new Set(words);
    return uniqueWords.size / words.length;
  }

  private analyzeWordFrequency(words: string[]): any {
    const frequency: Record<string, number> = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Calculate entropy
    const total = words.length;
    let entropy = 0;

    Object.values(frequency).forEach(count => {
      const probability = count / total;
      entropy -= probability * Math.log2(probability);
    });

    return { entropy, distribution: frequency };
  }

  private calculateSentenceLengthVariance(sentences: string[]): number {
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / lengths.length;

    return variance / mean; // Coefficient of variation
  }

  private calculatePunctuationDensity(text: string): number {
    const punctuation = text.match(/[.,;:!?'"]/g) || [];
    return punctuation.length / text.length;
  }

  private analyzeSentimentConsistency(sentences: string[]): number {
    const sentiments = sentences.map(sentence => {
      const tokens = this.tokenizer.tokenize(sentence);
      return this.sentimentAnalyzer.getSentiment(tokens);
    });

    // Calculate standard deviation of sentiments
    const mean = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const variance = sentiments.reduce((acc, sent) => acc + Math.pow(sent - mean, 2), 0) / sentiments.length;

    // Lower variance = more consistent = more AI-like
    return 1 / (1 + Math.sqrt(variance));
  }

  private analyzeTopicCoherence(paragraphs: string[]): number {
    // Add paragraphs to TF-IDF
    paragraphs.forEach(para => this.tfidf.addDocument(para));

    // Calculate similarity between consecutive paragraphs
    let totalSimilarity = 0;
    for (let i = 0; i < paragraphs.length - 1; i++) {
      const similarity = this.calculateCosineSimilarity(i, i + 1);
      totalSimilarity += similarity;
    }

    return totalSimilarity / Math.max(1, paragraphs.length - 1);
  }

  private calculateCosineSimilarity(doc1: number, doc2: number): number {
    // Simplified cosine similarity
    // In production, use proper vector calculation
    return 0.7 + Math.random() * 0.2; // Placeholder
  }

  private analyzeTransitions(text: string): number {
    const formalTransitions = CONTENT_PATTERNS.AI_GENERATED.filter(pattern =>
      ['furthermore', 'moreover', 'however', 'therefore'].includes(pattern)
    );

    let transitionCount = 0;
    formalTransitions.forEach(transition => {
      const regex = new RegExp(`\\b${transition}\\b`, 'gi');
      const matches = text.match(regex);
      transitionCount += matches ? matches.length : 0;
    });

    return transitionCount / (text.split(/\s+/).length / 100); // Per 100 words
  }

  private calculatePersonalPronounRatio(words: string[]): number {
    const personalPronouns = ['i', 'me', 'my', 'we', 'us', 'our'];
    const pronounCount = words.filter(word => personalPronouns.includes(word)).length;
    return pronounCount / words.length;
  }

  private detectPassiveVoice(sentences: string[]): number {
    let passiveCount = 0;
    const passiveIndicators = /\b(was|were|been|being|is|are|am)\s+\w+ed\b/gi;

    sentences.forEach(sentence => {
      if (sentence.match(passiveIndicators)) {
        passiveCount++;
      }
    });

    return passiveCount / sentences.length;
  }

  private detectHedgingLanguage(text: string): number {
    const hedgingPhrases = [
      'it seems', 'appears to', 'might be', 'could be', 'possibly',
      'perhaps', 'arguably', 'generally', 'typically', 'usually'
    ];

    let hedgingCount = 0;
    hedgingPhrases.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      const matches = text.match(regex);
      hedgingCount += matches ? matches.length : 0;
    });

    return hedgingCount / (text.split(/\s+/).length / 100);
  }

  private countFormulaicPhrases(text: string): number {
    let count = 0;
    CONTENT_PATTERNS.AI_GENERATED.forEach(pattern => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = text.match(regex);
      count += matches ? matches.length : 0;
    });

    return count / (text.split(/\s+/).length / 100);
  }

  private detectRepetitiveStructures(sentences: string[]): number {
    // Check for sentences starting with the same words
    const startingWords: Record<string, number> = {};
    sentences.forEach(sentence => {
      const firstWords = sentence.trim().split(/\s+/).slice(0, 3).join(' ').toLowerCase();
      startingWords[firstWords] = (startingWords[firstWords] || 0) + 1;
    });

    // Count repetitive starts
    let repetitions = 0;
    Object.values(startingWords).forEach(count => {
      if (count > 1) repetitions += count - 1;
    });

    return repetitions / sentences.length;
  }

  private detectUnnaturalPerfection(text: string): number {
    let perfectionScore = 0;

    // Check for perfect grammar (no common errors)
    const commonErrors = /\b(it's\s+\w+ing|there\s+their|your\s+you're)\b/gi;
    if (!text.match(commonErrors)) perfectionScore += 0.3;

    // Check for perfect punctuation
    const punctuationErrors = /\s[,;:]|[.!?]\s*[a-z]|\s\s+/g;
    if (!text.match(punctuationErrors)) perfectionScore += 0.3;

    // Check for consistent formatting
    const inconsistentFormatting = /\bi\b|didnt|dont|cant|wont/gi;
    if (!text.match(inconsistentFormatting)) perfectionScore += 0.4;

    return perfectionScore;
  }

  /**
   * Identify specific AI indicators
   */
  private identifyAIIndicators(features: any): string[] {
    const indicators: string[] = [];

    if (features.vocabularyRichness < 0.3) {
      indicators.push('Limited vocabulary diversity');
    }

    if (features.sentenceLengthVariance < 5) {
      indicators.push('Uniform sentence structure');
    }

    if (features.personalPronounRatio < 0.01) {
      indicators.push('Lack of personal pronouns');
    }

    if (features.formulaicPhrases > 3) {
      indicators.push('Excessive formulaic phrases');
    }

    if (features.repetitiveStructures > 0.3) {
      indicators.push('Repetitive sentence patterns');
    }

    if (features.unnaturalPerfection > 0.8) {
      indicators.push('Unnaturally perfect grammar and formatting');
    }

    if (features.sentimentConsistency > 0.9) {
      indicators.push('Overly consistent sentiment');
    }

    return indicators;
  }
}