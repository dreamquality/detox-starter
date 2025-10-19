/**
 * Login flow test
 * Demonstrates authentication testing patterns
 */

const { login, logout } = require('../helpers/actions');
const {
  assertElementVisible,
  assertElementNotVisible,
  assertTextVisible,
} = require('../helpers/assertions');
const { waitForElementToBeVisible } = require('../helpers/matchers');

describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display login screen', async () => {
    // Verify login elements are visible
    await assertElementVisible('usernameInput');
    await assertElementVisible('passwordInput');
    await assertElementVisible('loginButton');
  });

  it('should show validation error for empty fields', async () => {
    // Tap login without entering credentials
    await element(by.id('loginButton')).tap();
    
    // Verify error message appears
    await waitForElementToBeVisible(element(by.id('errorMessage')));
    await assertTextVisible('Please enter username and password');
  });

  it('should login with valid credentials', async () => {
    // Use login helper
    await login('testuser', 'testpass123');
    
    // Wait for home screen
    await waitForElementToBeVisible(element(by.id('homeScreen')));
    
    // Verify login was successful
    await assertElementVisible('homeScreen');
    await assertElementNotVisible('loginButton');
  });

  it('should show error for invalid credentials', async () => {
    // Try to login with invalid credentials
    await login('wronguser', 'wrongpass');
    
    // Verify error message appears
    await waitForElementToBeVisible(element(by.id('errorMessage')));
    await assertTextVisible('Invalid credentials');
  });

  it('should logout successfully', async () => {
    // First login
    await login('testuser', 'testpass123');
    await waitForElementToBeVisible(element(by.id('homeScreen')));
    
    // Then logout
    await logout();
    
    // Verify we're back at login screen
    await assertElementVisible('loginButton');
  });

  it('should clear input fields on logout', async () => {
    // Login
    await login('testuser', 'testpass123');
    await waitForElementToBeVisible(element(by.id('homeScreen')));
    
    // Logout
    await logout();
    
    // Verify input fields are empty
    await assertElementVisible('usernameInput');
    const usernameText = await element(by.id('usernameInput')).getAttributes();
    expect(usernameText.text).toBe('');
  });
});
