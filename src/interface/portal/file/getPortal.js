const Portal = require('../../../domain/publicPortal');
const constants = require('../../../domain/contants');

async function getAllPortalHandler(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { contractAddress } = req;

    const portals = await Portal.findAll(contractAddress);
    if (portals.length === 0) {
        resp.message = "NOT_FOUND";
        resp.error = "Portal not found for contractAddress: " + contractAddress;

    } else {
        resp.message = "SUCCESS";
        resp.data = portals.map(portal => ({
            portalAddress: portal.contractAddress,
            fileId: portal.fileId,
            normalisedFiles: portal.files,
            resolvedContent: portal.resolvedContent,
            resolvedMetadata: portal.resolvedMetadata,
            createdAt: portal.createdAt ? portal.createdAt : null,
            updatedAt: portal.updatedAt ? portal.updatedAt : null,
        }));
    }

    res.status(200).send(resp);
}

async function getPortalHandler(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { contractAddress } = req;
    const { fileId } = req.params;

    const portal = await Portal.findOne(fileId, contractAddress);
    if (!portal) {
        resp.error = "Portal not found for fileId: " + fileId;
    } else {
        resp.message = "SUCCESS";
        resp.data = {
            portalAddress: portal.contractAddress,
            fileId: portal.fileId,
            normalisedFiles: portal.files,
            resolvedContent: portal.resolvedContent,
            resolvedMetadata: portal.resolvedMetadata,
            createdAt: portal.createdAt ? portal.createdAt : null,
            updatedAt: portal.updatedAt ? portal.updatedAt : null,
        }
    }
    res.status(200).send(resp)
}

module.exports = { getPortalHandler, getAllPortalHandler };