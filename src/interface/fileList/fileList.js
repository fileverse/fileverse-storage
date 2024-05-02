const { getFileVisibility, getFileEncryptionType } = require('../../domain/file/utils');
const File = require('../../domain/file');

async function fileList(req, resp) {
    const { invokerAddress } = req.query;

    const files = await File.findAll(invokerAddress);

    if (!files) {
        return resp.status(400).json({ error: 'no files found for given invokerAddress' });
    }

    // create list of dictionaries with file metadata containing only the necessary fields
    const fileList = files.map((file) => {
        const { ipfsHash, filename, gatewayUrl } = file;

        visibility = getFileVisibility(file);
        encyption_type = getFileEncryptionType(file);

        return { ipfsHash, filename, gatewayUrl, visibility, encyption_type };
    });

    resp.status(200).json(fileList);
}

module.exports = [fileList];

