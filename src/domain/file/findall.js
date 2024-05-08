const { File } = require("../../infra/database/models");

async function findAll(invokerAddress) {
    return await File.find({ invokerAddress });
}

async function findAllIpfsHashes(ipfsHashes) {
    return await File.find({ ipfsHash: { $in: ipfsHashes } });
}

async function findOne(ipfsHash) {
    return await File.findOne({ ipfsHash });
}

module.exports = { findAll, findOne, findAllIpfsHashes };