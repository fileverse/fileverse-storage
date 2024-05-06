const config = require('../../config');
const axios = require('axios');

async function reportError(message) {
  env = config.HOST ? config.HOST : 'local';
  slackHook = config.SLACK_REPORTER;
  if (env !== 'local') {
    await axios.post(slackHook, {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Error* ```" + message + "```\n*Environment:* " + env.toUpperCase()
          }
        }
      ]
    });
  }
}

module.exports = { reportError };
