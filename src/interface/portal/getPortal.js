const Portal = require('../../domain/publicPortal');


async function getPortalHandler(req, res) {
    const { contractAddress } = req;

    let resp = {
        error: null,
        message: "",
        data: {},
    }

    const portal = await Portal.find(contractAddress);
    if (!portal) {
        resp.error = "Portal not found";
    } else {
        resp.data = portal;
        resp.message = "Portal found";
    }

    res.status(200).send(resp)
}

module.exports = getPortalHandler;