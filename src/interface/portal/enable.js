const PortalContract = require('../../domain/contract');
const Portal = require('../../domain/publicPortal');
const HASH = require('../../domain/hashResolver')


function extractFilesFromPortal(publicLayoutFile) {
    const sections = publicLayoutFile.sections;

    let resp = [];
    sections.forEach(section => {
        const files = section.files;
        resp = resp.concat(files);
    });

    return resp;
}


async function getNormalizedFiles(publicLayoutFile) {
    const files = extractFilesFromPortal(publicLayoutFile);

    let normalisedFiles = []
    for (const file of files) {
        const ipfsHash = file.metadata.ipfsHash;
        const gatewayUrl = await HASH.getGatewayUrl(ipfsHash);

        normalisedFiles.push({
            name: file.metadata.name,
            mimeType: file.metadata.mimeType,
            ipfsHash: ipfsHash,
            gatewayUrl: gatewayUrl,
        });
    }

    return normalisedFiles;
}

async function enablePortalHadler(req, res) {
    // Extract contract address and chain ID from request
    const { contractAddress, chainId } = req;
    // Extract public layout file ID from request body
    const { publicLayoutFileId } = req.body;

    // Create an instance of PortalContract with the contract address and chain ID
    const network = PortalContract.networkFromChainId(chainId);
    const portalContract = new PortalContract(contractAddress, network);
    // Get the content hash and metadata hash from the portal contract
    let { metadataIPFSHash, contentIPFSHash } = await portalContract.getFile(publicLayoutFileId);
    // Resolve the content hash and metadata hash to get the actual content and metadata
    const publicLayoutContent = await HASH.resolveIpfsHash(contentIPFSHash);

    // Get the public layout file from the content
    if (metadataIPFSHash.startsWith("fileverse_public_portal_metadata_file_")) {
        metadataIPFSHash = metadataIPFSHash.replace("fileverse_public_portal_metadata_file_", "");
    }
    const publicLayoutMetadata = await HASH.resolveIpfsHash(metadataIPFSHash);

    // Get the normalized files from the public layout file
    const normalisedFiles = await getNormalizedFiles(publicLayoutContent);

    try {
        // Update or create a new portal with the contract address, normalized files, file ID, resolved content, and resolved metadata
        await Portal.updateOrCreate(
            fileId = publicLayoutFileId,
            contractAddress,
            files = normalisedFiles,
            resolvedContent = publicLayoutContent,
            resolvedMetadata = publicLayoutMetadata
        );
    }
    catch (err) {
        // Log and send an error response if there is an error in updating the portal files
        console.log("Error in updating portal files", err);
        res.status(500).send("Error in updating portal files due to: " + err);
        return
    }

    // Send a success response if the portal is enabled successfully
    res.status(200).send({ message: "Portal enabled successfully" });
}

module.exports = enablePortalHadler;