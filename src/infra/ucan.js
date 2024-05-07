const config = require('../../config');
const collaboratorKey = require('./collaboratorKey');
const { v4: uuidv4 } = require('uuid');
const ucans = require('ucans');

const serviceDID = config.SERVICE_DID;


async function namespaceValidation(namespace, invokerAddress, token) {
  try {
    const result = await ucans.verify(token, {
      audience: serviceDID,
      requiredCapabilities: [
        {
          capability: {
            with: { scheme: "storage", hierPart: invokerAddress },
            can: { namespace: namespace, segments: ["CREATE", "GET"] }
          },
          rootIssuer: invokerAddress,
        }
      ],
    });
    return result.ok;
  } catch (error) {
    console.error('Error verifying UCAN with namespace:', error);
    return false;
  }
}

async function contractAddressValidation(contractAddress, invokerAddress, token, chainId) {
  let invokerDid = null;

  try {
    invokerDid = await collaboratorKey({ contractAddress, invokerAddress, chainId });
  } catch (error) {
    console.error('Error retrieving invoker DID:', error);
    return false;
  }

  if (!invokerDid) {
    return false;
  }

  try {
    const result = await ucans.verify(token, {
      audience: serviceDID,
      requiredCapabilities: [
        {
          capability: {
            with: { scheme: "storage", hierPart: contractAddress.toLowerCase() },
            can: { namespace: "file", segments: ["CREATE", "GET"] }
          },
          rootIssuer: invokerDid,
        }
      ],
    });
    return result.ok;
  } catch (error) {
    console.error('Error verifying UCAN with contract address:', error);
    return false;
  }
}

async function invokerAddressValidation(invokerAddress, token) {
  try {
    const result = await ucans.verify(token, {
      audience: serviceDID,
      requiredCapabilities: [
        {
          capability: {
            with: { scheme: "storage", hierPart: invokerAddress },
            can: { namespace: "file", segments: ["CREATE", "GET"] }
          },
          rootIssuer: invokerAddress,
        }
      ],
    });
    return result.ok;
  } catch (error) {
    console.error('Error verifying UCAN with invoker address:', error);
    return false;
  }
}

let verify = async (req, res, next) => {
  const contractAddress = req.headers?.contract;
  const invokerAddress = req.headers?.invoker;
  const chainId = req.headers?.chain;
  const namespace = req.headers?.namespace;

  req.requestId = uuidv4();
  req.isAuthenticated = false;
  req.invokerAddress = invokerAddress;
  req.contractAddress = contractAddress;
  req.chainId = chainId;
  req.namespace = namespace;
  console.log('req.requestId: ', req.requestId);

  // Express headers are auto converted to lowercase
  let token = req.headers['authorization'];
  if (!token || !invokerAddress) {
    next();
  }

  token = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  if (namespace) {
    req.isAuthenticated = await namespaceValidation(namespace, invokerAddress, token);
  } else if (contractAddress) {
    req.isAuthenticated = await contractAddressValidation(contractAddress, invokerAddress, token, chainId);
  } else {
    req.isAuthenticated = await invokerAddressValidation(invokerAddress, token);
  }

  next();
};

module.exports = { verify };