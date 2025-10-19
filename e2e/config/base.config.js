/**
 * Base Detox configuration
 * Contains common settings shared across all environments
 */

module.exports = {
  // Test runner configuration
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/config.json',
    },
    jest: {
      setupTimeout: 120000,
      teardownTimeout: 120000,
    },
  },

  // Artifact configuration for screenshots and logs
  artifacts: {
    rootDir: './e2e/artifacts',
    plugins: {
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: false,
        takeWhen: {
          testStart: false,
          testDone: true,
          appNotReady: true,
        },
      },
      video: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: false,
      },
      log: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: false,
      },
    },
  },

  // Behavior configuration
  behavior: {
    init: {
      reinstallApp: true,
      exposeGlobals: true,
    },
    launchApp: 'auto',
    cleanup: {
      shutdownDevice: false,
    },
  },

  // Logger configuration
  logger: {
    level: 'info',
    overrideConsole: true,
    options: {
      showLoggerErrors: true,
      showPrefixes: true,
    },
  },
};
