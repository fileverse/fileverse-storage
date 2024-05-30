const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const getDefaultStorageLimit = require("../../infra/defaultStorageLimit");
const DEFAULT_STORAGE_LIMIT = 200000000;

async function getStorageUse({ contractAddress, invokerAddress }) {
  const limit = await Limit.findOne({ contractAddress, invokerAddress });
  return {
    contractAddress,
    invokerAddress,
    storageLimit: limit?.storageLimit || getDefaultStorageLimit(contractAddress),
    storageUse: limit?.storageUse || 0,
    unit: limit?.unit || "bytes",
    extraStorage: limit?.extraStorage || 0,
  };
}

module.exports = getStorageUse;
