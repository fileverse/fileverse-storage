const { Limit } = require("../../infra/database/models");

async function extendStorage({ contractAddress }) {
  const limit = await Limit.findOne({ contractAddress });

  if (limit.extendableStorage && limit.extendableStorage <= 0) {
    throw new Error("No storage available to extend");
  }

  const resp = await Limit.findOneAndUpdate(
    { contractAddress },
    {
      $inc: {
        extendableStorage: -1000000000,
        extraStorage: 1000000000,
      },
    },
    { new: true }
  );

  if (!resp) {
    throw new Error("Contract not found");
  }

  return true;
}

module.exports = extendStorage;
