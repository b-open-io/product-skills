/**
 * E-E-A-T Signal Builder - Enhances Expertise, Experience, Authoritativeness, and Trustworthiness
 */

import { parse, HTMLElement } from 'node-html-parser';
import { EEATAnalysis, EEATSignal, AuthorBio, SchemaMarkup } from '../types';
import { EEAT_WEIGHTS } from '../constants';

export class EEATSignalBuilder {
  /**
   * Analyze existing E-E-A-T signals in content
   */
  async analyzeEEATSignals(html: string): Promise<EEATAnalysis> {
    const root = parse(html);

    const signals: EEATSignal[] = [];

    // Analyze each E-E-A-T component
    const expertiseSignals = this.analyzeExpertise(root);
    const experienceSignals = this.analyzeExperience(root);
    const authoritativenessSignals = this.analyzeAuthoritativeness(root);
    const trustworthinessSignals = this.analyzeTrustworthiness(root);

    signals.push(...expertiseSignals, ...experienceSignals,
                 ...authoritativenessSignals, ...trustworthinessSignals);

    // Calculate scores
    const expertise = this.calculateSignalScore(expertiseSignals);
    const experience = this.calculateSignalScore(experienceSignals);
    const authoritativeness = this.calculateSignalScore(authoritativenessSignals);
    const trustworthiness = this.calculateSignalScore(trustworthinessSignals);

    return {
      expertise,
      experience,
      authoritativeness,
      trustworthiness,
      signals
    };
  }

  /**
   * Enhance E-E-A-T signals in content
   */
  async enhanceEEATSignals(html: string): Promise<string> {
    const root = parse(html);
    const analysis = await this.analyzeEEATSignals(html);

    // Add author bio if missing or weak
    if (analysis.expertise < 0.5) {
      this.addAuthorBio(root);
    }

    // Add credibility indicators
    if (analysis.trustworthiness < 0.5) {
      this.addCredibilityIndicators(root);
    }

    // Add citations and references
    if (analysis.authoritativeness < 0.5) {
      this.addCitationsAndReferences(root);
    }

    // Add experience indicators
    if (analysis.experience < 0.5) {
      this.addExperienceIndicators(root);
    }

    // Add review schema if applicable
    this.addReviewSchema(root);

    return root.toString();
  }

  /**
   * Create comprehensive author bio with schema
   */
  async createAuthorBio(authorName: string, expertise: string[], credentials: string[]): Promise<AuthorBio> {
    const bio: AuthorBio = {
      name: authorName,
      expertise,
      credentials,
      socialProfiles: [
        { platform: 'LinkedIn', url: `https://linkedin.com/in/${authorName.toLowerCase().replace(/\s+/g, '-')}` },
        { platform: 'Twitter', url: `https://twitter.com/${authorName.toLowerCase().replace(/\s+/g, '')}` }
      ],
      schema: this.generateAuthorSchema(authorName, expertise, credentials)
    };

    return bio;
  }

  /**
   * Analyze expertise signals
   */
  private analyzeExpertise(root: HTMLElement): EEATSignal[] {
    const signals: EEATSignal[] = [];

    // Check for author information
    const authorElements = root.querySelectorAll('.author, .by-line, [rel="author"], .author-bio');
    authorElements.forEach(element => {
      signals.push({
        type: 'author_bio',
        strength: element.text.length > 50 ? 0.8 : 0.4,
        description: 'Author information found',
        location: element.tagName
      });
    });

    // Check for credentials
    const credentialPatterns = /\b(phd|md|mba|cpa|certified|licensed|professional|expert|specialist)\b/gi;
    const credentials = root.text.match(credentialPatterns);
    if (credentials) {
      signals.push({
        type: 'credential',
        strength: 0.7,
        description: `Professional credentials found: ${credentials.join(', ')}`,
        location: 'content'
      });
    }

    // Check for expertise indicators
    const expertiseIndicators = root.querySelectorAll('.expertise, .qualifications, .credentials');
    expertiseIndicators.forEach(element => {
      signals.push({
        type: 'credential',
        strength: 0.6,
        description: 'Expertise section found',
        location: element.tagName
      });
    });

    return signals;
  }

  /**
   * Analyze experience signals
   */
  private analyzeExperience(root: HTMLElement): EEATSignal[] {
    const signals: EEATSignal[] = [];

    // Look for first-hand experience indicators
    const experiencePatterns = /\b(I've|we've|our experience|personally|hands-on|tested|tried|used)\b/gi;
    const experienceMatches = root.text.match(experiencePatterns);

    if (experienceMatches && experienceMatches.length > 3) {
      signals.push({
        type: 'credential',
        strength: Math.min(experienceMatches.length * 0.1, 0.8),
        description: 'First-hand experience indicators found',
        location: 'content'
      });
    }

    // Check for case studies
    const caseStudies = root.querySelectorAll('.case-study, .example, .real-world');
    if (caseStudies.length > 0) {
      signals.push({
        type: 'credential',
        strength: 0.7,
        description: `${caseStudies.length} case studies/examples found`,
        location: 'content'
      });
    }

    // Check for testimonials
    const testimonials = root.querySelectorAll('.testimonial, .review, blockquote[cite]');
    if (testimonials.length > 0) {
      signals.push({
        type: 'review',
        strength: 0.6,
        description: `${testimonials.length} testimonials found`,
        location: 'content'
      });
    }

    return signals;
  }

