const PortalContract = require('../domain/contract');
const MemberCreds = require('node-cache');
const cache = new MemberCreds({ stdTTL: 60 });

module.exports = async function collaboratorKey({ contractAddress, invokerAddress, chainId }) {
    const network = PortalContract.networkFromChainId(chainId);
    const cacheKey = `${contractAddress}_${invokerAddress}`.toLowerCase();
    let editDid = cache.get(cacheKey);
    if (!editDid) {
        const portalContract = new PortalContract(contractAddress, network);
        const keys = await portalContract.getCollaboratorKeys(invokerAddress);
        editDid = keys.editDid;
        cache.set(cacheKey, editDid);
    }
    return editDid;
}
