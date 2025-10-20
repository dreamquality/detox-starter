/**
 * Common action helpers for Detox tests
 */

const { waitForElementToBeVisible } = require('./matchers');

/**
 * Login helper function
 * @param {string} username - Username
 * @param {string} password - Password
 */
async function login(username, password) {
  await waitForElementToBeVisible(element(by.id('usernameInput')));
  await element(by.id('usernameInput')).typeText(username);
  await element(by.id('passwordInput')).typeText(password);
  await element(by.id('loginButton')).tap();
}

/**
 * Logout helper function
 */
async function logout() {
  await element(by.id('logoutButton')).tap();
}

/**
 * Navigate back
 */
async function navigateBack() {
  await element(by.id('backButton')).tap();
}

/**
 * Swipe element in a direction
 * @param {Detox.Element} element - Element to swipe
 * @param {string} direction - Direction: 'left', 'right', 'up', 'down'
 * @param {string} speed - Speed: 'fast', 'slow'
 * @param {number} normalizedOffset - Normalized offset (0-1)
 */
async function swipeElement(element, direction = 'left', speed = 'fast', normalizedOffset = 0.75) {
  await element.swipe(direction, speed, normalizedOffset);
}

/**
 * Pull to refresh
 * @param {Detox.Element} scrollView - ScrollView element
 */
async function pullToRefresh(scrollView) {
  await scrollView.swipe('down', 'fast', 0.1, 0.5, 0.5);
}

/**
 * Wait for app to be ready
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
async function waitForAppReady(timeout = 10000) {
  await waitFor(element(by.id('appContainer')))
    .toBeVisible()
    .withTimeout(timeout);
}

module.exports = {
  login,
  logout,
  navigateBack,
  swipeElement,
  pullToRefresh,
  waitForAppReady,
};
