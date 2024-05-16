const PortalContract = require('../../../domain/contract');
const Portal = require('../../../domain/publicPortal');
const HASH = require('../../../domain/hashResolver');
const Job = require('../../../domain/jobs');
const constants = require('../../../domain/contants');

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

async function processJobs(chainId, contractAddress, publicLayoutFileId) {
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
        return
    }
}

async function triggerJobProcessing(req, res) {
    // Extract contract address and chain ID from request
    // TODO: Add key validation since this is cron job

    const jobsToProcess = await Job.getAvailableJobs(5);
    for (const job of jobsToProcess) {
        const jobData = job.jobData;
        const contractAddress = job.contractAddress;
        const chainId = jobData.chainId;
        const publicLayoutFileId = jobData.publicLayoutFileId;

        try {
            // Process the job
            await processJobs(chainId, contractAddress, publicLayoutFileId);
            // Update the job status to completed
            await Job.updateJobStatus(job, constants.JobConst.Completed);
        } catch (error) {
            await Job.updateJobRetries(job);
        }
    }

    // Send a success response if the portal is enabled successfully
    res.status(200).send({});
}

module.exports = triggerJobProcessing;