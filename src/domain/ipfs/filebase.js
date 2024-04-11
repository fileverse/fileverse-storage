const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require('../../../config');
const IpfsStorageInterface = require('./interface');

class FileBase extends IpfsStorageInterface {
    constructor() {
        super();
        this.accessKey = config.FILEBASE_ACCESS_KEY
        this.secret = config.FILEBASE_SECRET

        this.s3 = new S3Client({
            endpoint: 'https://s3.filebase.com',
            region: 'us-east-1',
            signatureVersion: 'v4',
            credentials: {
                accessKeyId: this.accessKey,
                secretAccessKey: this.secret,
            },
        });
    }


    async upload(readableStreamForFile, { name, attribute }) {
        let bucket_name = attribute ? attribute : "test-fileverse"

        let uploadParams = {
            Bucket: bucket_name,
            Key: name,
            Body: readableStreamForFile,
        };

        const command = new PutObjectCommand(uploadParams);
        let cid = null;
        let ts = null;
        command.middlewareStack.add(
            (next) => async (args) => {
                const response = await next(args);
                if (!response.response.statusCode) return response;
                // Get cid from headers
                cid = response.response.headers["x-amz-meta-cid"];
                ts = response.response.headers["date"];

                return response;
            },

        );

        await Promise.resolve(this.s3.send(command));

        return {
            ipfsUrl: `https://w3s.link/ipfs/${cid}/${name}`,
            ipfsHash: `${cid}/${name}`,
            ipfsStorage: 'filebase',
            pinSize: null,
            timestamp: (new Date(ts)).getTime(),
        };
    }


    async get({ ipfsUrl }) {
        let params = {
            Key: ipfsUrl,
            Bucket: "test-fileverse"
        };

        const command = new GetObjectCommand(params);
        command.middlewareStack.add(
            (next) => async (args) => {
                const response = await next(args);
                if (!response.response.statusCode) return response;
                // Get cid from headers
                console.log(response);

                return response;
            },

        );

        await Promise.resolve(this.s3.send(command));

    }

    async remove({ ipfsHash }) {
        let hashes = ipfsHash.split('/');
        let params = {
            Key: hashes[0],
            Bucket: "test-fileverse"
        };

        const command = new DeleteObjectCommand(params);
        await Promise.resolve(this.s3.send(command));
    }
}

module.exports = FileBase;