/**
 * Multi-Platform Optimization Example
 * Demonstrates optimization strategies for different AI platforms
 */

import { MultiPlatformAnalyzer } from '../src/analyzers/MultiPlatformAnalyzer';
import { AIOptimizerConfig } from '../src/types';

async function multiPlatformExample() {
  const config: AIOptimizerConfig = {
    brand: 'TechGuide Pro',
    domain: 'techguide.pro',
    apiKeys: {
      openai: process.env.OPENAI_API_KEY,
      perplexity: process.env.PERPLEXITY_API_KEY,
      google: process.env.GOOGLE_API_KEY
    }
  };

  const analyzer = new MultiPlatformAnalyzer(config);

  console.log('🌐 Multi-Platform AI SEO Optimization Example\n');

  // Sample content for optimization
  const articleURL = 'https://techguide.pro/ai-coding-assistants-2025';
  const targetQueries = [
    'best AI coding assistants 2025',
    'AI code generation tools comparison',
    'GitHub Copilot vs ChatGPT for coding'
  ];

  // Step 1: Analyze current visibility across platforms
  console.log('📊 Analyzing Current Platform Visibility...\n');
  const platformAnalysis = await analyzer.analyzeAcrossPlatforms(articleURL, targetQueries);

  // Display results for each platform
  platformAnalysis.forEach(platform => {
    console.log(`${getPlatformEmoji(platform.platform)} ${formatPlatformName(platform.platform)}`);
    console.log(`├─ Score: ${(platform.score * 100).toFixed(1)}%`);
    console.log(`├─ Indexed: ${platform.visibility.indexed ? '✅' : '❌'}`);
    console.log(`├─ Citations: ${platform.visibility.citationFrequency}`);
    console.log(`├─ Avg Position: #${platform.visibility.averagePosition}`);
    console.log(`└─ Top Queries: ${platform.visibility.queries.slice(0, 2).join(', ')}\n`);
  });

  // Step 2: Get platform-specific optimizations
  console.log('🎯 Platform-Specific Optimization Strategies:\n');

  // Google AI Overview Optimization
  console.log('1️⃣ Google AI Overview Optimization:');
  const googleOptimizations = await analyzer.getPlatformOptimizations('google_ai_overview', '');
  displayOptimizations(googleOptimizations);

  // ChatGPT Optimization
  console.log('\n2️⃣ ChatGPT Optimization:');
  const chatgptOptimizations = await analyzer.getPlatformOptimizations('chatgpt', '');
  displayOptimizations(chatgptOptimizations);

  // Perplexity Optimization
  console.log('\n3️⃣ Perplexity AI Optimization:');
  const perplexityOptimizations = await analyzer.getPlatformOptimizations('perplexity', '');
  displayOptimizations(perplexityOptimizations);

  // Gemini Optimization
  console.log('\n4️⃣ Google Gemini Optimization:');
  const geminiOptimizations = await analyzer.getPlatformOptimizations('gemini', '');
  displayOptimizations(geminiOptimizations);

  // Step 3: Platform-specific content examples
  console.log('\n📝 Platform-Optimized Content Examples:\n');

  // Google AI Overview - Featured Snippet Format
  console.log('🔷 Google AI Overview - Optimized Definition Box:');
  console.log('```html');
  console.log(`<div class="definition-box" itemscope itemtype="https://schema.org/DefinedTerm">
  <h2 itemprop="name">What are AI Coding Assistants?</h2>
  <p itemprop="description"><strong>AI coding assistants</strong> are intelligent software tools that use
  machine learning models to help developers write, debug, and optimize code. They provide real-time
  suggestions, complete code snippets, and can even generate entire functions based on natural language
  descriptions.</p>
  <div class="key-features">
    <h3>Key Features:</h3>
    <ul>
      <li>Code completion and generation</li>
      <li>Bug detection and fixing</li>
      <li>Code explanation and documentation</li>
      <li>Multi-language support</li>
    </ul>
  </div>
</div>`);
  console.log('```\n');

  // ChatGPT - Citation-Worthy Data Table
  console.log('🔵 ChatGPT - Citation-Worthy Comparison Table:');
  console.log('```html');
  console.log(`<table class="comparison-table" itemscope itemtype="https://schema.org/Table">
  <caption>AI Coding Assistants Comparison 2025</caption>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Accuracy</th>
      <th>Languages</th>
      <th>Price</th>
      <th>Unique Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>GitHub Copilot</strong></td>
      <td>92%</td>
      <td>40+</td>
      <td>$10/mo</td>
      <td>IDE integration</td>
    </tr>
    <tr>
      <td><strong>ChatGPT Code</strong></td>
      <td>89%</td>
      <td>50+</td>
      <td>$20/mo</td>
      <td>Natural language</td>
    </tr>
    <tr>
      <td><strong>Amazon CodeWhisperer</strong></td>
      <td>87%</td>
      <td>15+</td>
      <td>Free tier</td>
      <td>AWS integration</td>
    </tr>
  </tbody>
</table>
<p class="source">Source: TechGuide Pro original research, January 2025</p>`);
  console.log('```\n');

  // Perplexity - Real-time Data with Sources
  console.log('🟣 Perplexity - Fresh Data with Clear Attribution:');
  console.log('```html');
  console.log(`<section class="latest-updates" data-last-updated="${new Date().toISOString()}">
  <h2>Latest AI Coding Assistant Updates (${new Date().toLocaleDateString()})</h2>
  <div class="update-item">
    <h3>GitHub Copilot X Launch</h3>
    <p>Microsoft announced Copilot X with GPT-4 integration, offering 40% better code completion accuracy
    compared to the previous version <cite><a href="https://github.blog/copilot-x">GitHub Blog, 2025</a></cite>.</p>
    <div class="stats">
      <span class="stat">🚀 40% accuracy improvement</span>
      <span class="stat">📊 2M+ developers using</span>
      <span class="stat">⚡ 55% faster coding</span>
    </div>
  </div>
</section>`);
  console.log('```\n');

  // Gemini - Multimodal Content
  console.log('🔶 Gemini - Multimodal Optimization:');
  console.log('```html');
  console.log(`<div class="multimodal-content">
  <h2>Visual Guide: AI Coding Assistant Workflow</h2>
  <figure>
    <img src="/images/ai-coding-workflow.png"
         alt="Diagram showing AI coding assistant workflow: Input → AI Processing → Code Generation → Review → Implementation"
         loading="lazy">
    <figcaption>AI coding assistants streamline the development workflow through intelligent automation</figcaption>
  </figure>
  <div class="explanation">
    <p>The workflow demonstrates how modern AI coding assistants integrate into the development process:</p>
    <ol>
      <li><strong>Natural Language Input:</strong> Developers describe what they want in plain English</li>
      <li><strong>AI Processing:</strong> The model analyzes context and generates appropriate code</li>
      <li><strong>Smart Suggestions:</strong> Multiple code options are presented with explanations</li>
      <li><strong>Human Review:</strong> Developers review and modify the generated code</li>
      <li><strong>Seamless Integration:</strong> Approved code is integrated into the project</li>
    </ol>
  </div>
</div>`);
  console.log('```\n');

  // Step 4: Platform visibility tracking setup
  console.log('📈 Setting Up Platform Visibility Tracking:\n');
  const visibilityMetrics = await analyzer.trackPlatformVisibility(articleURL);

  console.log('Current Visibility Status:');
  Object.entries(visibilityMetrics).forEach(([platform, visibility]) => {
    console.log(`\n${formatPlatformName(platform)}:`);
    console.log(`├─ Indexed: ${visibility.indexed ? '✅' : '❌'}`);
    console.log(`├─ Citation Frequency: ${visibility.citationFrequency}`);
    console.log(`├─ Average Position: #${visibility.averagePosition}`);
    console.log(`└─ Top Performing Queries:`);
    visibility.queries.slice(0, 3).forEach(query => {
      console.log(`   • ${query}`);
    });
  });

  // Step 5: Optimization recommendations summary
  console.log('\n✨ Key Multi-Platform Optimization Takeaways:\n');
  console.log('1. **Structure Differently for Each Platform:**');
  console.log('   - Google: Focus on featured snippets and quick answers');
  console.log('   - ChatGPT: Provide comprehensive, well-researched content');
  console.log('   - Perplexity: Emphasize freshness and source attribution');
  console.log('   - Gemini: Include visual elements and multimodal content\n');

  console.log('2. **Universal Best Practices:**');
  console.log('   - Use clear, hierarchical heading structure');
  console.log('   - Include unique data points and statistics');
  console.log('   - Add comprehensive schema markup');
  console.log('   - Maintain content freshness with regular updates');
  console.log('   - Build strong entity associations\n');

  console.log('3. **Platform-Specific Features to Leverage:**');
  console.log('   - Google: Rich snippets, knowledge panels, AI overviews');
  console.log('   - ChatGPT: In-depth explanations, step-by-step guides');
  console.log('   - Perplexity: Real-time data, source credibility');
  console.log('   - Gemini: Images, videos, interactive elements\n');

  console.log('🎯 Next Steps:');
  console.log('1. Implement platform-specific optimizations');
  console.log('2. Monitor citation frequency weekly');
  console.log('3. A/B test different content formats');
  console.log('4. Track visibility improvements across all platforms');
}

// Helper functions
function getPlatformEmoji(platform: string): string {
  const emojis: Record<string, string> = {
    'google_ai_overview': '🔷',
    'chatgpt': '🤖',
    'perplexity': '🔮',
    'gemini': '💎',
    'bing_chat': '🔍'
  };
  return emojis[platform] || '📱';
}

function formatPlatformName(platform: string): string {
  const names: Record<string, string> = {
    'google_ai_overview': 'Google AI Overview',
    'chatgpt': 'ChatGPT',
    'perplexity': 'Perplexity AI',
    'gemini': 'Google Gemini',
    'bing_chat': 'Bing Chat'
  };
  return names[platform] || platform;
}

function displayOptimizations(optimizations: any): void {
  if (optimizations.optimizations) {
    optimizations.optimizations.forEach((opt: any, index: number) => {
      console.log(`   ${index + 1}. ${opt.description}`);
      if (opt.implementation) {
        console.log(`      → ${opt.implementation}`);
      }
    });
  }

  if (optimizations.tips) {
    console.log('\n   💡 Platform Tips:');
    optimizations.tips.forEach((tip: string) => {
      console.log(`   • ${tip}`);
    });
  }
}

// Run the example
multiPlatformExample();