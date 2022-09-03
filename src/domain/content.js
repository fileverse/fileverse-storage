const { Readable } = require('stream');
const IPFS = require('./ipfs');
const Cache = require('./cache');
const ipfs = new IPFS();
const cache = new Cache();

async function content(ipfsHash) {
  let fileContent = await cache.get(ipfsHash);
  let stream = null;
  if (fileContent) {
    stream = Readable.from(fileContent);
  } else {
    stream = await ipfs.get(ipfsHash);
  }
  return {
    contentStream: stream,
    mimetype,
  };
}

module.exports = content;
