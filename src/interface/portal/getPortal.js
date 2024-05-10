const Portal = require('../../domain/publicPortal');


async function getPortalHandler(req, res) {
    const { contractAddress } = req;
    const { fileId } = req.params;

    let resp = {
        error: null,
        message: "",
        data: {},
    }

    const portal = await Portal.findOne(fileId, contractAddress);
    if (!portal) {
        resp.error = "Portal not found for fileId: " + fileId;
    }

    resp.message = "SUCCESS";
    resp.data = {
        portalAddress: portal.contractAddress,
        fileId: portal.fileId,
        normalisedFiles: portal.files,
        resolvedContent: portal.resolvedContent,
        resolvedMetadata: portal.resolvedMetadata,
    }
    resp.data = portal;


    res.status(200).send(resp)
}

module.exports = getPortalHandler;