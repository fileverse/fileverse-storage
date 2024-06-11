const { File } = require("../../infra/database/models");

async function create({
  fileId,
  chainId,
  fileSize,
  ipfsHash,
  gatewayUrl,
  contractAddress,
  invokerAddress,
  tags,
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
  }).save();

  return file.safeObject();
}

module.exports = create;
