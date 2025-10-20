/**
 * Navigation test suite
 * Demonstrates multi-screen navigation patterns
 */

const { navigateBack } = require('../helpers/actions');
const { assertElementVisible } = require('../helpers/assertions');
const { waitForElementToBeVisible } = require('../helpers/matchers');

describe('Navigation', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to profile screen', async () => {
    // Tap profile tab
    await element(by.id('profileTab')).tap();
    
    // Verify profile screen is visible
    await waitForElementToBeVisible(element(by.id('profileScreen')));
    await assertElementVisible('profileScreen');
  });

  it('should navigate to settings screen', async () => {
    // Tap settings button
    await element(by.id('settingsButton')).tap();
    
    // Verify settings screen is visible
    await waitForElementToBeVisible(element(by.id('settingsScreen')));
    await assertElementVisible('settingsScreen');
  });

  it('should navigate back from settings', async () => {
    // Navigate to settings
    await element(by.id('settingsButton')).tap();
    await waitForElementToBeVisible(element(by.id('settingsScreen')));
    
    // Navigate back
    await navigateBack();
    
    // Verify we're back at home screen
    await assertElementVisible('homeScreen');
  });

  it('should handle deep navigation stack', async () => {
    // Navigate through multiple screens
    await element(by.id('screen1Button')).tap();
    await waitForElementToBeVisible(element(by.id('screen1')));
    
    await element(by.id('screen2Button')).tap();
    await waitForElementToBeVisible(element(by.id('screen2')));
    
    await element(by.id('screen3Button')).tap();
    await waitForElementToBeVisible(element(by.id('screen3')));
    
    // Navigate back through the stack
    await navigateBack();
    await assertElementVisible('screen2');
    
    await navigateBack();
    await assertElementVisible('screen1');
    
    await navigateBack();
    await assertElementVisible('homeScreen');
  });

  it('should handle tab navigation', async () => {
    // Navigate between tabs
    await element(by.id('tab1')).tap();
    await assertElementVisible('tab1Content');
    
    await element(by.id('tab2')).tap();
    await assertElementVisible('tab2Content');
    
    await element(by.id('tab3')).tap();
    await assertElementVisible('tab3Content');
    
    // Go back to first tab
    await element(by.id('tab1')).tap();
    await assertElementVisible('tab1Content');
  });
});
