const { Log } = require('../../infra/database/models');
const process = require('./process');

async function create(eventName, { fileId, contractAddress, invokerAddress, ipfsHash, tags }) {
  const logObject = await new Log({ eventName, fileId, contractAddress, invokerAddress, ipfsHash, tags }).save();
  const safeLog = logObject.safeObject();
  // process logs
  await process(contractAddress, invokerAddress, safeLog)
  return safeLog;
}

module.exports = create;
