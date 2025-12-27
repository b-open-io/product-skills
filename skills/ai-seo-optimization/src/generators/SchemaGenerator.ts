/**
 * Schema Generator for comprehensive structured data markup
 * Generates FAQ, HowTo, Organization, Person, and other schemas
 */

import {
  SchemaMarkup,
  ContentStructure,
  Entity,
  BrandEntity,
  FAQ,
  HeadingStructure
} from '../types';
import { SCHEMA_TYPES, SCHEMA_PRIORITY } from '../constants';

export class SchemaGenerator {
  /**
   * Generate comprehensive schema markup based on content analysis
   */
  async generateSchemas(data: {
    content: string;
    contentStructure: ContentStructure;
    entities: Entity[];
    brandEntity: BrandEntity;
    contentType?: string;
  }): Promise<SchemaMarkup[]> {
    const schemas: SchemaMarkup[] = [];

    // Always include Organization/Brand schema
    schemas.push(this.generateBrandSchema(data.brandEntity));

    // Generate content-specific schemas
    if (data.contentStructure.faqs.length > 0) {
      schemas.push(this.generateFAQSchema(data.contentStructure.faqs));
    }

    if (this.isHowToContent(data.content, data.contentStructure)) {
      const howToSchema = this.generateHowToSchema(data.content, data.contentStructure);
      if (howToSchema) schemas.push(howToSchema);
    }

    // Generate entity-specific schemas
    for (const entity of data.entities) {
      if (entity.type === 'Person') {
        schemas.push(this.generatePersonSchema(entity));
      } else if (entity.type === 'Product') {
        schemas.push(this.generateProductSchema(entity));
      } else if (entity.type === 'Service') {
        schemas.push(this.generateServiceSchema(entity));
      } else if (entity.type === 'Event') {
        schemas.push(this.generateEventSchema(entity));
      }
    }

    // Add Article or BlogPosting schema if applicable
    if (data.contentType === 'article' || data.contentType === 'blog') {
      schemas.push(this.generateArticleSchema(data.content, data.contentStructure));
    }

    // Add WebPage schema with breadcrumbs
    schemas.push(this.generateWebPageSchema(data.contentStructure));

    // Sort schemas by priority
    return this.prioritizeSchemas(schemas);
  }

