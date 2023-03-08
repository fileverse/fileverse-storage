const config = require('../../../config');
const { Limit } = require('../../infra/database/models');

async function getStorageStatus({ contractAddress, invokerAddress }) {
  const limit = await Limit.findOne({ contractAddress });
  return {
    contractAddress,
    storageLimit: limit && limit.storageLimit || config.DEFAULT_STORAGE_LIMIT,
    claims: [
      {
        id: "ENS",
        name: "ENS",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: true,
        claimed: false,
      },
      {
        id: "LENS",
        name: "Lens",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
      },
      {
        id: "SAFE",
        name: "Safe",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
      },
      {
        id: "IMPACTDAO",
        name: "Impact DAO",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
      },
      {
        id: "POAP",
        name: "Poap",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
      },
    ],
  };
}

module.exports = getStorageStatus;
