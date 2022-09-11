const config = require('../../config');
const member = require('./member');
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

  req.isAuthenticated = false;
  if (token) {
    const contractAddress = req.headers && req.headers.contract;
    const invokerAddress = req.headers && req.headers.invoker;
    member({ contractAddress, invokerAddress })
      .then((invokerDID) => {
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
            req.invokerAddress = invokerAddress;
            req.contractAddress = contractAddress;
          }
          next();
        });
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
