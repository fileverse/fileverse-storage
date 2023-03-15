const axios = require('axios');

async function canClaim({ invokerAddress }) {
  const response = await axios({
    method: 'post',
    url: 'https://api-mumbai.lens.dev/',
    data: {
      operationName: "defaultProfile",
      variables: { address: invokerAddress },
      query: "query defaultProfile($address: EthereumAddress!) { defaultProfile(request: {ethereumAddress: $address}) { name } }"
    }
  });
  const { data } = response && response.data || {};
  const exist = data && data.defaultProfile || null;
  return !!exist;
}

module.exports = canClaim;
