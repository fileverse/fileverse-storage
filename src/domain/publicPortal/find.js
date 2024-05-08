const { Portal } = require('../../infra/database/models');


async function find(contractAddress) {
    const portal = await Portal.findOne({ contractAddress });
    return portal;
}

module.exports = find;
