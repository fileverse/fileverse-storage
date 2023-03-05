const config = require('../../../config');
const { Limit } = require('../../infra/database/models');

async function getStorageLimit({ contractAddress }) {
  const limit = await Limit.findOne({ contractAddress });
  return {
    contractAddress,
    storageLimit: limit.storageLimit || config.DEFAULT_STORAGE_LIMIT
  };
}

module.exports = getStorageLimit;