  /**
   * Generate Organization/Brand schema
   */
  private generateBrandSchema(brandEntity: BrandEntity): SchemaMarkup {
    const schema: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      name: brandEntity.brandName,
      description: this.generateBrandDescription(brandEntity),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Math.min(4.5 + (brandEntity.brandStrength * 0.5), 5),
        reviewCount: Math.floor(100 + brandEntity.brandMentions * 10)
      }
    };

    // Add brand attributes as additional properties
    if (brandEntity.brandAttributes.length > 0) {
      schema.additionalProperty = brandEntity.brandAttributes.map(attr => ({
        '@type': 'PropertyValue',
        name: attr.attribute,
        value: attr.value
      }));
    }

    return schema;
  }

  /**
   * Generate FAQ schema
   */
  private generateFAQSchema(faqs: FAQ[]): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  /**
   * Generate HowTo schema
   */
  private generateHowToSchema(content: string, structure: ContentStructure): SchemaMarkup | null {
    const steps = this.extractHowToSteps(content, structure);

    if (steps.length === 0) return null;

    const totalTime = this.estimateTime(steps.length);

    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: structure.headings[0]?.text || 'How to Guide',
      description: this.extractDescription(content),
      totalTime: `PT${totalTime}M`,
      supply: this.extractSupplies(content),
      tool: this.extractTools(content),
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        url: `#step-${index + 1}`
      }))
    };
  }

  /**
   * Generate Person schema
   */
  private generatePersonSchema(entity: Entity): SchemaMarkup {
    const schema: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: entity.name
    };

    if (entity.attributes.title) {
      schema.jobTitle = entity.attributes.title;
    }

    if (entity.attributes.credentials) {
      schema.honorificSuffix = entity.attributes.credentials;
    }

    if (entity.url) {
      schema.url = entity.url;
    }

    if (entity.sameAs) {
      schema.sameAs = entity.sameAs;
    }

    // Add expertise if available
    if (entity.attributes.expertise) {
      schema.knowsAbout = Array.isArray(entity.attributes.expertise)
        ? entity.attributes.expertise
        : [entity.attributes.expertise];
    }

    return schema;
  }

  /**
   * Generate Product schema
   */
  private generateProductSchema(entity: Entity): SchemaMarkup {
    const schema: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: entity.name,
      description: entity.description || entity.attributes.features || ''
    };

    if (entity.attributes.category) {
      schema.category = entity.attributes.category;
    }

    // Add aggregate rating if we have sentiment data
    const positiveMentions = entity.mentions.filter(m => m.sentiment === 'positive').length;
    const totalMentions = entity.mentions.length;

    if (totalMentions > 0) {
      const rating = (positiveMentions / totalMentions) * 5;
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: Math.round(rating * 10) / 10,
        reviewCount: totalMentions
      };
    }

    return schema;
  }

  /**
   * Generate Service schema
   */
  private generateServiceSchema(entity: Entity): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: entity.name,
      description: entity.description || entity.attributes.features || '',
      serviceType: entity.attributes.category || 'Professional Service',
      provider: {
        '@type': 'Organization',
        name: entity.attributes.provider || 'Service Provider'
      }
    };
  }

  /**
   * Generate Event schema
   */
  private generateEventSchema(entity: Entity): SchemaMarkup {
    const schema: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: entity.name,
      description: entity.description || ''
    };

    if (entity.attributes.startDate) {
      schema.startDate = entity.attributes.startDate;
    }

    if (entity.attributes.endDate) {
      schema.endDate = entity.attributes.endDate;
    }

    if (entity.attributes.location) {
      schema.location = {
        '@type': 'Place',
        name: entity.attributes.location
      };
    }

    return schema;
  }

  /**
   * Generate Article schema
   */
  private generateArticleSchema(content: string, structure: ContentStructure): SchemaMarkup {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: structure.headings[0]?.text || 'Article',
      description: this.extractDescription(content),
      wordCount: wordCount,
      timeRequired: `PT${readingTime}M`,
      articleBody: content.substring(0, 1000), // First 1000 chars
      keywords: this.extractKeywords(structure),
      articleSection: this.determineArticleSection(structure)
    };
  }

  /**
   * Generate WebPage schema with breadcrumbs
   */
  private generateWebPageSchema(structure: ContentStructure): SchemaMarkup {
    const breadcrumbItems = this.generateBreadcrumbItems(structure);

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: structure.headings[0]?.text || 'Web Page',
      description: structure.keyPoints.slice(0, 3).join('. '),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }
    };
  }

  /**
   * Helper methods
   */
  private isHowToContent(content: string, structure: ContentStructure): boolean {
    const howToIndicators = [
      'how to', 'step by step', 'guide', 'tutorial', 'instructions',
      'step 1', 'first step', 'next step', 'finally'
    ];

    const contentLower = content.toLowerCase();
    const indicatorCount = howToIndicators.filter(indicator =>
      contentLower.includes(indicator)
    ).length;

    // Check headings for how-to patterns
    const howToHeadings = structure.headings.filter(h =>
      h.text.toLowerCase().includes('how to') ||
      h.text.toLowerCase().includes('step')
    ).length;

    return indicatorCount >= 3 || howToHeadings >= 2;
  }

  private extractHowToSteps(content: string, structure: ContentStructure): Array<{name: string; text: string}> {
    const steps: Array<{name: string; text: string}> = [];

    // Look for numbered lists or step headings
    const stepPattern = /(?:step\s+\d+|^\d+[\.\)])\s*(.+?)(?:\n|$)/gim;
    const matches = content.match(stepPattern);

    if (matches && matches.length > 0) {
      matches.forEach((match, index) => {
        const cleanStep = match.replace(/^(step\s+\d+|^\d+[\.\)])\s*/i, '').trim();
        steps.push({
          name: `Step ${index + 1}`,
          text: cleanStep
        });
      });
    }

    // Alternative: extract from list items
    if (steps.length === 0 && structure.lists.length > 0) {
      const orderedList = structure.lists.find(l => l.type === 'ordered');
      if (orderedList) {
        orderedList.items.forEach((item, index) => {
          steps.push({
            name: `Step ${index + 1}`,
            text: item.text
          });
        });
      }
    }

    return steps;
  }

  private extractSupplies(content: string): string[] {
    const supplies: string[] = [];
    const supplyPattern = /(?:supplies|materials|ingredients|requirements?):\s*([^\n]+)/i;
    const match = content.match(supplyPattern);

    if (match) {
      const items = match[1].split(/[,;]/);
      supplies.push(...items.map(item => item.trim()).filter(item => item.length > 0));
    }

    return supplies;
  }

  private extractTools(content: string): string[] {
    const tools: string[] = [];
    const toolPattern = /(?:tools?|equipment|software):\s*([^\n]+)/i;
    const match = content.match(toolPattern);

    if (match) {
      const items = match[1].split(/[,;]/);
      tools.push(...items.map(item => item.trim()).filter(item => item.length > 0));
    }

    return tools;
  }

  private estimateTime(stepCount: number): number {
    // Estimate 5 minutes per step as default
    return stepCount * 5;
  }

  private extractDescription(content: string): string {
    // Extract first paragraph or first 160 characters
    const firstParagraph = content.split('\n\n')[0];
    return firstParagraph.length > 160
      ? firstParagraph.substring(0, 157) + '...'
      : firstParagraph;
  }

  private extractKeywords(structure: ContentStructure): string[] {
    const keywords = new Set<string>();

    // Extract from headings
    structure.headings.forEach(h => {
      if (h.keywords) {
        h.keywords.forEach(kw => keywords.add(kw));
      }
    });

    // Extract from key points
    structure.keyPoints.forEach(point => {
      const words = point.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      words.slice(0, 3).forEach(w => keywords.add(w));
    });

    return Array.from(keywords).slice(0, 10);
  }

  private determineArticleSection(structure: ContentStructure): string {
    const sections = ['Technology', 'Business', 'Marketing', 'SEO', 'Guide', 'Tutorial', 'News'];

    for (const section of sections) {
      const sectionLower = section.toLowerCase();
      const hasSection = structure.headings.some(h =>
        h.text.toLowerCase().includes(sectionLower)
      ) || structure.keyPoints.some(p =>
        p.toLowerCase().includes(sectionLower)
      );

      if (hasSection) return section;
    }

    return 'General';
  }

  private generateBrandDescription(brandEntity: BrandEntity): string {
    const topAttributes = brandEntity.brandAttributes
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 3)
      .map(attr => `${attr.attribute}: ${attr.value}`)
      .join(', ');

    return `${brandEntity.brandName} is a brand known for ${topAttributes || 'quality and innovation'}.`;
  }

  private generateBreadcrumbItems(structure: ContentStructure): any[] {
    // Generate breadcrumb based on heading hierarchy
    const items: any[] = [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: '/'
    }];

    // Add main heading as final breadcrumb
    if (structure.headings.length > 0) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: structure.headings[0].text,
        item: '#'
      });
    }

    return items;
  }

  private prioritizeSchemas(schemas: SchemaMarkup[]): SchemaMarkup[] {
    return schemas.sort((a, b) => {
      const priorityA = SCHEMA_PRIORITY[a['@type']] || 999;
      const priorityB = SCHEMA_PRIORITY[b['@type']] || 999;
      return priorityA - priorityB;
    });
  }
}