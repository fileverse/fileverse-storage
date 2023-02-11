const config = require('../../../config');

function getNetworkUrl(network) {
  return fromNetworks(network);
}

function fromNetworks(network) {
  if (network === 'eth_goerli') {
    return config.ETH_GOERLI_RPC_URL;
  }
  if (network === 'eth_mainnet') {
    return config.ETH_MAINNET_RPC_URL;
  }
  if (network === 'polygon_mainnet') {
    return config.POLYGON_MAINNET_RPC_URL;
  }
  if (network === 'gnosis_mainnet') {
    return config.GNOSIS_MAINNET_RPC_URL;
  }
  return null;
}

module.exports = { getNetworkUrl };
