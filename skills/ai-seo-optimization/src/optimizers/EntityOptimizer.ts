/**
 * Entity Optimizer - Builds and enhances brand entities with schema markup
 */

import { parse } from 'node-html-parser';
import { SchemaMarkup, AIOptimizerConfig } from '../types';
import { SCHEMA_TYPES } from '../constants';

export class EntityOptimizer {
  private config: AIOptimizerConfig;

  constructor(config: AIOptimizerConfig) {
    this.config = config;
  }

  /**
   * Analyze existing entities in content
   */
  async analyzeEntities(html: string): Promise<{ score: number; entities: any[] }> {
    const root = parse(html);
    const entities: any[] = [];
    let score = 0;

    // Check for existing schema markup
    const schemaScripts = root.querySelectorAll('script[type="application/ld+json"]');
    schemaScripts.forEach(script => {
      try {
        const schema = JSON.parse(script.innerHTML);
        entities.push(schema);
        score += 0.1;
      } catch (e) {
        // Invalid schema
      }
    });

    // Check for brand mentions
    const brandMentions = this.countBrandMentions(root.text, this.config.brand);
    score += Math.min(brandMentions * 0.05, 0.3);

    // Check for structured data indicators
    if (root.querySelector('[itemscope]')) score += 0.1;
    if (root.querySelector('address')) score += 0.05;
    if (root.querySelector('.author, .by-line, [rel="author"]')) score += 0.1;

    return {
      score: Math.min(score, 1),
      entities
    };
  }

  /**
   * Enhance entities in content with schema markup
   */
  async enhanceEntities(html: string): Promise<string> {
    const root = parse(html);

    // Generate comprehensive schema markup
    const schemas = await this.generateComprehensiveSchema(html);

    // Remove existing schema scripts
    const existingSchemas = root.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Add new schema scripts
    schemas.forEach(schema => {
      const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
      root.querySelector('head')?.insertAdjacentHTML('beforeend', scriptTag);
    });

    // Add microdata where appropriate
    this.addMicrodata(root);

    return root.toString();
  }

  /**
   * Generate comprehensive schema markup for the content
   */
  async generateComprehensiveSchema(html: string): Promise<SchemaMarkup[]> {
    const root = parse(html);
    const schemas: SchemaMarkup[] = [];

    // Organization/Brand schema
    schemas.push(this.generateOrganizationSchema());

    // Article schema if applicable
    const articleSchema = this.generateArticleSchema(root);
    if (articleSchema) schemas.push(articleSchema);

    // FAQ schema if FAQs detected
    const faqSchema = this.generateFAQSchema(root);
    if (faqSchema) schemas.push(faqSchema);

    // Author/Person schema
    const authorSchema = this.generateAuthorSchema(root);
    if (authorSchema) schemas.push(authorSchema);

    // BreadcrumbList schema
    const breadcrumbSchema = this.generateBreadcrumbSchema(root);
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);

    return schemas;
  }

  /**
   * Generate organization schema for brand entity
   */
  private generateOrganizationSchema(): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.config.brand,
      url: `https://${this.config.domain}`,
      logo: {
        '@type': 'ImageObject',
        url: `https://${this.config.domain}/logo.png`
      },
      sameAs: [
        // Add social media profiles
        `https://twitter.com/${this.config.brand.toLowerCase()}`,
        `https://linkedin.com/company/${this.config.brand.toLowerCase()}`,
        `https://facebook.com/${this.config.brand.toLowerCase()}`
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: `support@${this.config.domain}`,
        availableLanguage: ['English']
      }
    };
  }

  /**
   * Generate article schema if content is article-like
   */
  private generateArticleSchema(root: any): SchemaMarkup | null {
    const title = root.querySelector('h1')?.text;
    if (!title) return null;

    const datePublished = root.querySelector('time[datetime]')?.getAttribute('datetime') ||
                         root.querySelector('.publish-date')?.text ||
                         new Date().toISOString();

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      datePublished,
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: this.config.brand
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.brand,
        logo: {
          '@type': 'ImageObject',
          url: `https://${this.config.domain}/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${this.config.domain}${root.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''}`
      },
      image: this.extractArticleImages(root)
    };
  }

  /**
   * Generate FAQ schema from detected Q&A content
   */
  private generateFAQSchema(root: any): SchemaMarkup | null {
    const faqSection = root.querySelector('.faq, #faq, [data-faq]');
    if (!faqSection) return null;

    const mainEntity: any[] = [];

    // Look for Q&A patterns
    const questions = faqSection.querySelectorAll('h2, h3, .question, dt');
    questions.forEach((q: any, index: number) => {
      const answer = q.nextElementSibling;
      if (answer && (answer.tagName === 'p' || answer.tagName === 'div' || answer.tagName === 'dd')) {
        mainEntity.push({
          '@type': 'Question',
          name: q.text,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer.text
          }
        });
      }
    });

    if (mainEntity.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity
    };
  }

  /**
   * Generate author schema from detected author information
   */
  private generateAuthorSchema(root: any): SchemaMarkup | null {
    const authorElement = root.querySelector('.author, .by-line, [rel="author"]');
    if (!authorElement) return null;

    const authorName = authorElement.text.replace(/^by\s+/i, '').trim();

    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: authorName,
      url: `https://${this.config.domain}/author/${authorName.toLowerCase().replace(/\s+/g, '-')}`,
      sameAs: [
        // Add author social profiles if available
      ]
    };
  }

  /**
   * Generate breadcrumb schema
   */
  private generateBreadcrumbSchema(root: any): SchemaMarkup | null {
    const breadcrumbs = root.querySelector('.breadcrumbs, nav[aria-label*="breadcrumb"]');
    if (!breadcrumbs) return null;

    const items = breadcrumbs.querySelectorAll('a');
    const itemListElement = items.map((item: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.text,
      item: item.getAttribute('href')
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };
  }

  /**
   * Add microdata markup to enhance entity recognition
   */
  private addMicrodata(root: any): void {
    // Add organization microdata
    const header = root.querySelector('header');
    if (header && !header.getAttribute('itemscope')) {
      header.setAttribute('itemscope', '');
      header.setAttribute('itemtype', 'https://schema.org/Organization');

      const brandElement = header.querySelector('.logo, .brand, .site-title');
      if (brandElement) {
        brandElement.setAttribute('itemprop', 'name');
      }
    }

    // Add author microdata
    const authorElements = root.querySelectorAll('.author, .by-line');
    authorElements.forEach((author: any) => {
      if (!author.getAttribute('itemscope')) {
        author.setAttribute('itemscope', '');
        author.setAttribute('itemtype', 'https://schema.org/Person');
        author.setAttribute('itemprop', 'author');
      }
    });
  }

  /**
   * Count brand mentions in text
   */
  private countBrandMentions(text: string, brand: string): number {
    const regex = new RegExp(`\\b${brand}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }

  /**
   * Extract article images for schema
   */
  private extractArticleImages(root: any): string[] {
    const images: string[] = [];
    const imgElements = root.querySelectorAll('article img, .post img, main img');

    imgElements.forEach((img: any) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        images.push(src.startsWith('http') ? src : `https://${this.config.domain}${src}`);
      }
    });

    return images.slice(0, 3); // Return up to 3 images
  }
}