const Contract = require('../domain/contract');

module.exports = async function member({ contractAddress, invokerAddress }) {
    const contract = new Contract(contractAddress);
    const member = await contract.getMember(invokerAddress);
    return member;
}
