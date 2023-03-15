const { File } = require('../../infra/database/models');

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
  return file.safeObject();
}

module.exports = create;
