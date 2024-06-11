const axios = require('axios');
const config = require('../../config');

const slackHook = config.SLACK_REPORTER;
const env = config.HOST ? config.HOST : 'local';

async function reportError(message) {
  if (slackHook === undefined) {
    console.log('Error: Slack hook not found');
    return;
  }

  if (env !== 'local') {
    await axios.post(slackHook, {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Error* " + env.toUpperCase() + "\n```" + message + "```"
          }
        }
      ]
    });
  }
}

module.exports = { reportError };
