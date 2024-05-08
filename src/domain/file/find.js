const { File } = require("../../infra/database/models");

async function find(ipfsHashs) {
    const files = await File.find({ ipfsHash: { $in: ipfsHashs } });
    return files;
}

module.exports = find;