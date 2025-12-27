/**
 * Content Structurer - Formats content for optimal AI parsing
 */

import { parse, HTMLElement } from 'node-html-parser';
import { ContentStructure, FAQ, Table, List } from '../types';

export class ContentStructurer {
  /**
   * Analyze content structure for AI readability
   */
  async analyzeStructure(html: string): Promise<{ score: number; structure: ContentStructure }> {
    const root = parse(html);
    const structure: ContentStructure = {
      headings: this.analyzeHeadings(root),
      faqs: this.extractFAQs(root),
      tables: this.extractTables(root),
      lists: this.extractLists(root),
      readabilityScore: this.calculateReadabilityScore(root)
    };

    const score = this.calculateStructureScore(structure);

    return { score, structure };
  }

  /**
   * Restructure content for better AI parsing
   */
  async restructureContent(html: string): Promise<string> {
    const root = parse(html);

    // Convert long paragraphs to structured lists
    this.convertLongParagraphsToLists(root);

    // Add FAQ section if Q&A content exists
    this.structureFAQSection(root);

    // Enhance tables with captions and summaries
    this.enhanceTables(root);

    // Add jump links for long content
    this.addTableOfContents(root);

    // Structure key takeaways
    this.addKeyTakeaways(root);

    return root.toString();
  }

