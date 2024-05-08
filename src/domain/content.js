const { Readable } = require('stream');
const GetIpfsService = require('./ipfs');
const Cache = require('./cache');
const cache = new Cache();

async function content(ipfsHash) {
  const stream = await GetIpfsService().get(ipfsHash);
  return {
    contentStream: stream,
  };
}

module.exports = content;
