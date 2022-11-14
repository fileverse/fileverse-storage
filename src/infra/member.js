const Contract = require('../domain/contract');
const MemberCreds = require('node-cache');
const cache = new MemberCreds();

module.exports = async function member({ contractAddress, invokerAddress, chainId }) {
    const network = Contract.networkFromChainId(chainId);
    const cacheKey = `${contractAddress}_${invokerAddress}`.toLowerCase();
    let editDid = cache.get(cacheKey);
    if (!editDid) {
        const contract = new Contract(contractAddress, network);
        const member = await contract.getMember(invokerAddress);
        editDid = member.editDid;
        cache.set(cacheKey, editDid);
    }
    return editDid;
}
