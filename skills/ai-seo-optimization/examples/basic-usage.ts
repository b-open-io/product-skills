/**
 * Basic Usage Example - AI SEO Optimization Skill
 */

import { AIOptimizer } from '../src';

async function basicExample() {
  // Initialize the optimizer
  const optimizer = new AIOptimizer({
    brand: 'TechStartup Inc',
    domain: 'techstartup.com',
    apiKeys: {
      openai: process.env.OPENAI_API_KEY,
      perplexity: process.env.PERPLEXITY_API_KEY
    }
  });

  // Sample HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI SEO Best Practices for 2025 - TechStartup Inc</title>
    </head>
    <body>
      <article>
        <h1>AI SEO Best Practices for 2025</h1>
        <p>Search engine optimization is evolving rapidly with the introduction of AI-powered search experiences.</p>

        <h2>Understanding Entity Optimization</h2>
        <p>Entity optimization has become crucial for visibility in AI-powered search results. By building strong brand entities and implementing comprehensive schema markup, websites can significantly improve their recognition across AI platforms.</p>

        <h2>The Importance of E-E-A-T</h2>
        <p>Expertise, Experience, Authoritativeness, and Trustworthiness (E-E-A-T) signals are more important than ever. AI systems use these signals to evaluate content credibility and determine which sources to cite in their responses.</p>

        <h2>Frequently Asked Questions</h2>
        <div class="faq">
          <h3>What is AI SEO?</h3>
          <p>AI SEO refers to optimizing content for AI-powered search engines and chatbots like ChatGPT, Perplexity, and Google's AI Overview.</p>

          <h3>How do I optimize for AI citations?</h3>
          <p>Focus on creating unique, data-driven content with clear structure, expert insights, and proper attribution.</p>
        </div>
      </article>
    </body>
    </html>
  `;

  try {
    // Step 1: Analyze the content
    console.log('🔍 Analyzing content...');
    const analysis = await optimizer.analyzeContent(htmlContent, 'https://techstartup.com/ai-seo-guide');

    console.log('\n📊 Analysis Results:');
    console.log(`- Entity Score: ${(analysis.entityScore * 100).toFixed(1)}%`);
    console.log(`- AI Citation Potential: ${(analysis.aiCitationPotential * 100).toFixed(1)}%`);
    console.log(`- Structure Score: ${(analysis.structureScore * 100).toFixed(1)}%`);
    console.log(`- E-E-A-T Signals: ${Object.entries(analysis.eeatSignals)
      .filter(([key]) => key !== 'signals')
      .map(([key, value]) => `${key}: ${(value * 100).toFixed(1)}%`)
      .join(', ')}`);
    console.log(`- Content Freshness: ${analysis.freshness.updateUrgency}`);
    console.log(`- AI-Human Balance: ${(analysis.aiHumanBalance * 100).toFixed(1)}%`);

    // Step 2: Get top recommendations
    console.log('\n💡 Top Recommendations:');
    analysis.recommendations
      .filter(rec => rec.priority === 'high')
      .slice(0, 3)
      .forEach((rec, index) => {
        console.log(`${index + 1}. ${rec.description}`);
        console.log(`   Impact: ${(rec.estimatedImpact * 100).toFixed(0)}%`);
      });

    // Step 3: Apply optimizations
    console.log('\n🔧 Applying optimizations...');
    const optimizedContent = await optimizer.optimizeContent(htmlContent, analysis);
    console.log('✅ Content optimized successfully!');

    // Step 4: Track KPIs
    console.log('\n📈 Tracking KPIs...');
    const kpis = await optimizer.trackKPIs('https://techstartup.com/ai-seo-guide');

    console.log('KPI Metrics:');
    console.log(`- Citation Share: ${(kpis.citationShare * 100).toFixed(1)}%`);
    console.log(`- Brand Mentions: ${kpis.brandMentions}`);
    console.log(`- Entity Recognition: ${(kpis.entityRecognition * 100).toFixed(1)}%`);
    console.log(`- AI Visibility Index: ${(kpis.aiVisibilityIndex * 100).toFixed(1)}%`);

    // Step 5: Monitor across platforms
    console.log('\n🌐 Monitoring AI platforms...');
    const platformResults = await optimizer.monitorPlatforms(
      'https://techstartup.com/ai-seo-guide',
      ['AI SEO best practices', 'entity optimization', 'E-E-A-T signals']
    );

    console.log('Platform Visibility:');
    platformResults.forEach(platform => {
      console.log(`- ${platform.platform}: Score ${(platform.score * 100).toFixed(1)}%`);
    });

    // Save optimized content
    // In production, you would write this back to your CMS or file system
    console.log('\n💾 Optimization complete! Next steps:');
    console.log('1. Review the optimized content');
    console.log('2. Implement high-priority recommendations');
    console.log('3. Monitor KPIs weekly');
    console.log('4. Update content based on freshness alerts');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

// Run the example
basicExample();