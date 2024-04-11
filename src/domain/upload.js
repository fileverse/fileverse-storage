const { Readable } = require('stream');
const File = require('./file');
const Cache = require('./cache');
const { GetIpfsService } = require('./ipfs');
const cache = new Cache();

async function upload({ fileId, chainId, contractAddress, file, invokerAddress, tags }) {
  const { name, mimetype, data } = file;
  const stream = Readable.from(data);
  stream.path = name;
  const ipfsFile = await GetIpfsService().upload(stream, { name });
  const cachedFile = await cache.queue(ipfsFile);
  // add file to db
  await File.create({
    chainId,
    fileId,
    ipfsHash: ipfsFile && ipfsFile.ipfsHash,
    contractAddress,
    invokerAddress,
    fileSize: ipfsFile && ipfsFile.pinSize,
    tags: tags || [],
  });
  // full file
  return {
    ipfsUrl: ipfsFile && ipfsFile.ipfsUrl,
    ipfsHash: ipfsFile && ipfsFile.ipfsHash,
    ipfsStorage: ipfsFile && ipfsFile.ipfsStorage,
    cachedUrl: cachedFile && cachedFile.cachedUrl,
    fileSize: ipfsFile && ipfsFile.pinSize,
    mimetype,
    fileId,
    contractAddress,
  };
}

module.exports = upload;
