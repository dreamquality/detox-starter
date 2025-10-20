# Quick Start Guide

Get up and running with Detox Starter in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
npm install -g detox-cli
```

### 2. Platform Setup

**iOS (macOS only):**
```bash
# Install applesimutils
brew tap wix/brew
brew install applesimutils

# Install pods (if you have a React Native app)
cd ios && pod install && cd ..
```

**Android:**
```bash
# Make sure you have:
# - Android Studio installed
# - ANDROID_HOME environment variable set
# - An AVD (Android Virtual Device) created

# Verify setup
adb version
emulator -list-avds
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

## 🧪 Run Your First Test

### iOS
```bash
# Build the app (skip if you don't have an app yet)
npm run build:e2e:ios:debug

# Run tests
npm run test:e2e:ios:debug
```

### Android
```bash
# Start emulator first
emulator -avd Pixel_5_API_31 &

# Build the app (skip if you don't have an app yet)
npm run build:e2e:android:debug

# Run tests
npm run test:e2e:android:debug
```

## 📝 Write Your First Test

Create a new test file in `e2e/tests/mytest.e2e.js`:

```javascript
const { waitForElementToBeVisible } = require('../helpers/matchers');
const { assertElementVisible } = require('../helpers/assertions');

describe('My First Test', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should display the app', async () => {
    // Wait for your app's main screen
    await waitForElementToBeVisible(element(by.id('mainScreen')));
    
    // Assert it's visible
    await assertElementVisible('mainScreen');
    
    // Take a screenshot
    await device.takeScreenshot('my-first-test');
  });
});
```

## 🎯 Available Commands

| Command | Description |
|---------|-------------|
| `npm run test:e2e:ios:debug` | Run iOS tests (debug) |
| `npm run test:e2e:ios:release` | Run iOS tests (release) |
| `npm run test:e2e:android:debug` | Run Android tests (debug) |
| `npm run test:e2e:android:release` | Run Android tests (release) |
| `npm run test:e2e:bs:ios` | Run iOS tests on BrowserStack |
| `npm run test:e2e:bs:android` | Run Android tests on BrowserStack |
| `npm run build:e2e:ios:debug` | Build iOS app for testing |
| `npm run build:e2e:android:debug` | Build Android app for testing |
| `npm run lint` | Lint test files |
| `npm run lint:fix` | Fix linting issues |

## 🔧 Configuration Files

### Local Testing (Default)
Uses `e2e/config/local.config.js` - optimized for fast local development

### Cloud Testing (BrowserStack)
Uses `e2e/config/cloud.config.js` - optimized for cloud execution

### Base Configuration
All configs extend `e2e/config/base.config.js`

## 📦 Project Structure

```
detox-starter/
├── e2e/                      # All test files
│   ├── config/              # Configuration files
│   │   ├── base.config.js   # Base config
│   │   ├── local.config.js  # Local testing
│   │   └── cloud.config.js  # Cloud testing
│   ├── helpers/             # Helper functions
│   │   ├── actions.js       # Common actions
│   │   ├── assertions.js    # Custom assertions
│   │   └── matchers.js      # Custom matchers
│   ├── tests/               # Test files
│   │   ├── example.e2e.js
│   │   ├── login.e2e.js
│   │   └── navigation.e2e.js
│   ├── config.json          # Jest config
│   └── environment.js       # Test environment
├── .github/workflows/       # CI/CD workflows
├── docs/                    # Documentation
│   ├── SETUP.md            # Detailed setup
│   └── BEST_PRACTICES.md   # Best practices
└── package.json            # Dependencies
```

## 🌐 BrowserStack Quick Setup

1. **Set credentials:**
   ```bash
   export BROWSERSTACK_USERNAME=your_username
   export BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

2. **Upload your app:**
   ```bash
   node browserstack-setup.js upload path/to/app.apk my-app
   ```

3. **Run tests:**
   ```bash
   npm run test:e2e:bs:android
   ```

## 📚 Helper Functions

### Matchers
- `waitForElementToBeVisible(element, timeout)`
- `waitForElementToNotBeVisible(element, timeout)`
- `scrollToElement(element, scrollView)`
- `typeTextSlowly(element, text)`

### Actions
- `login(username, password)`
- `logout()`
- `navigateBack()`
- `swipeElement(element, direction)`
- `waitForAppReady(timeout)`

### Assertions
- `assertElementVisible(elementId)`
- `assertElementNotVisible(elementId)`
- `assertElementHasText(elementId, text)`
- `assertElementExists(elementId)`
- `assertTextVisible(text)`

## 🐛 Common Issues

### "Element not found"
- Make sure you've added `testID` props to your components
- Use `device.takeScreenshot()` to see what's on screen

### "Timeout waiting for element"
- Increase timeout: `withTimeout(10000)`
- Check if element is rendered conditionally

### Tests are slow
- Use `device.reloadReactNative()` instead of `device.launchApp()`
- Disable video recording in config for local tests

## 📖 Next Steps

1. Read [SETUP.md](docs/SETUP.md) for detailed platform setup
2. Review [BEST_PRACTICES.md](docs/BEST_PRACTICES.md) for testing patterns
3. Check [README.md](README.md) for comprehensive documentation
4. Explore example tests in `e2e/tests/`
5. Configure GitHub Actions for CI/CD

## 🆘 Getting Help

- Check the [troubleshooting section](README.md#-troubleshooting)
- Review [Detox documentation](https://wix.github.io/Detox/)
- Open an issue on GitHub

---

**Ready to test? Let's go!** 🎉
