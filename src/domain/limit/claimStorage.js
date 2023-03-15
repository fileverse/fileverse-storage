const { Limit } = require("../../infra/database/models");
const getStorageStatus = require('./getStorageStatus');

async function claimStorage({ contractAddress, invokerAddress }) {
  const status = await getStorageStatus({ contractAddress, invokerAddress });
  const possibleClaims = status.claims.filter(elem => elem.canClaim && !elem.claimed);
  let oldLimit = await Limit.findOne({ contractAddress });
  if (!oldLimit) {
    oldLimit = new Limit({ contractAddress });
  }
  if (!oldLimit.storageLimit) {
    oldLimit.storageLimit = status.storageLimit;
  }
  possibleClaims.map((elem) => {
    if (!oldLimit.claimsMap) {
      oldLimit.claimsMap = {};
    }
    if (!oldLimit.claimsMap[elem.id]) {
      oldLimit.claimsMap[elem.id] = elem.storage;
      oldLimit.storageLimit += elem.storage;
    }
  })
  await oldLimit.save();
  const newStatus = await getStorageStatus({ contractAddress, invokerAddress });
  return newStatus;
}

module.exports = claimStorage;
