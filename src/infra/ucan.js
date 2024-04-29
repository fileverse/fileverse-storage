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
  const contractAddress = req.headers?.contract;
  const invokerAddress = req.headers?.invoker;
  const chainId = req.headers?.chain;
  req.isAuthenticated = false;
  req.invokerAddress = invokerAddress;
  req.contractAddress = contractAddress;
  req.chainId = chainId;

  // request remains not authenticated if no token is provided
  if (!token) {
    next()
    return
  }

  if (contractAddress) {
    collaboratorKey({
      contractAddress, invokerAddress, chainId
    }).then((invokerDID) => {
      if (!invokerDID) {
        next();
      }

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
        req.isAuthenticated = result.ok;
      });
    }).catch((error) => {
      console.log(error);
    });
  } else {
    /* handle temp user auth
      * here the invoker address is expected to be public DID of the temp user
      * and the ucan token should be issued by the service DID
    */
    ucans.verify(token, {
      audience: serviceDID,
      requiredCapabilities: [
        {
          capability: {
            with: { scheme: "storage", hierPart: invokerAddress.toLowerCase() },
            can: { namespace: "file", segments: ["CREATE"] }
          },
          rootIssuer: invokerAddress.toLowerCase(),
        }
      ],
    }).then((result) => {
      console.log(result);
      if (result.ok) {
        req.isAuthenticated = true;
      }
    }).catch((error) => {
      console.log(error);
    });
  }


  next();
};



module.exports = { verify };