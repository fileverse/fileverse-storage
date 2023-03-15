const { File, Limit } = require("../../infra/database/models");

async function create({
  fileId,
  chainId,
  fileSize,
  ipfsHash,
  contractAddress,
  invokerAddress,
  tags,
}) {
  const file = await new File({
    fileId,
    chainId,
    fileSize,
    ipfsHash,
    contractAddress,
    invokerAddress,
    tags,
  }).save();
  await Limit.updateOne(
    { contractAddress },
    {
      $inc: { storageUse: fileSize },
      $setOnInsert: { contractAddress },
    },
    { upsert: true }
  );
  return file.safeObject();
}

module.exports = create;
