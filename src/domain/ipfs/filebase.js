const AWS = require('aws-sdk');
const config = require('../../../config');
const IpfsStorageInterface = require('./interface');

class FileBase extends IpfsStorageInterface {
    constructor() {
        super();
        this.accessKey = config.FILEBASE_ACCESS_KEY
        this.secret = config.FILEBASE_SECRET
        this.access_token = this.get_access_token()

        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            accessKeyId: this.accessKey,
            secretAccessKey: this.secret,
            endpoint: 'https://s3.filebase.com',
            region: 'us-east-1',
            signatureVersion: 'v4',
        })
    }

    get_access_token() {
        let passkey = this.accessKey + ":" + this.secret;
        return btoa(passkey);
    }

    async upload(readableStreamForFile, { name, attribute }) {
        let bucket_name = attribute ? attribute : "test-fileverse"

        let uploadParams = {
            Bucket: bucket_name,
            Key: name,
            Body: readableStreamForFile,
            Metadata: { import: "car" }
        };

        const request = this.s3.putObject(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err.message);
            }
            else if (data) {
                console.log("Upload Success", data.Location);
            }
            else {
                console.log("Something else")
            }
        });

        request.on('httpHeaders', (statusCode, headers) => {
            console.log(`CID: ${headers['x-amz-meta-cid']}`);
        });
        request.send();

    }


    async get({ ipfsUrl }) {
        let params = {
            Key: ipfsUrl,
            Bucket: "test-fileverse"
        };

        try {
            this.s3.getObject(params, function (error, data) {
                if (error) {
                    console.log("Error while reading file " + key + ":" + bucket);
                    return callback("Error!");
                } else {
                    console.log("Returning contents from " + key + ":" + bucket);
                    return callback(Buffer.from(data.Body, 'utf8').toString());
                }
            });
        } catch (error) {
            console.error(error);
            return callback("Error!");
        }
    }

    async remove({ ipfsHash }) {
        return;
    }
}

module.exports = FileBase;