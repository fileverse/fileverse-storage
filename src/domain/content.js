const { Readable } = require('stream');
const IPFS = require('./ipfs');
const Cache = require('./cache');
const ipfs = new IPFS();
const cache = new Cache();

async function content(ipfsHash) {
  const stream = await ipfs.get(ipfsHash);
  return {
    contentStream: stream,
  };
}

module.exports = content;
