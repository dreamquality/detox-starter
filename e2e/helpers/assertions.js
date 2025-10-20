/**
 * Custom assertion helpers for Detox tests
 */

/**
 * Assert element is visible
 * @param {string} elementId - Element test ID
 */
async function assertElementVisible(elementId) {
  await expect(element(by.id(elementId))).toBeVisible();
}

/**
 * Assert element is not visible
 * @param {string} elementId - Element test ID
 */
async function assertElementNotVisible(elementId) {
  await expect(element(by.id(elementId))).not.toBeVisible();
}

/**
 * Assert element has text
 * @param {string} elementId - Element test ID
 * @param {string} text - Expected text
 */
async function assertElementHasText(elementId, text) {
  await expect(element(by.id(elementId))).toHaveText(text);
}

/**
 * Assert element exists
 * @param {string} elementId - Element test ID
 */
async function assertElementExists(elementId) {
  await expect(element(by.id(elementId))).toExist();
}

/**
 * Assert element does not exist
 * @param {string} elementId - Element test ID
 */
async function assertElementNotExist(elementId) {
  await expect(element(by.id(elementId))).not.toExist();
}

/**
 * Assert text is visible on screen
 * @param {string} text - Text to find
 */
async function assertTextVisible(text) {
  await expect(element(by.text(text))).toBeVisible();
}

module.exports = {
  assertElementVisible,
  assertElementNotVisible,
  assertElementHasText,
  assertElementExists,
  assertElementNotExist,
  assertTextVisible,
};
