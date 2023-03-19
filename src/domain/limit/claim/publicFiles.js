const { File } = require("../../../infra/database/models");

async function canClaim({ contractAddress }) {
  const data = await File.find({
    contractAddress: contractAddress.toLowerCase(),
    tags: "public",
  })
    .limit(4)
    .lean();
  return !!(data.length > 3);
}

module.exports = canClaim;
