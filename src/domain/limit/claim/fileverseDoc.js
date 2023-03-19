const { File } = require("../../../infra/database/models");

async function canClaim({ contractAddress }) {
  const data = await File.findOne({
    contractAddress: contractAddress.toLowerCase(),
    tags: "fileverse_document",
  });
  return !!data;
}

module.exports = canClaim;
