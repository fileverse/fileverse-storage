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
        type: 'External'
      },
      {
        id: "LENS",
        name: "Lens",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'External'
      },
      {
        id: "SAFE",
        name: "Safe",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'External'
      },
      {
        id: "IMPACTDAO",
        name: "Impact DAO",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'External'
      },
      {
        id: "PUBLIC_FILES",
        name: "Create three public files",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: true,
        claimed: false,
        type: 'Internal'
      },
      {
        id: "WHITEBOARD",
        name: "Create one whiteboard",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'Internal'
      },
      {
        id: "FILEVERSE_DOC",
        name: "Create one fileverse doc",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'Internal'
      },
      {
        id: "MEMBERS",
        name: "Invite atleast one member",
        logo: "",
        storage: 1000,
        unit: 'bytes',
        canClaim: false,
        claimed: false,
        type: 'Internal'
      },
    ],
  };
}

module.exports = getStorageStatus;
