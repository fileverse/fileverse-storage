const { File } = require("../../infra/database/models");

async function findAll(invokerAddress) {
    return await File.find({ invokerAddress });
}


async function findOne(ipfsHash) {
    return await File.findOne({ ipfsHash });
}

module.exports = { findAll, findOne };