const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const getDefaultStorageLimit = require("../../infra/defaultStorageLimit");
const getStorageStatus = require("./getStorageStatus");

async function claimStorage({ contractAddress, invokerAddress }) {
  const status = await getStorageStatus({
    contractAddress,
    invokerAddress,
    setCache: true,
  });
  let storageLimit = getDefaultStorageLimit(contractAddress);
  const claimsMap = {};
  status.claims.map((elem) => {
    if (elem.canClaim) {
      claimsMap[elem.id] = elem.storage;
      storageLimit += elem.storage;
    }
  });
  await Limit.findOneAndUpdate(
    { contractAddress, invokerAddress },
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
