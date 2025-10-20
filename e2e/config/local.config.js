/**
 * Local Detox configuration
 * For running tests on local simulators/emulators
 */

const baseConfig = require('./base.config');

module.exports = {
  ...baseConfig,

  // Artifacts configuration for local testing
  artifacts: {
    ...baseConfig.artifacts,
    plugins: {
      ...baseConfig.artifacts.plugins,
      screenshot: {
        ...baseConfig.artifacts.plugins.screenshot,
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: false,
      },
      video: {
        enabled: false, // Disable video for faster local testing
      },
      log: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: false,
      },
    },
  },

  // Behavior configuration for local testing
  behavior: {
    ...baseConfig.behavior,
    init: {
      ...baseConfig.behavior.init,
      reinstallApp: true,
      exposeGlobals: true,
    },
    launchApp: 'auto',
    cleanup: {
      shutdownDevice: false, // Keep device running for faster re-runs
    },
  },

  // Logger configuration for local testing
  logger: {
    ...baseConfig.logger,
    level: 'debug', // More verbose logging for local debugging
  },
};
