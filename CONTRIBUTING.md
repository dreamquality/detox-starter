# Contributing to Detox Starter

Thank you for considering contributing to Detox Starter! This document provides guidelines and instructions for contributing.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Environment details** (OS, Node version, Detox version, etc.)
- **Screenshots or videos** if applicable
- **Error logs** or stack traces

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the enhancement
- **Use case** - explain why this would be useful
- **Proposed solution** or implementation approach
- **Alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Add or update tests** as needed
4. **Update documentation** if you're changing functionality
5. **Ensure tests pass** by running the test suite
6. **Create a pull request** with a clear description

## 💻 Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/detox-starter.git
   cd detox-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### JavaScript/TypeScript
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Follow ESLint rules defined in `.eslintrc.js`
- Run `npm run lint:fix` before committing

### Test Files
- Name test files with `.e2e.js` extension
- Use descriptive test names: `it('should display welcome message', ...)`
- Group related tests in `describe` blocks
- Use helper functions to keep tests DRY
- Add comments for complex test logic

### Configuration Files
- Use clear, descriptive variable names
- Add comments explaining non-obvious configurations
- Keep configurations modular and reusable

## 🧪 Testing Your Changes

### Running Tests Locally

```bash
# Lint your code
npm run lint

# Run iOS tests
npm run test:e2e:ios:debug

# Run Android tests
npm run test:e2e:android:debug
```

### Writing New Tests

1. Create test file in `e2e/tests/` directory
2. Follow existing test patterns
3. Use helper functions from `e2e/helpers/`
4. Ensure tests are isolated and can run independently
5. Add meaningful assertions

Example:
```javascript
describe('New Feature', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should test new feature', async () => {
    // Your test code
  });
});
```

## 📚 Documentation

### README Updates
- Keep README.md up-to-date with new features
- Use clear, concise language
- Include code examples
- Add troubleshooting tips for common issues

### Code Comments
- Add comments for complex logic
- Document function parameters and return values
- Use JSDoc style for function documentation

Example:
```javascript
/**
 * Upload app to BrowserStack
 * @param {string} filePath - Path to the app file
 * @param {string} customId - Custom ID for the app
 * @returns {Promise<string>} App URL
 */
async function uploadApp(filePath, customId) {
  // Implementation
}
```

## 🔀 Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Example:
```
Add BrowserStack parallel testing support

- Implement parallel test execution
- Update BrowserStack configuration
- Add documentation for parallel testing

Fixes #123
```

## 🏷️ Versioning

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

## ✅ Pull Request Checklist

Before submitting your pull request, ensure:

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass locally
- [ ] No linting errors
- [ ] Commit messages are clear
- [ ] PR description is detailed

## 🤔 Questions?

Feel free to:
- Open an issue for clarification
- Ask in pull request comments
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Detox Starter! 🎉
