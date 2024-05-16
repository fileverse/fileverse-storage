const PortalContract = require('../../../domain/contract');
const Portal = require('../../../domain/publicPortal');
const HASH = require('../../../domain/hashResolver');
const Job = require('../../../domain/jobs');
const constants = require('../../../domain/contants');
const config = require('../../../../config');

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
        const ipfsHash = file?.metadata?.ipfsHash;

        const gatewayUrl = ipfsHash ? await HASH.getGatewayUrl(ipfsHash) : null;

        normalisedFiles.push({
            name: file.metadata.name,
            type: file.type,
            mimeType: file.metadata.mimeType,
            ipfsHash: ipfsHash,
            gatewayUrl: gatewayUrl,
            metadata: file.metadata
        });
    }

    return normalisedFiles;
}

async function processJobs(job) {
    const jobData = job.jobData;
    const contractAddress = job.contractAddress;
    const chainId = jobData.chainId;
    const publicLayoutFileId = jobData.publicLayoutFileId;

    try {
        await Job.updateJobStatus(job, constants.JobConst.Status.Processing);

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

        // Update or create a new portal with the contract address, normalized files, file ID, resolved content, and resolved metadata
        await Portal.updateOrCreate(
            fileId = publicLayoutFileId,
            contractAddress,
            files = normalisedFiles,
            resolvedContent = publicLayoutContent,
            resolvedMetadata = publicLayoutMetadata
        );

        await Job.updateJobStatus(job, constants.JobConst.Status.Completed);
    }
    catch (err) {
        await Job.updateJobRetries(job);
        // Log and send an error response if there is an error in updating the portal files
        console.log("Error in indexing portal files for jobUuid:", job.uuid, "with error: ", err);
    }
}

async function getJobsToProcess() {
    const jobsToProcess = await Job.getAvailableJobs(constants.JobConst.ProcessLimit);
    // create a map of jobs with key as contractAddress and fileId from JobBody, and value as job

    const jobMap = {};
    for (const job of jobsToProcess) {
        const jobData = job.jobData;
        const contractAddress = job.contractAddress;
        const publicLayoutFileId = jobData.publicLayoutFileId;

        const jobKey = `${contractAddress}_${publicLayoutFileId}`;

        // check if key already exists in jobMap, 
        // if yes, then update the value with the latest job
        if (jobMap[jobKey]) {
            const existingJob = jobMap[jobKey];
            if (existingJob.createdAt < job.createdAt) {
                jobMap[jobKey] = job;
            }
        } else {
            jobMap[jobKey] = job;
        }
    }

    return Object.values(jobMap);
}

async function triggerJobProcessing(req, res) {
    // Extract contract address and chain ID from request
    const CRON_SECRET_KEY = config.CRON_SECRET_KEY;
    const secretKey = req.headers['x-secret-key'];

    if (secretKey !== CRON_SECRET_KEY) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }

    const jobsToProcess = await getJobsToProcess();
    const jobProcessPromises = jobsToProcess.map((job) => { return processJobs(job); });
    Promise.all(jobProcessPromises);

    // Send a success response if the portal is enabled successfully
    res.status(200).send({});
}

module.exports = triggerJobProcessing;