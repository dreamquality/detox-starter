# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-19

### Added
- Initial release of Detox Starter boilerplate
- Multiple configuration files (base, local, cloud)
- BrowserStack cloud testing integration
- GitHub Actions CI/CD workflows for iOS and Android
- Comprehensive test examples (login, navigation, basic interactions)
- Helper libraries for common testing patterns:
  - Matchers (waiting, scrolling, typing)
  - Actions (login, navigation, gestures)
  - Assertions (visibility, text, existence)
- HTML test reporting with screenshots and videos
- Detailed documentation:
  - Main README with comprehensive guide
  - Quick Start guide for fast setup
  - Setup guide for platform-specific configuration
  - Integration guide for existing apps
  - Best practices guide for writing maintainable tests
  - Contributing guidelines
- ESLint and Prettier configuration for code quality
- EditorConfig for consistent coding styles
- Example environment variables file
- MIT License

### Configuration
- Base Detox configuration with common settings
- Local configuration optimized for development
- Cloud configuration optimized for BrowserStack
- Jest test runner configuration
- Artifact management for screenshots, videos, and logs

### Tests
- Example test suite demonstrating basic patterns
- Login flow test suite
- Navigation test suite
- All tests follow best practices and use helper functions

### CI/CD
- GitHub Actions workflow for iOS E2E tests
- GitHub Actions workflow for Android E2E tests
- GitHub Actions workflow for BrowserStack cloud tests
- Linting workflow for code quality checks
- Automatic test artifact upload

### Documentation
- Comprehensive README with all features
- Quick start guide for rapid onboarding
- Detailed setup guide for all platforms (macOS, Linux, Windows)
- Integration guide for React Native and native apps
- Best practices guide with code examples
- Contributing guidelines
- Troubleshooting section

### Developer Experience
- Pre-configured npm scripts for all common tasks
- BrowserStack utility script for app upload and device listing
- Clear project structure with logical organization
- Helpful comments in configuration files
- Example test data patterns

## [Unreleased]

### Planned Features
- TypeScript support for tests
- Additional test examples (forms, animations, deep links)
- Video tutorial links
- Performance testing examples
- Accessibility testing examples
- Screenshot comparison testing
- Additional CI/CD providers (CircleCI, GitLab CI)
- Docker support for consistent environments

---

For more details about changes, see the [commit history](https://github.com/dreamquality/detox-starter/commits/main).
