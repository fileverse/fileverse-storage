const { Log } = require('../../infra/database/models');
const process = require('./process');

async function create(eventName, { fileId, contractAddress, ipfsHash, tags }) {
  const logObject = await new Log({ eventName, fileId, contractAddress, ipfsHash, tags }).save();
  const safeLog = logObject.safeObject();
  // process logs
  await process(contractAddress, 'system', safeLog)
  return safeLog;
}

module.exports = create;
