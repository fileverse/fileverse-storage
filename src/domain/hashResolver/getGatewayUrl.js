const axios = require('axios');
const IPFS_BASE_URLS = require('./constants');

/**
 * Fetches metadata from IPFS for a given hash.
 * @param {string} hash - The IPFS hash to fetch metadata for.
 */
async function getGatewayUrl(hash) {
    const fetchPromises = IPFS_BASE_URLS.map(url => axios.get(url + hash));
    const executedPromise = fetchPromises.find(promise => promise === result);
    return executedPromise ? executedPromise.config.url : null;
}

module.exports = getGatewayUrl;