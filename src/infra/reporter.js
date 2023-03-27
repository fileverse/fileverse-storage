const config = require('../../config');
const axios = require('axios');

async function reportError(message) {
  if (config.SLACK_REPORTER) {
    await axios.post(config.SLACK_REPORTER, {
      text: message,
    });
  }
}

module.exports = { reportError };
