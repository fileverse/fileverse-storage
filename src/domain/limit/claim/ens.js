const provider = require('../../contract/jsonRpcProvider');

// check if address has .eth ens name
async function canClaim({ invokerAddress }) {
  const name = await provider.lookupAddress(invokerAddress);
  return !!(name && name.endsWith(".eth"));
}

module.exports = canClaim;
