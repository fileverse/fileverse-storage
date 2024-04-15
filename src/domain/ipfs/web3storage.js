const PassThrough = require('stream').PassThrough;
const request = require('request');
const { Web3Storage } = require('web3.storage');
const IpfsStorageInterface = require('./interface');
const config = require('./../../../config');

class Web3StorageService extends IpfsStorageInterface {
  constructor() {
    super();
    this.client = new Web3Storage({ token: config.WEB3STORAGE_TOKEN });
  }

  async upload(readableStreamForFile, { name, attribute, filesize }) {
    const cid = await this.client.put([
      { name, stream: () => readableStreamForFile },
    ]);
    if (!cid) return null;
    const info = await this.client.status(cid);
    return {
      ipfsUrl: `https://w3s.link/ipfs/${cid}/${name}`,
      ipfsHash: `${cid}/${name}`,
      ipfsStorage: 'web3.storage',
      pinSize: info.dagSize,
      timestamp: (new Date(info.created)).getTime(),
    };
  }

  async get({ ipfsUrl }) {
    if (!ipfsUrl) {
      return null;
    }
    const authenticUrl = `https://w3s.link/ipfs/${ipfsUrl}`;
    const ipfsStream = new PassThrough();
    request(authenticUrl).pipe(ipfsStream);
    return ipfsStream;
  }

  async remove({ ipfsHash }) {
    if (!ipfsHash) {
      return null;
    }
    const hashes = ipfsHash.split('/');
    return await this.client.delete(hashes[0]);
  }
}

module.exports = Web3StorageService;
