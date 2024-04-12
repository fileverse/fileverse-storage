const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const DEFAULT_STORAGE_LIMIT = 200000000;

async function getStorageUse({ contractAddress }) {
  const limit = (await Limit.findOne({ contractAddress })) || {};
  const defaultStorageLimit = config.DEFAULT_STORAGE_LIMIT
    ? parseInt(config.DEFAULT_STORAGE_LIMIT) // need to typecast to int env vars are string values or undefined
    : DEFAULT_STORAGE_LIMIT;
  return {
    contractAddress,
    storageLimit: limit.storageLimit || defaultStorageLimit,
    storageUse: (limit && limit.storageUse) || 0,
    unit: (limit && limit.unit) || "bytes",
    extraStorage: limit.extraStorage || 0,
  };
}

module.exports = getStorageUse;
