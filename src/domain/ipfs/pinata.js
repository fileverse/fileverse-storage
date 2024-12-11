const PassThrough = require('stream').PassThrough;
const request = require('request');
const config = require('../../../config');
const pinataSDK = require('@pinata/sdk');
const IpfsStorageInterface = require('./interface');


class Pinata extends IpfsStorageInterface {
  constructor() {
    super();
    this.apiKey = config.PINATA_API_KEY;
    this.secretApiKey = config.PINATA_SECRET_KEY;
    this.pinataGateway = config.PINATA_GATEWAY || 'https://ipfs.fileverse.io/ipfs';
    this.pinata = pinataSDK(this.apiKey, this.secretApiKey);
  }

  formatFile(file) {
    return {
      ipfsUrl: `${this.pinataGateway}/${file.IpfsHash}`,
      ipfsHash: file.IpfsHash,
      ipfsStorage: 'pinata',
      pinSize: file.PinSize,
      timestamp: file.Timestamp,
    };
  }

  async upload(readableStreamForFile, { name, attributes, filesize }) {
    const keyvalues = {};
    (attributes || []).forEach((attribute) => {
      keyvalues[attribute.trait_type] = attribute.value;
    });
    const options = {
      pinataMetadata: {
        name,
        keyvalues,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    try {
      console.time("Upload to Pinata duration");
      const file = await this.pinata.pinFileToIPFS(
        readableStreamForFile,
        options,
      );
      console.timeEnd("Upload to Pinata duration");
      return this.formatFile(file);
    }
    catch (e) {
      console.log("error while uploading to pinata", e);
      throw e;
    }
  }

  async get({ ipfsUrl }) {
    if (!ipfsUrl) {
      return null;
    }
    const ipfsStream = new PassThrough();
    request(ipfsUrl).pipe(ipfsStream);
    return ipfsStream;
  }

  async unPinFile(ipfsHash) {
    try {
      await this.pinata.unpin(ipfsHash);
    } catch (e) {
      console.log(e.reason);
    }
  }

  async remove({ ipfsHash }) {
    if (!ipfsHash) {
      return null;
    }
    return this.unPinFile(ipfsHash);
  }
}

module.exports = Pinata;
