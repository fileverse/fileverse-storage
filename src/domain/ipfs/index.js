const config = require('../../../config');
const Web3StorageService = require('./web3storage');
const Pinata = require('./pinata');
const FileBase = require('./filebase');


/**
 * Returns an instance of the IPFS service based on the provided IPFS storage.
 * If no IPFS storage is provided, it defaults to the 'pinata' service.
 *
 * @param {string} ipfsStorage - The IPFS storage to use.
 * @returns {IpfsStorageInterface} - An instance of the IPFS service.
 */
function GetIpfsService(ipfsStorage) {
  let defaultService = config.DEFAULT_IPFS_SERVICE ? config.DEFAULT_IPFS_SERVICE : 'pinata';
  ipfsStorage = ipfsStorage ? ipfsStorage : defaultService;

  switch (ipfsStorage) {
    case 'web3.storage':
      return new Web3StorageService();
    case 'pinata':
      return new Pinata();
    case 'filebase':
      return new FileBase();
    default:
      console.error(`Invalid IPFS storage: ${ipfsStorage}. Using default IPFS storage: ${defaultService}`);
      return GetIpfsService(defaultService)
  }
}

module.exports = { GetIpfsService };
