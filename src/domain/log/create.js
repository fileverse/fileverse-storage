const { Log } = require('../../infra/database/models');

async function create(eventName, { fileId, contractAddress, ipfsHash }) {
  const logs = await new Log({ eventName, fileId, contractAddress, ipfsHash }).save();
  return logs.safeObject();
}

module.exports = create;
