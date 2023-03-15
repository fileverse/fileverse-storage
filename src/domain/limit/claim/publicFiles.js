const { File } = require('../../../infra/database/models');

async function canClaim({ contractAddress }) {
  const data = await File.findOne({ contractAddress, tags: 'public' });
  return !!data;
}

module.exports = canClaim;
