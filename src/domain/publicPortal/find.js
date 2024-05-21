const { Portal } = require('../../infra/database/models');


async function findOne(fileId, contractAddress) {
    try {
        const portal = await Portal.findOne({ fileId, contractAddress });
        return portal;
    } catch (error) {
        console.error('Error finding portal:', error);
        return null;
    }
}

async function findAll(contractAddress) {
    try {
        const portals = await Portal.find({ contractAddress });
        return portals;
    } catch (error) {
        console.error('Error finding portals:', error);
        return [];
    }
}

module.exports = { findOne, findAll };
