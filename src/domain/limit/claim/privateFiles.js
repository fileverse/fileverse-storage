const { File } = require('../../../infra/database/models');

async function canClaim({ contractAddress }) {
  const data = await File.findOne({ contractAddress, tags: 'private' });
  return !!data;
}

module.exports = canClaim;
