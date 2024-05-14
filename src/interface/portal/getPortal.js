const Portal = require('../../domain/publicPortal');

let resp = {
    error: null,
    message: "",
    data: {},
}

async function getAllPortalHandler(req, res) {
    const { contractAddress } = req;

    const portals = await Portal.findAll(contractAddress);
    if (portals.length === 0) {
        resp.error = "Portal not found for contractAddress: " + contractAddress;

    } else {
        resp.message = "SUCCESS";
        resp.data = portals.map(portal => ({
            portalAddress: portal.contractAddress,
            fileId: portal.fileId,
            normalisedFiles: portal.files,
            resolvedContent: portal.resolvedContent,
            resolvedMetadata: portal.resolvedMetadata,
        }));
    }

    res.status(200).send(resp);

}

async function getPortalHandler(req, res) {
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
        }
    }
    res.status(200).send(resp)
}

module.exports = { getPortalHandler, getAllPortalHandler };