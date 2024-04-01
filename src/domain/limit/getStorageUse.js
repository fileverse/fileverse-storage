const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const { getTotalAllowedStorage } = require("../../utils");

async function getStorageUse({ contractAddress }) {
  const limit = await Limit.findOne({ contractAddress });

  return {
    contractAddress,
    storageLimit: getTotalAllowedStorage({
      address: contractAddress,
      defaultStorage:
        (limit && limit.storageLimit) || config.DEFAULT_STORAGE_LIMIT,
    }),
    storageUse: (limit && limit.storageUse) || 0,
    unit: (limit && limit.unit) || "bytes",
  };
}

module.exports = getStorageUse;
