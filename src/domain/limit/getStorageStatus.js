const config = require("../../../config");
const { Limit } = require("../../infra/database/models");
const { claims } = require("./claim");

const NodeCache = require("node-cache");
const storageClaimChache = new NodeCache({ stdTTL: 300 });

async function formatClaims(invokerAddress, contractAddress, claimsMap, removeCache = false) {
  const cacheKey = `${invokerAddress}_${contractAddress}`;
  let claimsData = storageClaimChache.get(cacheKey);
  if (!claimsData || removeCache) {
    const promises = claims.map(async (elem) => {
      const object = {};
      object.id = elem.id;
      object.name = elem.name;
      object.logo = elem.logo;
      object.storage = elem.storage;
      object.unit = elem.unit;
      object.type = elem.type;
      object.enabled = elem.enabled;
      object.claimed = (claimsMap && claimsMap[elem.id]) ? true : false;
      object.canClaim = await elem
        .canClaim({ invokerAddress, contractAddress })
        .catch((error) => {
          console.log(error);
          return false;
        });
      return object;
    });
    claimData = await Promise.all(promises);
    storageClaimChache.set(cacheKey, claimData);
  }
  return claimData;
}

async function getStorageStatus({ contractAddress, invokerAddress, setCache = false }) {
  const limit = await Limit.findOne({ contractAddress });
  return {
    contractAddress,
    storageLimit: (limit && limit.storageLimit) || config.DEFAULT_STORAGE_LIMIT,
    claims: await formatClaims(invokerAddress, contractAddress, limit && limit.claimsMap, setCache),
  };
}

module.exports = getStorageStatus;