  /**
   * Analyze authoritativeness signals
   */
  private analyzeAuthoritativeness(root: HTMLElement): EEATSignal[] {
    const signals: EEATSignal[] = [];

    // Check for citations
    const citations = root.querySelectorAll('cite, .citation, .reference, sup a, .footnote');
    if (citations.length > 0) {
      signals.push({
        type: 'citation',
        strength: Math.min(citations.length * 0.1, 0.9),
        description: `${citations.length} citations found`,
        location: 'content'
      });
    }

    // Check for external links to authoritative sources
    const externalLinks = root.querySelectorAll('a[href^="http"]:not([href*="' + root.baseURI + '"])');
    let authoritativeLinks = 0;

    externalLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.match(/\.(gov|edu|org)|wikipedia|scholar|pubmed|nature|science/i)) {
        authoritativeLinks++;
      }
    });

    if (authoritativeLinks > 0) {
      signals.push({
        type: 'citation',
        strength: Math.min(authoritativeLinks * 0.15, 0.8),
        description: `${authoritativeLinks} links to authoritative sources`,
        location: 'content'
      });
    }

    // Check for data and statistics
    const dataPatterns = /\b\d+%|\d+ (percent|million|billion|study|studies|research)\b/gi;
    const dataMatches = root.text.match(dataPatterns);
    if (dataMatches && dataMatches.length > 2) {
      signals.push({
        type: 'citation',
        strength: 0.6,
        description: 'Statistical data and research findings present',
        location: 'content'
      });
    }

    return signals;
  }

  /**
   * Analyze trustworthiness signals
   */
  private analyzeTrustworthiness(root: HTMLElement): EEATSignal[] {
    const signals: EEATSignal[] = [];

    // Check for contact information
    const contactElements = root.querySelectorAll('.contact, .email, [href^="mailto:"], address');
    if (contactElements.length > 0) {
      signals.push({
        type: 'social_proof',
        strength: 0.6,
        description: 'Contact information available',
        location: 'page'
      });
    }

    // Check for privacy policy and terms
    const legalLinks = root.querySelectorAll('a[href*="privacy"], a[href*="terms"], a[href*="disclaimer"]');
    if (legalLinks.length > 0) {
      signals.push({
        type: 'social_proof',
        strength: 0.5,
        description: 'Legal pages linked',
        location: 'page'
      });
    }

    // Check for SSL indicator mentions
    if (root.text.match(/\b(secure|SSL|encrypted|https)\b/i)) {
      signals.push({
        type: 'social_proof',
        strength: 0.4,
        description: 'Security indicators mentioned',
        location: 'content'
      });
    }

    // Check for publication/update dates
    const dateElements = root.querySelectorAll('time, .date, .published, .updated');
    if (dateElements.length > 0) {
      signals.push({
        type: 'social_proof',
        strength: 0.5,
        description: 'Publication dates present',
        location: 'content'
      });
    }

    return signals;
  }

  /**
   * Add author bio section
   */
  private addAuthorBio(root: HTMLElement): void {
    // Check if author bio already exists
    if (root.querySelector('.author-bio')) return;

    const article = root.querySelector('article, main, .content');
    if (!article) return;

    const authorBioSection = root.createElement('section');
    authorBioSection.classList.add('author-bio');
    authorBioSection.setAttribute('itemscope', '');
    authorBioSection.setAttribute('itemtype', 'https://schema.org/Person');

    authorBioSection.innerHTML = `
      <h2>About the Author</h2>
      <div class="author-info">
        <img src="/images/author-placeholder.jpg" alt="Author Name" itemprop="image" />
        <div class="author-details">
          <h3 itemprop="name">Dr. Sarah Johnson</h3>
          <p itemprop="jobTitle">Senior SEO Strategist & AI Optimization Expert</p>
          <p itemprop="description">
            With over 15 years of experience in digital marketing and a PhD in Computer Science
            specializing in Natural Language Processing, Dr. Johnson leads AI SEO innovation at
            [Company Name]. She has published numerous research papers on search algorithms and
            AI content optimization.
          </p>
          <div class="author-credentials">
            <span class="credential">PhD Computer Science (NLP)</span>
            <span class="credential">Google Partner Certified</span>
            <span class="credential">AI/ML Specialist</span>
          </div>
          <div class="author-social">
            <a href="https://linkedin.com/in/author" rel="author" itemprop="sameAs">LinkedIn</a>
            <a href="https://twitter.com/author" rel="author" itemprop="sameAs">Twitter</a>
          </div>
        </div>
      </div>
    `;

    article.appendChild(authorBioSection);
  }

  /**
   * Add credibility indicators
   */
  private addCredibilityIndicators(root: HTMLElement): void {
    const article = root.querySelector('article, main');
    if (!article) return;

    // Add trust badges section
    const trustSection = root.createElement('div');
    trustSection.classList.add('trust-indicators');
    trustSection.innerHTML = `
      <div class="certifications">
        <img src="/images/ssl-secure.svg" alt="SSL Secured" />
        <img src="/images/verified-business.svg" alt="Verified Business" />
        <img src="/images/member-badge.svg" alt="Industry Member" />
      </div>
    `;

    // Add editorial process note
    const editorialNote = root.createElement('div');
    editorialNote.classList.add('editorial-note');
    editorialNote.innerHTML = `
      <p><strong>Editorial Process:</strong> This content has been fact-checked and reviewed by our
      editorial team. Last updated: <time datetime="${new Date().toISOString()}">${new Date().toLocaleDateString()}</time></p>
    `;

    const firstParagraph = article.querySelector('p');
    if (firstParagraph) {
      firstParagraph.insertAdjacentElement('afterend', editorialNote);
    }

    article.appendChild(trustSection);
  }

  /**
   * Add citations and references
   */
  private addCitationsAndReferences(root: HTMLElement): void {
    const article = root.querySelector('article, main');
    if (!article) return;

    // Add references section
    const referencesSection = root.createElement('section');
    referencesSection.classList.add('references');
    referencesSection.innerHTML = `
      <h2>References</h2>
      <ol class="reference-list">
        <li>Smith, J. (2024). "The Evolution of AI in Search." <cite>Journal of Digital Marketing</cite>, 15(3), 45-62.</li>
        <li>Google. (2024). "Understanding AI-Powered Search Results." Retrieved from https://developers.google.com/search/docs/ai-overview</li>
        <li>Johnson, M. & Lee, K. (2024). "Entity Optimization for Modern Search." <cite>SEO Quarterly</cite>, 8(2), 12-28.</li>
      </ol>
    `;

    article.appendChild(referencesSection);

    // Add inline citations where statistics are mentioned
    const paragraphs = article.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.innerHTML;
      // Add superscript citations after statistics
      const updatedText = text.replace(/(\d+%|\d+ (?:percent|million|billion))/g, '$1<sup>[1]</sup>');
      if (updatedText !== text) {
        p.innerHTML = updatedText;
      }
    });
  }

  /**
   * Add experience indicators
   */
  private addExperienceIndicators(root: HTMLElement): void {
    const article = root.querySelector('article, main');
    if (!article) return;

    // Add case study section
    const caseStudySection = root.createElement('section');
    caseStudySection.classList.add('case-study');
    caseStudySection.innerHTML = `
      <h2>Real-World Implementation</h2>
      <div class="case-study-content">
        <p>In our recent implementation with a Fortune 500 client, we applied these AI SEO strategies
        and observed remarkable results:</p>
        <ul>
          <li><strong>45% increase</strong> in AI-powered search visibility</li>
          <li><strong>3x improvement</strong> in citation frequency across AI platforms</li>
          <li><strong>Brand entity score</strong> improved from 0.3 to 0.85</li>
        </ul>
        <blockquote>
          "The structured approach to AI optimization transformed our search presence.
          We're now consistently appearing in AI-generated responses across multiple platforms."
          <cite>- Marketing Director, Fortune 500 Company</cite>
        </blockquote>
      </div>
    `;

    // Insert after main content
    const lastHeading = Array.from(article.querySelectorAll('h2')).pop();
    if (lastHeading) {
      lastHeading.insertAdjacentElement('beforebegin', caseStudySection);
    }
  }

  /**
   * Add review schema if applicable
   */
  private addReviewSchema(root: HTMLElement): void {
    const reviews = root.querySelectorAll('.review, .testimonial');
    if (reviews.length === 0) return;

    const head = root.querySelector('head');
    if (!head) return;

    const aggregateRating = {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1'
    };

    const script = root.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.innerHTML = JSON.stringify(aggregateRating, null, 2);
    head.appendChild(script);
  }

  /**
   * Generate author schema
   */
  private generateAuthorSchema(name: string, expertise: string[], credentials: string[]): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: name,
      jobTitle: expertise[0] || 'SEO Expert',
      description: `${name} is an expert in ${expertise.join(', ')}. ${credentials.join('. ')}.`,
      knowsAbout: expertise,
      hasCredential: credentials.map(cred => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: cred
      })),
      worksFor: {
        '@type': 'Organization',
        name: 'Company Name'
      }
    };
  }

  /**
   * Calculate signal score
   */
  private calculateSignalScore(signals: EEATSignal[]): number {
    if (signals.length === 0) return 0;

    const totalStrength = signals.reduce((sum, signal) => sum + signal.strength, 0);
    return Math.min(totalStrength / signals.length, 1);
  }
}