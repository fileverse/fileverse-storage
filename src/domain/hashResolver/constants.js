const config = require('../../../config');

/**
 * Array of IPFS base URLs.
 * If `config.IPFS_BASE_URLS` is defined, it will be split by comma (',') to form the array.
 * Otherwise, a default array of IPFS base URLs will be used.
 */
const IPFS_BASE_URLS = config.IPFS_BASE_URLS ? config.IPFS_BASE_URLS.split(',') : [
    'https://w3s.link/ipfs/',
    'https://ipfs.io/ipfs/',
    'https://dweb.link/ipfs/',
    'https://ipfs.fileverse.io/ipfs/',
];

module.exports = IPFS_BASE_URLS;