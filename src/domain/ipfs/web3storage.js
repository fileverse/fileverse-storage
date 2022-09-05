const PassThrough = require('stream').PassThrough;
const request = require('request');
const { Web3Storage } = require('web3.storage');
const config = require('./../../../config');

class Web3StorageService {
  constructor() {
    this.client = new Web3Storage({ token: config.WEB3STORAGE_TOKEN });
  }

  async upload(readableStreamForFile, { name }) {
    const cid = await this.client.put([
      { name, stream: () => readableStreamForFile },
    ]);
    if (!cid) return null;
    return {
      ipfsUrl: `https://w3s.link/ipfs/${cid}/${name}`,
      ipfsHash: `${cid}/${name}`,
      ipfsStorage: 'web3.storage',
    };
  }

  async get({ ipfsHash }) {
    if (!ipfsHash) {
      return null;
    }
    const ipfsUrl = `https://w3s.link/ipfs/${ipfsHash}`;
    console.log(ipfsUrl);
    const ipfsStream = new PassThrough();
    request(ipfsUrl).pipe(ipfsStream);
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
