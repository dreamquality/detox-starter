# Detox Starter

A comprehensive boilerplate for end-to-end testing using [Detox](https://wix.github.io/Detox/) for native mobile applications on iOS and Android. This starter kit includes best practices, multiple configuration options, BrowserStack cloud integration, GitHub Actions CI/CD, and comprehensive test reporting.

## 🚀 Features

- ✅ **Multiple Configurations**: Separate configs for local and cloud (BrowserStack) testing
- ✅ **Best Practices**: Well-structured test patterns and helper functions
- ✅ **GitHub Actions**: Pre-configured CI/CD workflows for iOS and Android
- ✅ **Test Reporting**: HTML test reports with screenshots and videos
- ✅ **BrowserStack Integration**: Ready-to-use cloud testing setup
- ✅ **Helper Libraries**: Reusable matchers, actions, and assertions
- ✅ **Example Tests**: Comprehensive test examples covering common scenarios

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- For iOS testing:
  - macOS with Xcode installed
  - CocoaPods
  - iOS Simulator
- For Android testing:
  - Java Development Kit (JDK) 11+
  - Android SDK
  - Android Emulator
- For BrowserStack testing:
  - BrowserStack account with App Automate access

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dreamquality/detox-starter.git
   cd detox-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Detox CLI globally**
   ```bash
   npm install -g detox-cli
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up iOS (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 📁 Project Structure

```
detox-starter/
├── e2e/                          # E2E test directory
│   ├── config/                   # Configuration files
│   │   ├── base.config.js       # Base configuration
│   │   ├── local.config.js      # Local testing config
│   │   └── cloud.config.js      # Cloud (BrowserStack) config
│   ├── helpers/                  # Helper functions
│   │   ├── actions.js           # Common action helpers
│   │   ├── assertions.js        # Custom assertions
│   │   └── matchers.js          # Custom matchers
│   ├── tests/                    # Test files
│   │   ├── example.e2e.js       # Example tests
│   │   ├── login.e2e.js         # Login flow tests
│   │   └── navigation.e2e.js    # Navigation tests
│   ├── config.json              # Jest configuration
│   └── environment.js           # Test environment setup
├── .github/
│   └── workflows/               # GitHub Actions workflows
│       ├── e2e-tests.yml        # E2E test workflow
│       └── lint.yml             # Linting workflow
├── browserstack.yml             # BrowserStack configuration
├── browserstack-setup.js        # BrowserStack utility script
├── package.json                 # Project dependencies and scripts
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc.js               # Prettier configuration
└── .env.example                 # Environment variables template
```

## 🧪 Running Tests

### Local Testing

#### iOS Simulator
```bash
# Build iOS app for testing (debug)
npm run build:e2e:ios:debug

# Run iOS tests (debug)
npm run test:e2e:ios:debug

# Build and run iOS release tests
npm run build:e2e:ios:release
npm run test:e2e:ios:release
```

#### Android Emulator
```bash
# Build Android app for testing (debug)
npm run build:e2e:android:debug

# Run Android tests (debug)
npm run test:e2e:android:debug

# Build and run Android release tests
npm run build:e2e:android:release
npm run test:e2e:android:release
```

### Cloud Testing (BrowserStack)

1. **Configure BrowserStack credentials**
   ```bash
   export BROWSERSTACK_USERNAME=your_username
   export BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

2. **Upload your app to BrowserStack**
   ```bash
   node browserstack-setup.js upload android/app/build/outputs/apk/release/app-release.apk detox-android
   node browserstack-setup.js upload ios/build/Build/Products/Release-iphonesimulator/YourApp.app detox-ios
   ```

3. **Run BrowserStack tests**
   ```bash
   # Android on BrowserStack
   npm run test:e2e:bs:android

   # iOS on BrowserStack
   npm run test:e2e:bs:ios
   ```

## 📝 Configuration Details

### Base Configuration (`e2e/config/base.config.js`)
Contains common settings shared across all environments:
- Test runner configuration
- Artifact settings (screenshots, videos, logs)
- Behavior settings
- Logger configuration

### Local Configuration (`e2e/config/local.config.js`)
Optimized for local development:
- Faster test execution (video recording disabled)
- More verbose logging for debugging
- Device kept running between tests
- All artifacts saved for analysis

### Cloud Configuration (`e2e/config/cloud.config.js`)
Optimized for BrowserStack cloud testing:
- BrowserStack session configuration
- Space-optimized artifact saving
- Manual app launch control
- Proper cleanup after tests

## 🔧 Helper Functions

### Matchers (`e2e/helpers/matchers.js`)
- `waitForElementToBeVisible()` - Wait for element visibility
- `waitForElementToNotBeVisible()` - Wait for element to disappear
- `scrollToElement()` - Scroll to specific element
- `typeTextSlowly()` - Type with character delay
- `takeNamedScreenshot()` - Take custom screenshot
- `relaunchAppWithPermissions()` - Relaunch with permissions
- `openDeepLink()` - Open deep link URL

### Actions (`e2e/helpers/actions.js`)
- `login()` - Login helper
- `logout()` - Logout helper
- `navigateBack()` - Navigate back
- `swipeElement()` - Swipe gestures
- `pullToRefresh()` - Pull-to-refresh action
- `waitForAppReady()` - Wait for app initialization

### Assertions (`e2e/helpers/assertions.js`)
- `assertElementVisible()` - Assert element is visible
- `assertElementNotVisible()` - Assert element is not visible
- `assertElementHasText()` - Assert element text content
- `assertElementExists()` - Assert element exists
- `assertElementNotExist()` - Assert element doesn't exist
- `assertTextVisible()` - Assert text is visible on screen

## 🧑‍💻 Writing Tests

### Basic Test Structure
```javascript
const { waitForElementToBeVisible } = require('../helpers/matchers');
const { assertElementVisible } = require('../helpers/assertions');

describe('My Feature', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display welcome screen', async () => {
    await waitForElementToBeVisible(element(by.id('welcomeScreen')));
    await assertElementVisible('welcomeScreen');
  });
});
```

### Using Helper Functions
```javascript
const { login, logout } = require('../helpers/actions');
const { assertElementVisible } = require('../helpers/assertions');

it('should login successfully', async () => {
  await login('testuser', 'password123');
  await assertElementVisible('homeScreen');
});
```

## 🎯 Best Practices

1. **Use Test IDs**: Add `testID` prop to components for reliable element selection
2. **Wait for Elements**: Always wait for elements before interacting
3. **Isolate Tests**: Each test should be independent and cleanup after itself
4. **Use Helpers**: Leverage helper functions for common operations
5. **Descriptive Names**: Use clear, descriptive test and variable names
6. **Page Objects**: Consider using page object pattern for complex screens
7. **Avoid Hardcoded Waits**: Use `waitFor()` instead of `sleep()`
8. **Clean State**: Reset app state between tests
9. **Meaningful Assertions**: Add clear assertion messages
10. **Test Data Management**: Use test data factories or fixtures

## 📊 Test Reports

Test reports are automatically generated in `e2e/artifacts/html-report/report.html` after each test run. The reports include:
- Test execution summary
- Screenshots on failure
- Video recordings (when enabled)
- Detailed logs
- Execution timeline

Open the report in a browser:
```bash
open e2e/artifacts/html-report/report.html
```

## 🔄 CI/CD with GitHub Actions

### Workflows Included

1. **E2E Tests** (`.github/workflows/e2e-tests.yml`)
   - iOS tests on macOS runners
   - Android tests on Linux with emulator
   - BrowserStack cloud tests (on main branch)
   - Automatic artifact upload

2. **Lint** (`.github/workflows/lint.yml`)
   - ESLint checks on every push/PR

### Setting up GitHub Actions

1. **Add BrowserStack secrets** (for cloud tests):
   - Go to Settings → Secrets → Actions
   - Add `BROWSERSTACK_USERNAME`
   - Add `BROWSERSTACK_ACCESS_KEY`

2. **Configure workflows**:
   - Workflows run automatically on push/PR
   - Adjust timeout and other settings as needed

## 🌐 BrowserStack Integration

### Features
- Automated app upload
- Multiple device testing
- Video recording
- Network logs
- Device logs
- Appium logs

### BrowserStack Utilities
```bash
# Upload app
node browserstack-setup.js upload <file-path> [custom-id]

# List available devices
node browserstack-setup.js devices

# Get session status
node browserstack-setup.js session <session-id>
```

### Configuration
Edit `browserstack.yml` to:
- Add/remove test devices
- Configure test settings
- Enable/disable features (video, logs, etc.)

## 🐛 Troubleshooting

### iOS Issues
- **Build fails**: Clean build folder and rebuild Xcode project
- **Simulator not found**: List available simulators with `xcrun simctl list`
- **Pod install fails**: Update CocoaPods with `sudo gem install cocoapods`

### Android Issues
- **Emulator not found**: Create AVD in Android Studio
- **Build fails**: Clean gradle cache `cd android && ./gradlew clean`
- **ADB issues**: Restart ADB server with `adb kill-server && adb start-server`

### Detox Issues
- **Tests timeout**: Increase timeout in config.json
- **Element not found**: Verify testID is set correctly in the app
- **Detox server connection**: Check firewall settings

### BrowserStack Issues
- **Upload fails**: Verify credentials and internet connection
- **Session not starting**: Check BrowserStack quota and device availability
- **Connection timeout**: Ensure BrowserStack Local is running

## 🔍 Debugging

### Enable Verbose Logging
```bash
# iOS
detox test --configuration ios.sim.debug --loglevel trace

# Android
detox test --configuration android.emu.debug --loglevel trace
```

### Record Video
Videos are automatically recorded based on configuration. Find them in:
```
e2e/artifacts/<device>/<timestamp>/
```

### Take Screenshots
```javascript
await device.takeScreenshot('my-screenshot');
```

## 📚 Additional Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [BrowserStack App Automate](https://www.browserstack.com/app-automate)
- [Jest Documentation](https://jestjs.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Refer to Detox documentation

---

**Happy Testing! 🎉**