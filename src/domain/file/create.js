const { File, Limit } = require('../../infra/database/models');

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
  await Limit.updateOne({ contractAddress }, { $inc: { storageUse: fileSize } })
  return file.safeObject();
}

module.exports = create;
