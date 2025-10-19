/**
 * BrowserStack setup and utility functions
 * Helper script for uploading apps and managing BrowserStack sessions
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME;
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

/**
 * Upload app to BrowserStack
 * @param {string} filePath - Path to the app file (.app or .apk)
 * @param {string} customId - Custom ID for the app
 * @returns {Promise<string>} App URL
 */
async function uploadApp(filePath, customId) {
  if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY) {
    throw new Error('BrowserStack credentials not found in environment variables');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`App file not found: ${filePath}`);
  }

  const FormData = require('form-data');
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  if (customId) {
    form.append('custom_id', customId);
  }

  const auth = Buffer.from(`${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`).toString(
    'base64'
  );

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api-cloud.browserstack.com',
      path: '/app-automate/upload',
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        ...form.getHeaders(),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.app_url) {
            console.log(`App uploaded successfully: ${response.app_url}`);
            resolve(response.app_url);
          } else {
            reject(new Error(`Upload failed: ${data}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

/**
 * Get list of available devices
 * @returns {Promise<Array>} List of devices
 */
async function getDevices() {
  const auth = Buffer.from(`${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`).toString(
    'base64'
  );

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api-cloud.browserstack.com',
      path: '/app-automate/devices.json',
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const devices = JSON.parse(data);
          resolve(devices);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Get test session status
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session status
 */
async function getSessionStatus(sessionId) {
  const auth = Buffer.from(`${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`).toString(
    'base64'
  );

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api-cloud.browserstack.com',
      path: `/app-automate/sessions/${sessionId}.json`,
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const session = JSON.parse(data);
          resolve(session);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

module.exports = {
  uploadApp,
  getDevices,
  getSessionStatus,
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'upload':
      const filePath = args[1];
      const customId = args[2];
      uploadApp(filePath, customId)
        .then(url => console.log('App URL:', url))
        .catch(err => console.error('Error:', err.message));
      break;

    case 'devices':
      getDevices()
        .then(devices => console.log(JSON.stringify(devices, null, 2)))
        .catch(err => console.error('Error:', err.message));
      break;

    case 'session':
      const sessionId = args[1];
      getSessionStatus(sessionId)
        .then(session => console.log(JSON.stringify(session, null, 2)))
        .catch(err => console.error('Error:', err.message));
      break;

    default:
      console.log(`
Usage:
  node browserstack-setup.js upload <file-path> [custom-id]
  node browserstack-setup.js devices
  node browserstack-setup.js session <session-id>
      `);
  }
}
