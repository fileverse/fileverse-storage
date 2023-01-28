const config = require('../../../config');
const { Limit } = require('../../infra/database/models');

async function getStorageStatus({ contractAddress, invokerAddress }) {
  const limit = await Limit.findOne({ contractAddress });
  return {
    contractAddress,
    storageLimit: limit.storageLimit || config.DEFAULT_STORAGE_LIMIT,
    claims: [
      {
        id: "ENS",
        name: "ENS",
        storage: 1000,
        claimable: true,
      },
      {
        id: "LENS",
        name: "Lens",
        storage: 1000,
        claimable: false,
      },
    ],
  };
}

module.exports = getStorageStatus;
