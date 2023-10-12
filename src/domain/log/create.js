const { Log } = require('../../infra/database/models');

async function create(eventName, { fileId, contractAddress, ipfsHash, tags }) {
  const logObject = await new Log({ eventName, fileId, contractAddress, ipfsHash, tags }).save();
  // process logs
  return logObject.safeObject();
}

module.exports = create;
