const { Portal } = require('../../infra/database/models');


async function find(contractAddress) {
    try {
        const portal = await Portal.find({ contractAddress });
        return portal;
    } catch (error) {
        console.error('Error finding portal:', error);
        return null;
    }
}

module.exports = find;
