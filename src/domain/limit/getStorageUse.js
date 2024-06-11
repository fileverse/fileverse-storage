const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const DEFAULT_STORAGE_LIMIT = 200000000;
const TEMP_USER_STORAGE_LIMIT = DEFAULT_STORAGE_LIMIT / 4;

async function defaultLimit(contractAddress, invokerAddress) {
  const defaultPermanentStorageLimit = config.DEFAULT_STORAGE_LIMIT
    ? parseInt(config.DEFAULT_STORAGE_LIMIT) // need to typecast to int env vars are string values or undefined
    : DEFAULT_STORAGE_LIMIT;

  const defaultTemporaryStorageLimit = config.TEMP_USER_STORAGE_LIMIT
    ? parseInt(config.TEMP_USER_STORAGE_LIMIT)
    : TEMP_USER_STORAGE_LIMIT;

  const limit = await Limit.create({
    contractAddress,
    invokerAddress,
    storageLimit: contractAddress ? defaultPermanentStorageLimit : defaultTemporaryStorageLimit,
    storageUse: 0,
    unit: "bytes",
    extraStorage: 0,
  });

  return limit;
}

async function getLimit(contractAddress, invokerAddress) {
  let limit = contractAddress ? await Limit.findOne({ contractAddress }) : await Limit.findOne({ invokerAddress });
  if (!limit) {
    limit = await defaultLimit(contractAddress);
  }
  return limit;

}

async function getStorageUse({ contractAddress, invokerAddress }) {
  if (!contractAddress && !invokerAddress) {
    return false;
  }

  let limit = getLimit(contractAddress, invokerAddress);
  return limit;
}


module.exports = getStorageUse;
