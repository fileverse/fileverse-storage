const config = require("../../../config");
const { Limit } = require("../../infra/database/models");

async function getStorageUse({ contractAddress }) {
  const limit = (await Limit.findOne({ contractAddress })) || {};

  return {
    contractAddress,
    storageLimit: limit.storageLimit || config.DEFAULT_STORAGE_LIMIT,
    storageUse: (limit && limit.storageUse) || 0,
    unit: (limit && limit.unit) || "bytes",
    extraStorage: limit.extraStorage || 0,
  };
}

module.exports = getStorageUse;
