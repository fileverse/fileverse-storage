const { getFileVisibility } = require('../../domain/file/utils');
const File = require('../../domain/file');

function getResponse(files) {
    // create list of dictionaries with file metadata containing only the necessary fields
    const fileList = files.map((file) => {
        const { ipfsHash, gatewayUrl, fileId, chainId, contractAddress } = file;

        const visibility = getFileVisibility(file);

        return { ipfsHash, gatewayUrl, visibility, fileId, chainId, contractAddress };
    });

    return fileList;
}

async function getUniqueFile(req, resp) {
    const { ipfsHash } = req.query;
    if (!ipfsHash) {
        return resp.status(400).json({ error: 'ipfsHash is required' });
    }

    const file = await File.findOne(ipfsHash);
    if (!file) {
        return resp.status(400).json({ error: 'no files found for given ipfsHash' });
    }

    const fileList = getResponse([file])
    resp.status(200).json(fileList);
}

async function fileList(req, resp) {
    if (!req.isAuthenticated) {
        return resp
            .status(401)
            .json({ error: 'UNAUTHORISED REQUEST' })
    }
    const { invokerAddress } = req.query;


    const files = await File.findAll(invokerAddress);
    if (!files) {
        return resp
            .status(400)
            .json({ error: 'no files found for given invokerAddress' });
    }

    const fileList = getResponse(files)
    resp.status(200).json(fileList);
}

module.exports = { fileList, getUniqueFile };