  /**
   * Analyze heading structure
   */
  private analyzeHeadings(root: HTMLElement): any[] {
    const headings: any[] = [];
    const headingElements = root.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headingElements.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      headings.push({
        level,
        text: heading.text,
        keywords: this.extractKeywords(heading.text),
        hasSchema: heading.getAttribute('itemProp') !== null
      });
    });

    return headings;
  }

  /**
   * Extract FAQ content
   */
  private extractFAQs(root: HTMLElement): FAQ[] {
    const faqs: FAQ[] = [];

    // Method 1: Look for FAQ sections
    const faqSections = root.querySelectorAll('.faq, #faq, [data-faq], section[aria-label*="faq"]');
    faqSections.forEach(section => {
      const qaPairs = this.extractQAPairs(section);
      faqs.push(...qaPairs);
    });

    // Method 2: Look for question patterns in headings
    const questionHeadings = root.querySelectorAll('h2, h3, h4').filter(h =>
      h.text.includes('?') || h.text.match(/^(what|how|why|when|where|who|which)/i)
    );

    questionHeadings.forEach(qHeading => {
      const answer = this.extractAnswerAfterHeading(qHeading);
      if (answer) {
        faqs.push({
          question: qHeading.text,
          answer: answer,
          schema: this.generateFAQItemSchema(qHeading.text, answer)
        });
      }
    });

    return faqs;
  }

  /**
   * Extract tables from content
   */
  private extractTables(root: HTMLElement): Table[] {
    const tables: Table[] = [];
    const tableElements = root.querySelectorAll('table');

    tableElements.forEach(table => {
      const headers = table.querySelectorAll('th').map(th => th.text);
      const rows: string[][] = [];

      table.querySelectorAll('tr').forEach((tr, index) => {
        if (index === 0 && headers.length > 0) return; // Skip header row
        const cells = tr.querySelectorAll('td').map(td => td.text);
        if (cells.length > 0) rows.push(cells);
      });

      tables.push({
        headers,
        rows,
        caption: table.querySelector('caption')?.text,
        schema: this.generateTableSchema(headers, rows)
      });
    });

    return tables;
  }

  /**
   * Extract lists from content
   */
  private extractLists(root: HTMLElement): List[] {
    const lists: List[] = [];
    const listElements = root.querySelectorAll('ul, ol');

    listElements.forEach(list => {
      const type = list.tagName === 'OL' ? 'ordered' : 'unordered';
      const items = this.extractListItems(list);
      const purpose = this.inferListPurpose(list, items);

      lists.push({ type, items, purpose });
    });

    return lists;
  }

  /**
   * Convert long paragraphs to structured lists
   */
  private convertLongParagraphsToLists(root: HTMLElement): void {
    const paragraphs = root.querySelectorAll('p');

    paragraphs.forEach(p => {
      const text = p.text;
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

      // If paragraph has list-like content
      if (sentences.length > 3 && this.hasListIndicators(text)) {
        const list = root.createElement('ul');
        sentences.forEach(sentence => {
          if (this.isListItem(sentence)) {
            const li = root.createElement('li');
            li.innerHTML = sentence.trim().replace(/^[-•*]\s*/, '');
            list.appendChild(li);
          }
        });

        if (list.childNodes.length > 0) {
          p.replaceWith(list);
        }
      }
    });
  }

  /**
   * Structure FAQ section with proper markup
   */
  private structureFAQSection(root: HTMLElement): void {
    const faqs = this.extractFAQs(root);
    if (faqs.length < 3) return; // Need at least 3 FAQs

    // Find or create FAQ section
    let faqSection = root.querySelector('.faq-section');
    if (!faqSection && faqs.length > 0) {
      faqSection = root.createElement('section');
      faqSection.classList.add('faq-section');
      faqSection.setAttribute('itemscope', '');
      faqSection.setAttribute('itemtype', 'https://schema.org/FAQPage');

      const heading = root.createElement('h2');
      heading.textContent = 'Frequently Asked Questions';
      faqSection.appendChild(heading);

      faqs.forEach(faq => {
        const faqItem = root.createElement('div');
        faqItem.setAttribute('itemscope', '');
        faqItem.setAttribute('itemprop', 'mainEntity');
        faqItem.setAttribute('itemtype', 'https://schema.org/Question');

        const question = root.createElement('h3');
        question.setAttribute('itemprop', 'name');
        question.textContent = faq.question;

        const answer = root.createElement('div');
        answer.setAttribute('itemscope', '');
        answer.setAttribute('itemprop', 'acceptedAnswer');
        answer.setAttribute('itemtype', 'https://schema.org/Answer');
        answer.innerHTML = `<div itemprop="text">${faq.answer}</div>`;

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqSection.appendChild(faqItem);
      });

      // Append FAQ section to main content
      const main = root.querySelector('main, article, .content');
      if (main) {
        main.appendChild(faqSection);
      }
    }
  }

  /**
   * Enhance tables with better structure
   */
  private enhanceTables(root: HTMLElement): void {
    const tables = root.querySelectorAll('table');

    tables.forEach(table => {
      // Add table wrapper for responsiveness
      const wrapper = root.createElement('div');
      wrapper.classList.add('table-wrapper');
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('tabindex', '0');

      // Add caption if missing
      if (!table.querySelector('caption')) {
        const caption = root.createElement('caption');
        const firstRow = table.querySelector('tr');
        if (firstRow) {
          const headers = firstRow.querySelectorAll('th');
          if (headers.length > 0) {
            caption.textContent = `Table: ${headers.map(h => h.text).join(' vs ')}`;
            table.insertAdjacentElement('afterbegin', caption);
          }
        }
      }

      // Add scope attributes
      table.querySelectorAll('th').forEach(th => {
        if (!th.getAttribute('scope')) {
          th.setAttribute('scope', 'col');
        }
      });

      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  /**
   * Add table of contents for long content
   */
  private addTableOfContents(root: HTMLElement): void {
    const headings = root.querySelectorAll('h2, h3');
    if (headings.length < 4) return; // Only add TOC for longer content

    const toc = root.createElement('nav');
    toc.classList.add('table-of-contents');
    toc.setAttribute('aria-label', 'Table of contents');

    const tocTitle = root.createElement('h2');
    tocTitle.textContent = 'Table of Contents';
    toc.appendChild(tocTitle);

    const tocList = root.createElement('ol');

    headings.forEach((heading, index) => {
      // Add ID to heading if missing
      if (!heading.id) {
        heading.id = `section-${index + 1}`;
      }

      const li = root.createElement('li');
      const link = root.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.text;

      if (heading.tagName === 'H3') {
        li.style.marginLeft = '20px';
      }

      li.appendChild(link);
      tocList.appendChild(li);
    });

    toc.appendChild(tocList);

    // Insert TOC after first paragraph or intro
    const firstPara = root.querySelector('p');
    if (firstPara) {
      firstPara.insertAdjacentElement('afterend', toc);
    }
  }

  /**
   * Add key takeaways section
   */
  private addKeyTakeaways(root: HTMLElement): void {
    const content = root.text;
    const takeaways = this.extractKeyTakeaways(content);

    if (takeaways.length > 0) {
      const takeawaySection = root.createElement('div');
      takeawaySection.classList.add('key-takeaways');
      takeawaySection.setAttribute('role', 'complementary');

      const heading = root.createElement('h2');
      heading.textContent = 'Key Takeaways';
      takeawaySection.appendChild(heading);

      const list = root.createElement('ul');
      takeaways.forEach(takeaway => {
        const li = root.createElement('li');
        li.textContent = takeaway;
        list.appendChild(li);
      });

      takeawaySection.appendChild(list);

      // Add after introduction or at the beginning
      const intro = root.querySelector('.intro, .introduction, p:first-of-type');
      if (intro) {
        intro.insertAdjacentElement('afterend', takeawaySection);
      }
    }
  }

  /**
   * Helper methods
   */
  private extractKeywords(text: string): string[] {
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
    return text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word))
      .slice(0, 5);
  }

  private extractQAPairs(section: HTMLElement): FAQ[] {
    const pairs: FAQ[] = [];
    const questions = section.querySelectorAll('.question, dt, [data-question]');

    questions.forEach(q => {
      const answer = q.nextElementSibling;
      if (answer) {
        pairs.push({
          question: q.text,
          answer: answer.text,
          schema: this.generateFAQItemSchema(q.text, answer.text)
        });
      }
    });

    return pairs;
  }

  private extractAnswerAfterHeading(heading: HTMLElement): string {
    let answer = '';
    let sibling = heading.nextElementSibling;

    while (sibling && !sibling.tagName.match(/^h[1-6]$/i)) {
      answer += sibling.text + ' ';
      sibling = sibling.nextElementSibling;
    }

    return answer.trim();
  }

  private generateFAQItemSchema(question: string, answer: string): any {
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    };
  }

  private generateTableSchema(headers: string[], rows: string[][]): any {
    return {
      '@type': 'Table',
      about: headers.join(' vs '),
      columns: headers.map(h => ({ '@type': 'TableColumn', name: h }))
    };
  }

  private extractListItems(list: HTMLElement): any[] {
    const items: any[] = [];

    list.querySelectorAll('> li').forEach(li => {
      const item: any = { text: li.text };
      const subList = li.querySelector('ul, ol');

      if (subList) {
        item.subItems = this.extractListItems(subList);
      }

      items.push(item);
    });

    return items;
  }

  private inferListPurpose(list: HTMLElement, items: any[]): string {
    const previousSibling = list.previousElementSibling;
    if (previousSibling?.tagName.match(/^h[2-6]$/i)) {
      return previousSibling.text;
    }

    // Infer from content
    const text = items.map(i => i.text).join(' ').toLowerCase();
    if (text.includes('step') || text.includes('first')) return 'Steps';
    if (text.includes('benefit') || text.includes('advantage')) return 'Benefits';
    if (text.includes('feature')) return 'Features';

    return 'Information';
  }

  private hasListIndicators(text: string): boolean {
    return /[-•*]\s|^\d+\.\s|^[a-z]\)\s/m.test(text);
  }

  private isListItem(sentence: string): boolean {
    return /^[-•*]\s|^\d+\.\s|^[a-z]\)\s/.test(sentence.trim());
  }

  private calculateReadabilityScore(root: HTMLElement): number {
    const text = root.text;
    const sentences = text.match(/[.!?]+/g) || [];
    const words = text.split(/\s+/);
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);

    // Simple readability calculation
    let score = 1;
    if (avgWordsPerSentence > 20) score -= 0.2;
    if (avgWordsPerSentence > 25) score -= 0.3;

    // Bonus for structure elements
    if (root.querySelectorAll('h2, h3').length > 3) score += 0.1;
    if (root.querySelectorAll('ul, ol').length > 0) score += 0.1;
    if (root.querySelectorAll('table').length > 0) score += 0.1;

    return Math.max(0, Math.min(1, score));
  }

  private calculateStructureScore(structure: ContentStructure): number {
    let score = structure.readabilityScore * 0.3;

    // Heading hierarchy
    if (structure.headings.length > 3) score += 0.2;

    // FAQs boost
    if (structure.faqs.length > 2) score += 0.2;

    // Tables and lists
    if (structure.tables.length > 0) score += 0.15;
    if (structure.lists.length > 1) score += 0.15;

    return Math.min(1, score);
  }

  private extractKeyTakeaways(content: string): string[] {
    // This is a simplified version - in production, use NLP
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    const takeaways: string[] = [];

    sentences.forEach(sentence => {
      if (sentence.match(/important|key|crucial|essential|remember|note/i) &&
          sentence.length < 150) {
        takeaways.push(sentence.trim());
      }
    });

    return takeaways.slice(0, 5);
  }
}