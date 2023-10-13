const axios = require('axios');
const config = require('../../../../config');

const apiKey = config.GITCOIN_API_KEY;

async function ownsGitcoinPassport(invokerAddress) {
  const response = await axios({
    method: 'get',
    url: `https://api.scorer.gitcoin.co/registry/stamps/${invokerAddress}`,
    headers: { 'X-API-KEY': apiKey },
  });
  const { items } = response && response.data || {};
  const exist = items[0] || null;
  return !!exist;
}

module.exports = ownsGitcoinPassport;
