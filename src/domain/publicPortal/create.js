const { Portal } = require('../../infra/database/models');

async function updateOrCreate(fileId, contractAddress, files, resolvedContent, resolvedMetadata) {
    try {
        const portal = await Portal.findOneAndUpdate({ fileId, contractAddress }, { files, resolvedContent, resolvedMetadata }, { new: true, upsert: true });
        return portal;
    } catch (error) {
        console.error('Error updating portal:', error);
        return null;
    }
}

module.exports = updateOrCreate;
