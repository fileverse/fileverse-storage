const config = require('../../../config');
const { Limit } = require('../../infra/database/models');

async function claimStorageStatus({ contractAddress }) {
  const limit = await Limit.findOne({ contractAddress });
  return {
    contractAddress,
    storageLimit: limit.storageLimit || config.DEFAULT_STORAGE_LIMIT
  };
}

module.exports = claimStorageStatus;
