/**
 * Custom matchers and helper functions for Detox tests
 */

/**
 * Wait for element to be visible with retry logic
 * @param {Detox.Element} element - Detox element
 * @param {number} timeout - Timeout in milliseconds (default: 5000)
 */
async function waitForElementToBeVisible(element, timeout = 5000) {
  await waitFor(element)
    .toBeVisible()
    .withTimeout(timeout);
}

/**
 * Wait for element to not be visible
 * @param {Detox.Element} element - Detox element
 * @param {number} timeout - Timeout in milliseconds (default: 5000)
 */
async function waitForElementToNotBeVisible(element, timeout = 5000) {
  await waitFor(element)
    .not.toBeVisible()
    .withTimeout(timeout);
}

/**
 * Scroll to element in scroll view
 * @param {Detox.Element} element - Element to scroll to
 * @param {Detox.Element} scrollView - Scroll view element
 * @param {number} offset - Scroll offset (default: 50)
 */
async function scrollToElement(element, scrollView, offset = 50) {
  await scrollView.scroll(offset, 'down');
  await element.tap();
}

/**
 * Type text with delay between characters
 * @param {Detox.Element} element - Input element
 * @param {string} text - Text to type
 */
async function typeTextSlowly(element, text) {
  await element.clearText();
  await element.typeText(text);
}

/**
 * Take screenshot with custom name
 * @param {string} name - Screenshot name
 */
async function takeNamedScreenshot(name) {
  await device.takeScreenshot(name);
}

/**
 * Relaunch app with specific permissions
 * @param {Object} permissions - Permissions object
 */
async function relaunchAppWithPermissions(permissions) {
  await device.launchApp({
    permissions,
    newInstance: true,
  });
}

/**
 * Open deep link
 * @param {string} url - Deep link URL
 */
async function openDeepLink(url) {
  await device.openURL({ url });
}

module.exports = {
  waitForElementToBeVisible,
  waitForElementToNotBeVisible,
  scrollToElement,
  typeTextSlowly,
  takeNamedScreenshot,
  relaunchAppWithPermissions,
  openDeepLink,
};
