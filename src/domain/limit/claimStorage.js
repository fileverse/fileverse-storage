const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const getStorageStatus = require("./getStorageStatus");

async function claimStorage({ contractAddress, invokerAddress }) {
  const status = await getStorageStatus({
    contractAddress,
    invokerAddress,
    setCache: true,
  });
  let storageLimit = Number(config.DEFAULT_STORAGE_LIMIT);
  const claimsMap = {};
  status.claims.map((elem) => {
    if (elem.canClaim) {
      claimsMap[elem.id] = elem.storage;
      storageLimit += elem.storage;
    }
  });
  await Limit.findOneAndUpdate(
    { contractAddress },
    { $set: { storageLimit, claimsMap } },
    { upsert: true }
  );
  const newStatus = await getStorageStatus({
    contractAddress,
    invokerAddress,
    setCache: true,
  });
  return newStatus;
}

module.exports = claimStorage;
