const config = require('../../config');
const collaboratorKey = require('./collaboratorKey');
const { v4: uuidv4 } = require('uuid');
const ucans = require('ucans');

const serviceDID = config.SERVICE_DID;

let verify = (req, res, next) => {
  req.requestId = uuidv4();
  console.log('req.requestId: ', req.requestId);
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  const contractAddress = req.headers && req.headers.contract;
  const invokerAddress = req.headers && req.headers.invoker;
  const chainId = req.headers && req.headers.chain;
  req.isAuthenticated = false;
  req.invokerAddress = invokerAddress;
  req.contractAddress = contractAddress;
  req.chainId = chainId;
  if (token && contractAddress) {
    collaboratorKey({ contractAddress, invokerAddress, chainId })
      .then((invokerDID) => {
        if (invokerDID) {
          ucans.verify(token, {
            // to make sure we're the intended recipient of this UCAN
            audience: serviceDID,
            // capabilities required for this invocation & which owner we expect for each capability
            requiredCapabilities: [
              {
                capability: {
                  with: { scheme: "storage", hierPart: contractAddress.toLowerCase() },
                  can: { namespace: "file", segments: ["CREATE"] }
                },
                rootIssuer: invokerDID,
              }
            ],
          }).then((result) => {
            console.log(result);
            if (result.ok) {
              req.isAuthenticated = true;
            }
            next();
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else {
    next();
  }
};

module.exports = { verify };
