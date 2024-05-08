
async function getPortalHandler(req, res) {
    const { contractAddress } = req;
    const { publicLayoutFileId } = req.body;

    // get public layout file from portal contract
    const portalContract = new PortalContract(contractAddress, req.network);
    const publicLayoutFile = await portalContract.getFile(publicLayoutFileId);

    const files = getFilesMetadata(publicLayoutFile);

    /*
    * FILE sturct
   * { name, ipfsHash, type, gatewayUrl}
   */
}

module.exports = getPortalHandler;