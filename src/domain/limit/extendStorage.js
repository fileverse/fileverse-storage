const { Limit } = require("../../infra/database/models");
const getStorageStatus = require("./getStorageStatus");

async function extendStorage({ contractAddress, invokerAddress }) {
  const status = await getStorageStatus({
    contractAddress,
    invokerAddress,
    setCache: true,
  });

  if (status.extendableStorage <= 0) {
    throw new Error("No storage available to extend");
  }

  const resp = await Limit.findOneAndUpdate(
    { contractAddress },
    {
      $inc: {
        extendableStorage: - 1000000000,
        extraStorage: 1000000000,
      }
    },
    { new: true }
  );

  if (!resp) {
    throw new Error("Contract not found");
  }

  return true;
}

module.exports = extendStorage;
