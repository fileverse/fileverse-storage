const AWS = require('aws-sdk');
const { config } = require('dotenv');
const IpfsStorageInterface = require('./interface');

class FileBase extends IpfsStorageInterface {
    constructor() {
        super();
        this.accessKey = config.FILEBASE_ACCESS_KEY
        this.secret = config.FILEBASE_SECRET
        this.access_token = this.get_access_token()
        this.bucket_config = JSON.parse(config.FILEBASE_BUCKET)
        this.s3 = new AWS.S3({ endpoint: 'https://s3.filebase.com', signatureVersion: 'v4' })
    }

    get_access_token() {
        let passkey = this.accessKey + ":" + this.secret;
        return btoa(passkey);
    }

    async upload(readableStreamForFile, { name, attribute }) {
        let params = {
            Bucket: attribute,
            Key: name,
            ContentType: 'text/plain'
        };

        self.s3.putObject(params, function (error, data) {
            if (error) {
                console.error(error);
            } else {
                console.log('Successfully uploaded file' + name + ":" + bucket);
            }
        });

        // pin after file upload? NO. we don't
        // return struct
    }


    async get({ ipfsUrl }) {
        let params = {
            Key: ipfsUrl,
            Bucket: bucket
        };

        // Do we need to get pinned object from IPFS? NO
        // or the object itself.  We'll get the object itself.
        try {
            self.s3.getObject(params, function (error, data) {
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