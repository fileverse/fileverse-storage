const { ObjectManager, PinManager } = require('@filebase/sdk');

const config = require('../../../config');
const { Readable, PassThrough } = require('stream');
const IpfsStorageInterface = require('./interface');
const { error } = require('console');

/**
 * Represents a Filebase object.
 * @class
 * @extends IpfsStorageInterface
 */
class FileBase extends IpfsStorageInterface {
    /**
     * Represents a Filebase object.
     * @constructor
     */
    constructor() {
        super();
        const accessKey = config.FILEBASE_ACCESS_KEY
        const secret = config.FILEBASE_SECRET
        const bucketName = config.FILEBASE_BUCKET_NAME

        this.objectManager = new ObjectManager(accessKey, secret, {
            bucket: bucketName
        });

        this.pinManager = new PinManager(accessKey, secret, {
            bucket: bucketName
        });

    }

    /**
     * Uploads a file to IPFS using the Filebase storage.
     *
     * @param {ReadableStream} readableStreamForFile - The readable stream for the file to be uploaded.
     * @param {Object} options - The options for the upload.
     * @param {string} options.name - The name of the file.
     * @param {string} options.attribute - The attribute of the file.
     * @param {number} options.filesize - The size of the file in bytes.
     * @returns {Object} - The upload result containing the IPFS URL, IPFS hash, storage type, pin size, and timestamp.
     */
    async upload(readableStreamForFile, { name, attribute, filesize }) {
        try {
            let response = await this.objectManager.upload(name, readableStreamForFile);
            let cid = response.cid;

            return {
                ipfsUrl: `https://ipfs.filebase.io/ipfs/${cid}`,
                ipfsHash: `${cid}`,
                ipfsStorage: 'filebase',
                pinSize: filesize,
                timestamp: Date.now(),
            };
        } catch (error) {
            console.error("Error while uploading object to filebase:", error);
        }

    }

    /**
     * Retrieves the IPFS content from the specified URL.
     * @param {Object} options - The options for retrieving the IPFS content.
     * @param {string} options.ipfsUrl - The URL of the IPFS content.
     * @returns {ReadableStream} - A readable stream containing the IPFS content.
     */
    async get({ ipfsUrl }) {
        try {
            let resp = await this.pinManager.download(ipfsUrl, {
                endpoint: "https://ipfs.filebase.io/"
            });

            const ipfsStream = Readable.from(resp);
            return ipfsStream;
        } catch (error) {
            console.error("Error while getting object from filebase:", error);
        }
    }

    /**
     * Removes a file from IPFS based on the given IPFS hash.
     * @param {Object} options - The options for removing the file.
     * @param {string} options.ipfsHash - The IPFS hash of the file to be removed.
     * @returns {Promise} A promise that resolves when the file is successfully removed.
     */
    async remove({ ipfsHash }) {
        try {
            let hashes = ipfsHash.split('/');

            const requestid = await this.getRequestId({ hashes });
            if (requestid == "" || requestid == undefined) {
                throw error("No object found for the given IPFS hash");
            }

            return await this.pinManager.delete(requestid);
        } catch (error) {
            console.error("Error while removing object from filebase:", error);
        }
    }

    /**
     * Retrieves the request ID associated with the given IPFS hash.
     *
     * @param {Object} options - The options object.
     * @param {string} options.ipfsHash - The IPFS hash.
     * @returns {string} The request ID.
     */
    async getRequestId({ ipfsHash }) {
        try {
            const resp = await this.pinManager.list({ cid: [ipfsHash] });
            if (resp['count'] == 0) {
                console.log("No pin found with the given cid: ", cid);
                return;
            }
            return resp['results'][0]['requestid']
        } catch (error) {
            console.error("Error while getting request ID from filebase:", error);
        }
    }
}

module.exports = FileBase;