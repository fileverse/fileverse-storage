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

module.exports = findOne;
