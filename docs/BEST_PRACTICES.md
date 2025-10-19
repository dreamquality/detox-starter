# Detox Testing Best Practices

This guide covers best practices for writing maintainable and reliable E2E tests with Detox.

## Table of Contents

- [Test Structure](#test-structure)
- [Element Selection](#element-selection)
- [Waiting and Synchronization](#waiting-and-synchronization)
- [Test Data Management](#test-data-management)
- [Common Patterns](#common-patterns)
- [Performance Optimization](#performance-optimization)
- [Debugging](#debugging)

## Test Structure

### Organize Tests by Feature

```javascript
// ✅ Good - organized by feature
describe('Login Feature', () => {
  describe('Valid Credentials', () => {
    it('should login successfully', async () => {});
  });
  
  describe('Invalid Credentials', () => {
    it('should show error message', async () => {});
  });
});

// ❌ Bad - unorganized
describe('Tests', () => {
  it('test1', async () => {});
  it('test2', async () => {});
});
```

### Use Descriptive Test Names

```javascript
// ✅ Good - clear and descriptive
it('should display error message when password is less than 6 characters', async () => {});

// ❌ Bad - vague
it('should work', async () => {});
it('test password', async () => {});
```

### Setup and Teardown

```javascript
describe('Feature', () => {
  // Run once before all tests
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' },
    });
  });

  // Run before each test
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // Run after each test
  afterEach(async () => {
    // Clean up test data
  });

  // Run once after all tests
  afterAll(async () => {
    // Final cleanup if needed
  });
});
```

## Element Selection

### Use Test IDs

```javascript
// ✅ Good - reliable and fast
await element(by.id('loginButton')).tap();

// ⚠️ Acceptable - but slower and language-dependent
await element(by.text('Login')).tap();

// ❌ Bad - fragile and slow
await element(by.type('RCTButton')).atIndex(0).tap();
```

### Add Test IDs to Components

```jsx
// React Native component
<Button testID="loginButton" onPress={handleLogin}>
  Login
</Button>

<TextInput testID="usernameInput" />
<View testID="profileScreen" />
```

### Hierarchical Test IDs

```javascript
// For dynamic lists or repeated elements
await element(by.id('userList.item.0')).tap();
await element(by.id('userList.item.1.deleteButton')).tap();
```

## Waiting and Synchronization

### Always Wait for Elements

```javascript
// ✅ Good - explicit wait
await waitFor(element(by.id('profile')))
  .toBeVisible()
  .withTimeout(5000);

// ❌ Bad - race condition
await element(by.id('profile')).tap();
```

### Use waitFor Instead of sleep

```javascript
// ✅ Good - wait for condition
await waitFor(element(by.id('loadingIndicator')))
  .not.toBeVisible()
  .withTimeout(10000);

// ❌ Bad - arbitrary wait
await new Promise(resolve => setTimeout(resolve, 5000));
```

### Handle Async Operations

```javascript
// ✅ Good - wait for data to load
await element(by.id('refreshButton')).tap();
await waitFor(element(by.id('loadingIndicator')))
  .not.toBeVisible()
  .withTimeout(10000);
await expect(element(by.id('dataList'))).toBeVisible();

// ❌ Bad - assuming immediate response
await element(by.id('refreshButton')).tap();
await expect(element(by.id('dataList'))).toBeVisible();
```

## Test Data Management

### Use Test Data Factories

```javascript
// testData.js
const createTestUser = (overrides = {}) => ({
  username: 'testuser',
  email: 'test@example.com',
  password: 'Test123!',
  ...overrides,
});

// In test
const user = createTestUser({ username: 'john' });
await login(user.username, user.password);
```

### Clean Up Test Data

```javascript
describe('User Management', () => {
  const testUsers = [];

  afterEach(async () => {
    // Clean up created users
    for (const user of testUsers) {
      await deleteUser(user.id);
    }
    testUsers.length = 0;
  });

  it('should create user', async () => {
    const user = await createUser();
    testUsers.push(user);
    // Test user creation
  });
});
```

### Use Environment-Specific Data

```javascript
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    testUser: 'dev@test.com',
  },
  staging: {
    apiUrl: 'https://staging.example.com',
    testUser: 'staging@test.com',
  },
};

const env = process.env.NODE_ENV || 'development';
const testConfig = config[env];
```

## Common Patterns

### Page Object Pattern

```javascript
// pages/LoginPage.js
class LoginPage {
  get usernameInput() {
    return element(by.id('usernameInput'));
  }

  get passwordInput() {
    return element(by.id('passwordInput'));
  }

  get loginButton() {
    return element(by.id('loginButton'));
  }

  get errorMessage() {
    return element(by.id('errorMessage'));
  }

  async login(username, password) {
    await this.usernameInput.typeText(username);
    await this.passwordInput.typeText(password);
    await this.loginButton.tap();
  }

  async assertErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}

// In test
const loginPage = new LoginPage();
await loginPage.login('user', 'pass');
```

### Helper Functions

```javascript
// helpers/navigation.js
async function navigateToScreen(screenId) {
  await element(by.id(`nav-${screenId}`)).tap();
  await waitFor(element(by.id(screenId)))
    .toBeVisible()
    .withTimeout(5000);
}

// In test
await navigateToScreen('profile');
```

### Reusable Assertions

```javascript
// helpers/assertions.js
async function assertScreenVisible(screenId) {
  await waitFor(element(by.id(screenId)))
    .toBeVisible()
    .withTimeout(5000);
  await expect(element(by.id(screenId))).toBeVisible();
}

// In test
await assertScreenVisible('homeScreen');
```

## Performance Optimization

### Minimize App Restarts

```javascript
// ✅ Good - reuse app instance
describe('Feature Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative(); // Faster than relaunch
  });
});

// ❌ Bad - restart for each test
describe('Feature Tests', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true }); // Slow
  });
});
```

### Use Parallel Testing

```json
// package.json
{
  "scripts": {
    "test:e2e:parallel": "detox test --configuration ios.sim.debug --workers 2"
  }
}
```

### Disable Animations

```javascript
// In app code (development mode)
if (__DEV__) {
  const { LayoutAnimation } = require('react-native');
  LayoutAnimation.configureNext = () => {};
}
```

### Optimize Waiting

```javascript
// ✅ Good - appropriate timeout
await waitFor(element(by.id('quickElement')))
  .toBeVisible()
  .withTimeout(2000);

// ❌ Bad - unnecessarily long timeout
await waitFor(element(by.id('quickElement')))
  .toBeVisible()
  .withTimeout(30000);
```

## Debugging

### Enable Verbose Logging

```bash
detox test --loglevel trace
```

### Take Screenshots

```javascript
it('should display profile', async () => {
  await device.takeScreenshot('before-action');
  await element(by.id('profileButton')).tap();
  await device.takeScreenshot('after-action');
});
```

### Use Try-Catch for Better Errors

```javascript
it('should handle error gracefully', async () => {
  try {
    await element(by.id('button')).tap();
    await expect(element(by.id('result'))).toBeVisible();
  } catch (error) {
    await device.takeScreenshot('error-state');
    throw error;
  }
});
```

### Debug Element Selection

```javascript
// Check if element exists
const attributes = await element(by.id('myElement')).getAttributes();
console.log('Element attributes:', attributes);

// Log all elements on screen
await device.takeScreenshot('debug-screen');
```

### Isolate Failing Tests

```javascript
// Focus on single test
it.only('should test specific feature', async () => {
  // Test code
});

// Skip flaky test temporarily
it.skip('should test flaky feature', async () => {
  // Test code
});
```

## Error Handling

### Handle Expected Errors

```javascript
// ✅ Good - handle expected scenarios
try {
  await element(by.id('optionalElement')).tap();
} catch (error) {
  // Element might not be present, continue
  console.log('Optional element not found, continuing...');
}

// ❌ Bad - catch everything silently
try {
  await element(by.id('criticalElement')).tap();
} catch (error) {
  // Hiding real problems
}
```

### Retry Logic for Flaky Operations

```javascript
async function tapWithRetry(elementId, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await element(by.id(elementId)).tap();
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
```

## Platform-Specific Tests

```javascript
describe('Platform specific behavior', () => {
  it('should handle iOS specific feature', async () => {
    if (device.getPlatform() === 'ios') {
      await element(by.id('iosOnlyButton')).tap();
      await expect(element(by.id('iosResult'))).toBeVisible();
    }
  });

  it('should handle Android specific feature', async () => {
    if (device.getPlatform() === 'android') {
      await element(by.id('androidOnlyButton')).tap();
      await expect(element(by.id('androidResult'))).toBeVisible();
    }
  });
});
```

## Test Independence

### Each Test Should Be Independent

```javascript
// ✅ Good - independent tests
describe('Counter', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should increment counter', async () => {
    await element(by.id('incrementButton')).tap();
    await expect(element(by.id('counter'))).toHaveText('1');
  });

  it('should decrement counter', async () => {
    await element(by.id('decrementButton')).tap();
    await expect(element(by.id('counter'))).toHaveText('-1');
  });
});

// ❌ Bad - tests depend on each other
describe('Counter', () => {
  it('should start at 0', async () => {
    await expect(element(by.id('counter'))).toHaveText('0');
  });

  it('should increment to 1', async () => {
    // Depends on previous test state
    await element(by.id('incrementButton')).tap();
    await expect(element(by.id('counter'))).toHaveText('1');
  });
});
```

## Documentation

### Comment Complex Logic

```javascript
it('should handle complex workflow', async () => {
  // Step 1: Navigate to settings
  await element(by.id('settingsButton')).tap();
  
  // Step 2: Toggle notification preference
  // This triggers a backend sync, so we need to wait
  await element(by.id('notificationToggle')).tap();
  await waitFor(element(by.id('syncIndicator')))
    .not.toBeVisible()
    .withTimeout(10000);
  
  // Step 3: Verify setting persisted
  await device.reloadReactNative();
  await element(by.id('settingsButton')).tap();
  await expect(element(by.id('notificationToggle'))).toHaveToggleValue(true);
});
```

## Summary

Key takeaways:
- Use test IDs for reliable element selection
- Always wait for elements instead of using arbitrary delays
- Keep tests independent and isolated
- Use helper functions and page objects for maintainability
- Write descriptive test names and comments
- Handle platform differences appropriately
- Optimize for performance without sacrificing reliability
- Include proper error handling and debugging aids

Following these best practices will help you build a robust, maintainable test suite that provides confidence in your app's quality.
