const axios = require('axios');

async function canClaim({ invokerAddress }) {
  const response = await axios({
    method: 'get',
    url: `https://safe-transaction-mainnet.safe.global/api/v1/owners/${invokerAddress}/safes/`,
  });
  const { safes } = response && response.data || {};
  const exist = safes && safes.length || null;
  return !!exist;
}

module.exports = canClaim;
