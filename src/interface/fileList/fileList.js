const { getFileVisibility } = require('../../domain/file/utils');
const File = require('../../domain/file');

async function fileList(req, resp) {
    const { invokerAddress, ipfsHash } = req.query;

    if (!invokerAddress && !ipfsHash) {
        return resp.status(400).json({ error: 'invokerAddress or ipfsHash query parameter is required' });
    }

    const files = await invokerAddress ? File.findAll(invokerAddress) : File.findByIpfsHash(ipfsHash);

    if (!files) {
        return resp.status(400).json({ error: 'no files found for given invokerAddress' });
    }

    // create list of dictionaries with file metadata containing only the necessary fields
    const fileList = files.map((file) => {
        const { ipfsHash, gatewayUrl } = file;

        const visibility = getFileVisibility(file);

        return { ipfsHash, gatewayUrl, visibility };
    });

    resp.status(200).json(fileList);
}

module.exports = [fileList];

