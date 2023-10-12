const provider = require('../../contract/jsonRpcProvider');

async function ownsENSHandle(invokerAddress) {
  const name = await provider.lookupAddress(invokerAddress);
  return !!(name && name.endsWith(".eth"));
}

module.exports = ownsENSHandle;
