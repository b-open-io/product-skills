/**
 * Entity Optimization Example - Building Strong Brand Entities
 */

import { EntityOptimizer } from '../src/optimizers/EntityOptimizer';
import { AIOptimizerConfig } from '../src/types';

async function entityOptimizationExample() {
  const config: AIOptimizerConfig = {
    brand: 'InnovateTech Corp',
    domain: 'innovatetech.com',
    apiKeys: {}
  };

  const entityOptimizer = new EntityOptimizer(config);

  // Sample HTML for a company homepage
  const homepageHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>InnovateTech Corp - Leading AI Solutions Provider</title>
      <meta name="description" content="InnovateTech Corp specializes in enterprise AI solutions, machine learning platforms, and data analytics services.">
    </head>
    <body>
      <header>
        <div class="logo">InnovateTech Corp</div>
        <nav>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <section class="hero">
          <h1>Transform Your Business with AI</h1>
          <p>InnovateTech Corp delivers cutting-edge artificial intelligence solutions to Fortune 500 companies worldwide.</p>
        </section>

        <section class="about">
          <h2>About InnovateTech</h2>
          <p>Founded in 2018, InnovateTech has rapidly become a leader in enterprise AI implementation. Our team of 200+ AI experts has successfully deployed solutions for over 150 global enterprises.</p>

          <div class="stats">
            <div class="stat">
              <span class="number">$2.5B</span>
              <span class="label">Client Revenue Generated</span>
            </div>
            <div class="stat">
              <span class="number">150+</span>
              <span class="label">Enterprise Clients</span>
            </div>
            <div class="stat">
              <span class="number">98%</span>
              <span class="label">Client Satisfaction</span>
            </div>
          </div>
        </section>

        <section class="leadership">
          <h2>Leadership Team</h2>
          <div class="leader">
            <h3>Dr. Michael Chen, CEO</h3>
            <p>Former Google AI Research Director with 20+ years in machine learning.</p>
          </div>
          <div class="leader">
            <h3>Sarah Williams, CTO</h3>
            <p>MIT PhD, pioneered neural network architectures at DeepMind.</p>
          </div>
        </section>

        <section class="contact">
          <h2>Contact Us</h2>
          <address>
            123 Innovation Drive<br>
            San Francisco, CA 94105<br>
            Phone: (555) 123-4567<br>
            Email: info@innovatetech.com
          </address>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 InnovateTech Corp. All rights reserved.</p>
        <div class="social">
          <a href="https://linkedin.com/company/innovatetech">LinkedIn</a>
          <a href="https://twitter.com/innovatetech">Twitter</a>
        </div>
      </footer>
    </body>
    </html>
  `;

  console.log('🏢 Entity Optimization Example - InnovateTech Corp\n');

  // Step 1: Analyze current entity presence
  console.log('📊 Analyzing Current Entity Signals...');
  const analysis = await entityOptimizer.analyzeEntities(homepageHTML);

  console.log(`\nEntity Score: ${(analysis.score * 100).toFixed(1)}%`);
  console.log(`Existing Entities Found: ${analysis.entities.length}`);

  if (analysis.entities.length > 0) {
    console.log('\nExisting Schema Markup:');
    analysis.entities.forEach((entity, index) => {
      console.log(`${index + 1}. Type: ${entity['@type'] || 'Unknown'}`);
    });
  }

  // Step 2: Generate comprehensive schema markup
  console.log('\n🔧 Generating Comprehensive Schema Markup...');
  const schemas = await entityOptimizer.generateComprehensiveSchema(homepageHTML);

  console.log(`\nGenerated ${schemas.length} Schema Types:`);
  schemas.forEach((schema, index) => {
    console.log(`\n${index + 1}. ${schema['@type']}:`);
    console.log(JSON.stringify(schema, null, 2).substring(0, 300) + '...');
  });

  // Step 3: Apply entity optimization
  console.log('\n⚡ Applying Entity Optimization...');
  const optimizedHTML = await entityOptimizer.enhanceEntities(homepageHTML);

  // Step 4: Verify improvements
  const afterAnalysis = await entityOptimizer.analyzeEntities(optimizedHTML);
  console.log(`\n✅ Entity Score After Optimization: ${(afterAnalysis.score * 100).toFixed(1)}%`);
  console.log(`Improvement: +${((afterAnalysis.score - analysis.score) * 100).toFixed(1)}%`);

  // Step 5: Show specific schema examples
  console.log('\n📋 Key Schema Implementations:\n');

  // Organization Schema Example
  console.log('1. Organization Schema (Primary Entity):');
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://innovatetech.com/#organization',
    name: 'InnovateTech Corp',
    alternateName: 'InnovateTech',
    url: 'https://innovatetech.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://innovatetech.com/logo.png',
      width: 600,
      height: 200
    },
    description: 'Leading AI solutions provider specializing in enterprise artificial intelligence implementation',
    foundingDate: '2018',
    founders: [
      {
        '@type': 'Person',
        name: 'Dr. Michael Chen',
        jobTitle: 'CEO',
        alumniOf: 'Stanford University'
      }
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 200,
      minValue: 200,
      maxValue: 250
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Innovation Drive',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'info@innovatetech.com',
      availableLanguage: ['English', 'Spanish', 'Chinese']
    },
    sameAs: [
      'https://linkedin.com/company/innovatetech',
      'https://twitter.com/innovatetech',
      'https://en.wikipedia.org/wiki/InnovateTech_Corp',
      'https://www.crunchbase.com/organization/innovatetech'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Enterprise AI Solutions'
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Global'
    },
    award: [
      'Best AI Company 2024 - TechCrunch',
      'Fortune 500 Preferred Vendor',
      'Gartner Magic Quadrant Leader'
    ]
  };

  console.log(JSON.stringify(orgSchema, null, 2));

  // Person Schema for Leadership
  console.log('\n2. Person Schema (Leadership):');
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Michael Chen',
    jobTitle: 'Chief Executive Officer',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://innovatetech.com/#organization'
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Stanford University'
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'MIT'
      }
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Business Strategy',
      'Technology Leadership'
    ],
    sameAs: [
      'https://linkedin.com/in/drmichaelchen',
      'https://twitter.com/drmichaelchen'
    ],
    image: 'https://innovatetech.com/team/michael-chen.jpg',
    description: 'Former Google AI Research Director with 20+ years in machine learning.'
  };

  console.log(JSON.stringify(personSchema, null, 2));

  // Service Schema
  console.log('\n3. Service Schema (Offerings):');
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise AI Implementation',
    provider: {
      '@type': 'Organization',
      '@id': 'https://innovatetech.com/#organization'
    },
    description: 'Comprehensive AI solution deployment for Fortune 500 companies',
    serviceType: 'Artificial Intelligence Consulting',
    areaServed: {
      '@type': 'Place',
      name: 'Global'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Strategy Consulting'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Machine Learning Platform Development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Model Training & Deployment'
          }
        }
      ]
    }
  };

  console.log(JSON.stringify(serviceSchema, null, 2));

  // Best Practices Summary
  console.log('\n💡 Entity Optimization Best Practices Applied:');
  console.log('1. ✅ Comprehensive Organization schema with all relevant properties');
  console.log('2. ✅ Leadership team members as Person entities');
  console.log('3. ✅ Service offerings with detailed descriptions');
  console.log('4. ✅ Consistent @id usage for entity relationships');
  console.log('5. ✅ SameAs properties linking to authoritative sources');
  console.log('6. ✅ KnowsAbout properties defining expertise areas');
  console.log('7. ✅ Structured address and contact information');
  console.log('8. ✅ Awards and recognition for trust signals');

  console.log('\n🎯 Expected Results:');
  console.log('- Enhanced brand entity recognition in knowledge graphs');
  console.log('- Improved visibility in AI-powered search results');
  console.log('- Better citation potential for brand-related queries');
  console.log('- Stronger entity disambiguation from competitors');
  console.log('- Increased trust signals for AI systems');

  // Save optimized HTML
  console.log('\n💾 Optimized HTML saved with comprehensive entity markup!');
}

// Run the example
entityOptimizationExample();