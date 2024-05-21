const axios = require('axios');
const IPFS_BASE_URLS = require('./constants');

/**
 * Fetches metadata from IPFS for a given hash.
 * @param {string} hash - The IPFS hash to fetch metadata for.
 */
async function resolveIpfsHash(hash) {
    const fetchPromises = IPFS_BASE_URLS.map(url => axios.get(url + hash));
    const result = await Promise.any(fetchPromises);
    return result?.data;
}

module.exports = resolveIpfsHash;