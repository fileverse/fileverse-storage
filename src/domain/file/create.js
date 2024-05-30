const { File, Limit } = require("../../infra/database/models");
const getDefaultStorageLimit = require("../../infra/defaultStorageLimit");

async function create({
  fileId,
  chainId,
  fileSize,
  ipfsHash,
  gatewayUrl,
  contractAddress,
  invokerAddress,
  tags,
  namespace
}) {
  const file = await new File({
    fileId,
    chainId,
    fileSize,
    ipfsHash,
    gatewayUrl,
    contractAddress,
    invokerAddress,
    tags,
    namespace
  }).save();

  const storageLimit = getDefaultStorageLimit(contractAddress);
  await Limit.updateOne(
    { invokerAddress, contractAddress },
    {
      $inc: { storageUse: fileSize },
      $setOnInsert: { invokerAddress, contractAddress, storageLimit },
    },
    { upsert: true }
  );
  return file.safeObject();
}

module.exports = create;
