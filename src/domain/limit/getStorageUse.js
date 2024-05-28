const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const DEFAULT_STORAGE_LIMIT = 200000000;

async function getStorageUse({ contractAddress, invokerAddress }) {
  let limit = {};
  if (contractAddress) {
    limit = await Limit.findOne({ contractAddress });
  } else {
    limit = await Limit.findOne({ invokerAddress });
  }

  const defaultStorageLimit = contractAddress ? Number(config.DEFAULT_STORAGE_LIMIT) : Number(config.DEFAULT_TEMP_STORAGE_LIMIT);

  return {
    contractAddress,
    invokerAddress,
    storageLimit: limit.storageLimit || defaultStorageLimit,
    storageUse: limit.storageUse || 0,
    unit: limit.unit || "bytes",
    extraStorage: limit.extraStorage || 0,
  };
}

module.exports = getStorageUse;
