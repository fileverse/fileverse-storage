const { File } = require("../../infra/database/models");

async function findAll({ invokerAddress, ipfsHash }) {
    if (invokerAddress) {
        return await File.find({ invokerAddress });
    } else if (ipfsHash) {
        return await File.find({ ipfsHash });
    }
}

async function findOne(ipfsHash) {
    return await File.findOne({ ipfsHash });
}

module.exports = { findAll, findOne };