# Contributing to AI SEO Optimization Skill

Thank you for your interest in contributing to the AI SEO Optimization Skill! This guide will help you get started.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ai-seo-optimization.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Submit a pull request

## Development Setup

### Prerequisites
- Node.js 18+
- TypeScript 5.0+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ai-seo-optimization.git
cd ai-seo-optimization

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

### Environment Variables
Create a `.env` file for testing:
```env
OPENAI_API_KEY=your-openai-key
PERPLEXITY_API_KEY=your-perplexity-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

## Contributing Guidelines

### What We're Looking For

We welcome contributions in the following areas:

1. **New Features**
   - Additional AI platform support
   - New optimization strategies
   - Enhanced analytics capabilities
   - Improved schema generation

2. **Bug Fixes**
   - Performance improvements
   - Error handling enhancements
   - Cross-platform compatibility

3. **Documentation**
   - Code examples
   - Best practices guides
   - API documentation improvements
   - Tutorials and how-tos

4. **Testing**
   - Unit tests
   - Integration tests
   - Performance benchmarks
   - Real-world case studies

### Code Standards

#### TypeScript Style Guide
- Use TypeScript strict mode
- Define explicit types (avoid `any`)
- Use interfaces for object shapes
- Document public APIs with JSDoc

```typescript
/**
 * Analyzes content for entity optimization opportunities
 * @param html - The HTML content to analyze
 * @param options - Optional analysis parameters
 * @returns Entity analysis results with score and recommendations
 */
export async function analyzeEntities(
  html: string,
  options?: EntityAnalysisOptions
): Promise<EntityAnalysis> {
  // Implementation
}
```

#### Naming Conventions
- Classes: PascalCase (e.g., `EntityOptimizer`)
- Functions/Methods: camelCase (e.g., `analyzeContent`)
- Constants: UPPER_SNAKE_CASE (e.g., `AI_PLATFORMS`)
- Interfaces: PascalCase with 'I' prefix optional (e.g., `ContentAnalysis`)

#### File Structure
```
src/
├── optimizers/      # Optimization components
├── analyzers/       # Analysis components
├── monitors/        # Monitoring components
├── utils/          # Utility functions
├── types.ts        # Type definitions
├── constants.ts    # Constants
└── index.ts        # Main exports
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Place test files next to source files with `.test.ts` extension
- Use descriptive test names
- Test edge cases and error conditions
- Mock external API calls

Example test:
```typescript
describe('EntityOptimizer', () => {
  let optimizer: EntityOptimizer;

  beforeEach(() => {
    optimizer = new EntityOptimizer({
      brand: 'TestBrand',
      domain: 'test.com',
      apiKeys: {}
    });
  });

  describe('analyzeEntities', () => {
    it('should detect organization schema', async () => {
      const html = '<script type="application/ld+json">{"@type":"Organization"}</script>';
      const result = await optimizer.analyzeEntities(html);
      expect(result.entities).toHaveLength(1);
      expect(result.score).toBeGreaterThan(0);
    });

    it('should handle invalid HTML gracefully', async () => {
      const html = '<invalid>html</notclosed>';
      await expect(optimizer.analyzeEntities(html)).resolves.not.toThrow();
    });
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update Documentation**
   - Update README.md if adding features
   - Update API.md for API changes
   - Add code examples for new features

2. **Ensure Quality**
   - All tests pass
   - Code follows style guidelines
   - No linting errors
   - Coverage doesn't decrease

3. **Write Good Commit Messages**
   ```
   feat: add Bing Chat platform support

   - Implement BingChatAnalyzer class
   - Add platform-specific optimizations
   - Include citation tracking for Bing

   Closes #123
   ```

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### Review Process
- PRs require at least one review
- Address review feedback promptly
- Keep PRs focused and reasonably sized
- Link related issues

## Reporting Issues

### Bug Reports
Use this template:
```markdown
**Description**
Clear description of the bug

**To Reproduce**
1. Initialize optimizer with config...
2. Call method with parameters...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Version: 1.0.0
- Node: 18.0.0
- OS: macOS 13.0

**Additional Context**
Error messages, logs, screenshots
```

### Feature Requests
Use this template:
```markdown
**Problem**
What problem does this solve?

**Solution**
Proposed solution

**Alternatives**
Other approaches considered

**Additional Context**
Examples, mockups, references
```

## Development Tips

### Local Testing
```bash
# Link package locally
npm link

# In test project
npm link ai-seo-optimization
```

### Debugging
```typescript
// Use debug namespace
import debug from 'debug';
const log = debug('ai-seo:entity-optimizer');

log('Analyzing entities for %s', url);
```

### Performance Considerations
- Cache expensive operations
- Use streaming for large HTML documents
- Implement request pooling for API calls
- Add progress callbacks for long operations

## Community

- Join discussions in GitHub Issues
- Share your use cases and success stories
- Help others with questions
- Contribute to documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to making AI SEO optimization better for everyone! 🚀