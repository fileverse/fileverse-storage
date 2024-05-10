const { PortalContract } = require('../../domain/contract');
const Portal = require('../../domain/publicPortal');
const HASH = require('../../domain/hashResolver')


function extractFilesFromPortal(publicLayoutFile) {
    const publicLayout = JSON.parse(publicLayoutFile);
    const sections = publicLayout.sections;

    let resp = [];
    sections.forEach(section => {
        const files = section.files;
        resp = resp.concat(files);
    });

    return resp;
}


async function getNormalizedFiles(publicLayoutFile) {
    const files = extractFilesFromPortal(publicLayoutFile);

    const normalisedFiles = files.map(async file => {
        const ipfsHash = file.metadata.ipfsHash;
        const gatewayUrl = await HASH.getGatewayUrl(ipfsHash);

        normalisedFiles.push({
            name: file.name,
            mimeType: file.mimeType,
            ipfsHash: ipfsHash,
            gatewayUrl: gatewayUrl,
        });
    });

    return normalisedFiles;
}

async function enablePortalHadler(req, res) {
    // Extract contract address and chain ID from request
    const { contractAddress, chainId } = req;
    // Extract public layout file ID from request body
    const { publicLayoutFileId } = req.body;

    // Create an instance of PortalContract with the contract address and chain ID
    const portalContract = new PortalContract(contractAddress, chainId);
    // Get the content hash and metadata hash from the portal contract
    const { contentHash, metadataHash } = await portalContract.getFile(publicLayoutFileId);

    // Resolve the content hash and metadata hash to get the actual content and metadata
    const publicLayoutContent = await HASH.resolve(contentHash);
    const publicLayoutMetadata = await HASH.resolve(metadataHash);

    // Get the normalized files from the public layout file
    const normalisedFiles = await getNormalizedFiles(publicLayoutFile);

    try {
        // Update or create a new portal with the contract address, normalized files, file ID, resolved content, and resolved metadata
        await Portal.updateOrCreate({
            contractAddress,
            files: normalisedFiles,
            fileId: chainId,
            resolvedContent: publicLayoutContent,
            resolvedMetadata: publicLayoutMetadata
        });
    }
    catch (err) {
        // Log and send an error response if there is an error in updating the portal files
        console.log("Error in updating portal files", err);
        res.status(500).send("Error in updating portal files due to: " + err);
    }

    // Send a success response if the portal is enabled successfully
    res.status(200).send("Portal enabled successfully");
}

module.exports = enablePortalHadler;