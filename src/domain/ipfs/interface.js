class IpfsStorageInterface {
    constructor() {

    }
    async upload(readableStreamForFile, { name, attribute, filesize }) {
        throw new Error('No Ipfs storage service found');
    }

    async get({ ipfsUrl }) {
        throw new Error('No Ipfs storage service found');
    }

    async remove({ ipfsHash }) {
        throw new Error('No Ipfs storage service found');
    }
}

module.exports = IpfsStorageInterface;