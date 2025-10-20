/**
 * Example Detox E2E test
 * Demonstrates basic testing patterns and best practices
 */

const {
  waitForElementToBeVisible,
  takeNamedScreenshot,
} = require('../helpers/matchers');
const {
  assertElementVisible,
  assertElementHasText,
  assertTextVisible,
} = require('../helpers/assertions');
const { waitForAppReady } = require('../helpers/actions');

describe('Example Test Suite', () => {
  // Run before all tests in this suite
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

  // Test case 1: App launches successfully
  it('should launch the app successfully', async () => {
    // Wait for the app container to be visible
    await waitForAppReady();
    
    // Take a screenshot for visual verification
    await takeNamedScreenshot('app-launched');
    
    // Assert main container is visible
    await assertElementVisible('appContainer');
  });

  // Test case 2: Display welcome message
  it('should display welcome message', async () => {
    // Wait for welcome text element
    await waitForElementToBeVisible(element(by.id('welcomeText')));
    
    // Assert the welcome text is displayed
    await assertTextVisible('Welcome to Detox Starter!');
  });

  // Test case 3: Button interaction
  it('should respond to button tap', async () => {
    // Find and tap the button
    await element(by.id('exampleButton')).tap();
    
    // Wait for response text to appear
    await waitForElementToBeVisible(element(by.id('responseText')));
    
    // Verify the response text
    await assertElementHasText('responseText', 'Button was tapped!');
  });

  // Test case 4: Text input
  it('should accept text input', async () => {
    // Clear any existing text
    await element(by.id('textInput')).clearText();
    
    // Type text into input field
    await element(by.id('textInput')).typeText('Hello Detox');
    
    // Verify the input has the correct text
    await assertElementHasText('textInput', 'Hello Detox');
  });

  // Test case 5: Scroll behavior
  it('should scroll to element', async () => {
    // Scroll to a specific element
    await element(by.id('scrollView')).scroll(200, 'down');
    
    // Verify the scrolled-to element is visible
    await assertElementVisible('bottomElement');
  });

  // Test case 6: Navigation
  it('should navigate between screens', async () => {
    // Tap navigation button
    await element(by.id('navigateButton')).tap();
    
    // Wait for next screen to load
    await waitForElementToBeVisible(element(by.id('secondScreen')));
    
    // Verify we're on the second screen
    await assertElementVisible('secondScreen');
    
    // Navigate back
    await element(by.id('backButton')).tap();
    
    // Verify we're back on the first screen
    await assertElementVisible('appContainer');
  });

  // Clean up after each test
  afterEach(async () => {
    await device.reloadReactNative();
  });
});
