const { Portal } = require('../../infra/database/models');
const { find } = require('./find');

async function create(contractAddress, files) {
    const portal = await new Portal({ contractAddress, files }).save();
    return portal;
}

async function update(contractAddress, files) {
    const portal = await Portal.findOneAndUpdate({ contractAddress }, { files });
    return portal;
}

async function getPortalOps(contractAddress) {
    const portal = await find(contractAddress);
    return portal ? update : create;
}


async function updateOrCreate(contractAddress, files) {
    const _method = await getPortalOps(contractAddress);
    return _method(contractAddress, files);
}

module.exports = updateOrCreate;
