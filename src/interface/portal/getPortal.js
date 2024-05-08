const Portal = require('../../domain/publicPortal');


async function getPortalHandler(req, res) {
    const { contractAddress } = req;

    const portal = await Portal.find(contractAddress);
    if (!portal) {
        res.status(404).send("Portal not found");
    } else {
        res.status(200).send(portal);
    }

}

module.exports = getPortalHandler;