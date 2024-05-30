const config = require('../../config');

function getDefaultStorageLimit(contractAddress) {
    const regularUserStorageLimit = Number(config.DEFAULT_STORAGE_LIMIT) || 200000000;
    const tempUserStorageLimit = Number(config.DEFAULT_TEMP_STORAGE_LIMIT) || Math.floor(regularUserStorageLimit / 4);
    return contractAddress ? regularUserStorageLimit : tempUserStorageLimit;
}

module.exports = getDefaultStorageLimit;