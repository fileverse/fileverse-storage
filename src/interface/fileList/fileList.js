const { getFileVisibility } = require('../../domain/file/utils');
const File = require('../../domain/file');

const genericResp = {
    message: "",
    data: [],
    error: null
}

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
    const response = { ...genericResp };
    if (!ipfsHash) {
        response.error = 'ipfsHash is required';
        return resp.status(400).json(response);
    }

    const file = await File.findOne(ipfsHash);
    if (!file) {
        response.message = 'no files found for given ipfsHash';
        return resp.status(200).json(response);
    }

    response.data = getResponse([file]);
    response.message = "SUCCESS";
    resp.status(200).json(response);
}

async function fileList(req, resp) {
    const response = { ...genericResp };

    if (!req.isAuthenticated) {
        response.error = 'UNAUTHORISED REQUEST';
        return resp.status(401).json(response);
    }
    const { invokerAddress } = req.query;


    const files = await File.findAll(invokerAddress);
    if (!files) {
        response.message = 'no files found for given invokerAddress'
        return resp.status(400).json(response);
    }

    response.data = getResponse(files);
    response.message = "SUCCESS";
    resp.status(200).json(response);
}

module.exports = { fileList, getUniqueFile };

