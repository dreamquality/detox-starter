/**
 * Cloud Detox configuration (BrowserStack)
 * For running tests on BrowserStack cloud devices
 */

const baseConfig = require('./base.config');

module.exports = {
  ...baseConfig,

  // BrowserStack specific configuration
  session: {
    server: process.env.BROWSERSTACK_SERVER || 'ws://localhost:8099',
    sessionId: 'BrowserStack',
  },

  // Artifacts configuration for cloud testing
  artifacts: {
    ...baseConfig.artifacts,
    plugins: {
      ...baseConfig.artifacts.plugins,
      screenshot: {
        ...baseConfig.artifacts.plugins.screenshot,
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true, // Save space on cloud
      },
      video: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: true, // Save space on cloud
      },
      log: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: true,
      },
    },
  },

  // Behavior configuration for cloud testing
  behavior: {
    ...baseConfig.behavior,
    init: {
      ...baseConfig.behavior.init,
      reinstallApp: true,
      exposeGlobals: true,
    },
    launchApp: 'manual', // Manual launch for better control on cloud
    cleanup: {
      shutdownDevice: true, // Clean up cloud resources
    },
  },

  // Logger configuration for cloud testing
  logger: {
    ...baseConfig.logger,
    level: 'info',
  },
};
