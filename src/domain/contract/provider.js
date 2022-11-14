const config = require('../../../config');

function getNetworkUrl(network) {
  if ((config && config.DEPLOYMENT) === 'production') {
    return fromProdNetworks(network);
  }
  return fromDevNetworks(network);
}

function fromDevNetworks(network) {
  if (network === 'eth_goerli') {
    return config.ETH_GOERLI_RPC_URL;
  }
  if (network === 'fileverse_testnet') {
    return config.FILEVERSE_TESTNET_RPC_URL;
  }
  return config.ETH_GOERLI_RPC_URL;
}

function fromProdNetworks(network) {
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
