const { ethers } = require("ethers");
const provider = require("./provider");

function JsonRpcProvider() {
  const networkProviderUrl = provider.getNetworkUrl('eth_mainnet');
  const networkProvider = new ethers.providers.JsonRpcProvider(
    networkProviderUrl
  );
  return networkProvider;
}

module.exports = JsonRpcProvider();
