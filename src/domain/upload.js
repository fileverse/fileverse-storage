const { Readable } = require('stream');
const File = require('./file');
const Cache = require('./cache');
const { GetIpfsService } = require('./ipfs');
const cache = new Cache();

/**
 * Uploads a file to IPFS and saves its metadata to the database.
 * @param {Object} options - The upload options.
 * @param {string} options.fileId - The ID of the file.
 * @param {string} options.chainId - The ID of the blockchain.
 * @param {string} options.contractAddress - The address of the smart contract.
 * @param {Object} options.file - The file object containing name, mimetype, and data.
 * @param {string} options.invokerAddress - The address of the invoker.
 * @param {Array} options.tags - The tags associated with the file.
 * @returns {Object} - The uploaded file metadata.
 */
async function upload({ fileId, chainId, contractAddress, file, invokerAddress, tags, namespace }) {
  // Extract file metadata
  const { name, mimetype, data } = file;

  // Create a readable stream from file data
  const stream = Readable.from(data);
  stream.path = name;
  // Calculate file size
  const filesize = data.length;

  // Upload file to IPFS
  const ipfsFile = await GetIpfsService().upload(stream, { name, filesize });

  // Queue file for caching
  const cachedFile = await cache.queue(ipfsFile);

  // Add file metadata to the database
  await File.create({
    chainId,
    fileId,
    ipfsHash: ipfsFile?.ipfsHash,
    gatewayUrl: ipfsFile?.ipfsUrl,
    contractAddress,
    invokerAddress,
    fileSize: ipfsFile?.pinSize,
    tags: tags || [],
    namespace,
  });

  // Return uploaded file metadata
  return {
    ipfsUrl: ipfsFile?.ipfsUrl,
    ipfsHash: ipfsFile?.ipfsHash,
    ipfsStorage: ipfsFile?.ipfsStorage,
    cachedUrl: cachedFile?.cachedUrl,
    fileSize: ipfsFile?.pinSize,
    mimetype,
    fileId,
    contractAddress,
  };
}

module.exports = upload;
