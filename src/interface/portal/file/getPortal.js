const Portal = require('../../../domain/publicPortal');
const constants = require('../../../domain/constants');
const Job = require('../../../domain/jobs');


async function getAllPortalHandler(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { contractAddress } = req;

    const portals = await Portal.findAll(contractAddress);
    const respPortals = portals.map(portal => ({
        portalAddress: portal.contractAddress,
        fileId: portal.fileId,
        normalisedFiles: portal.files,
        resolvedContent: portal.resolvedContent,
        resolvedMetadata: portal.resolvedMetadata,
        createdAt: portal.createdAt ? portal.createdAt : null,
        updatedAt: portal.updatedAt ? portal.updatedAt : null,
    }));

    const queueJobs = await Job.getJobByContractAddress(contractAddress);
    const respJobs = queueJobs.map(job => ({
        uuid: job.uuid,
        status: job.status,
        jobData: job.jobData,
        createdAt: job.createdAt ? job.createdAt : null,
        updatedAt: job.updatedAt ? job.updatedAt : null,
    }));

    resp.data = {
        portals: respPortals,
        queueJobs: respJobs
    }

    if (resp.data.portals.length > 0 || resp.data.queueJobs.length > 0) {
        resp.message = constants.Response.RespMsg.SUCCESS;
    } else {
        resp.message = constants.Response.RespMsg.NOT_FOUND;
        resp.error = "Portal not found for contractAddress: " + contractAddress;
    }


    res.status(200).send(resp);
}

async function getPortalHandler(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { contractAddress } = req;
    const { fileId } = req.params;

    const portal = await Portal.findOne(fileId, contractAddress);
    if (portal) {
        resp.message = constants.Response.RespMsg.SUCCESS;
        resp.data = {
            portalAddress: portal.contractAddress,
            fileId: portal.fileId,
            normalisedFiles: portal.files,
            resolvedContent: portal.resolvedContent,
            resolvedMetadata: portal.resolvedMetadata,
            createdAt: portal.createdAt ? portal.createdAt : null,
            updatedAt: portal.updatedAt ? portal.updatedAt : null,
        }
        res.status(200).send(resp);
        return;
    }

    const queueJobs = await Job.getJobByContractAddress(contractAddress);
    if (queueJobs.length > 0) {
        resp.message = constants.Response.RespMsg.SUCCESS;
        resp.data = queueJobs.map(job => {
            if (job.jobData.fileId === fileId) {
                return {
                    uuid: job.uuid,
                    status: job.status,
                    jobData: job.jobData,
                    createdAt: job.createdAt ? job.createdAt : null,
                    updatedAt: job.updatedAt ? job.updatedAt : null,
                }
            }
        });
        res.status(200).send(resp);
        return;
    }

    resp.message = constants.Response.RespMsg.NOT_FOUND;
    resp.error = "Portal not found for fileId: " + fileId;
    res.status(200).send(resp)
}

module.exports = { getPortalHandler, getAllPortalHandler };