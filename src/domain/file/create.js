const { File } = require('../../infra/database/models');

async function create({
  fileId,
  chainId,
  fileSize,
  ipfsHash,
  contractAddress,
  invokerAddress,
}) {
  const file = await new File({
    fileId,
    chainId,
    fileSize,
    ipfsHash,
    contractAddress,
    invokerAddress,
  }).save();
  return file.safeObject();
}

module.exports = create;
