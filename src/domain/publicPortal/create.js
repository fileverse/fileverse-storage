const { Portal } = require('../../infra/database/models');
const { findOne } = require('./find');

async function create(fileId, contractAddress, files, resolvedContent, resolvedMetadata) {
    const portal = await new Portal({ fileId, contractAddress, files, resolvedContent, resolvedMetadata }).save();
    return portal;
}

async function update(fileId, contractAddress, files) {
    const portal = await Portal.findOneAndUpdate({ fileId, contractAddress }, { files });
    return portal;
}

async function getPortalOps(fileId, contractAddress) {
    const portal = await findOne(fileId, contractAddress);
    return portal ? update : create;
}


async function updateOrCreate(fileId, contractAddress, files, resolvedContent, resolvedMetadata) {
    const _method = await getPortalOps(fileId, contractAddress);
    return _method(fileId, contractAddress, files, resolvedContent, resolvedMetadata);
}

module.exports = updateOrCreate;
