const { limit } = require("../../domain");

async function legacyUse(req, res) {
  const { contractAddress } = req;
  console.log({ contractAddress });
  const data = await limit.getStorageUse({ contractAddress });
  console.log({ data });
  res.json({ ...data, storageLimit: data.storageLimit + data.extraStorage });
}

module.exports = [legacyUse];
