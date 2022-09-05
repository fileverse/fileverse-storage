const { Readable } = require('stream');
const Cache = require('./cache');
const IPFS = require('./ipfs');
const cache = new Cache();
const ipfs = new IPFS();

async function upload({ fileId, contractAddress, file }) {
  const { name, mimetype, data } = file;
  const stream = Readable.from(data);
  stream.path = name;
  const ipfsFile = await ipfs.upload(stream, { name });
  const cachedFile = await cache.queue(ipfsFile);
  // full file
  return {
    ipfsUrl: ipfsFile && ipfsFile.ipfsUrl,
    ipfsHash: ipfsFile && ipfsFile.ipfsHash,
    ipfsStorage: ipfsFile && ipfsFile.ipfsStorage,
    cachedUrl: cachedFile && cachedFile.cachedUrl,
    mimetype,
    fileId,
    contractAddress,
  };
}

module.exports = upload;
