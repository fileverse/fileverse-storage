const ucans = require('ucans');
const config = require('../../../config');


function validateNamespaceMiddleware(req, res, next) {
    const namespace = req.headers?.namespace;
    const invokerAddress = req.headers?.invoker;
    const serviceDID = config.SERVICE_DID;

    if (!namespace) {
        // no validation required
        next();
    }

    if (!invokerAddress) {
        const err = new Error('Invoker address not found');
        return res.status(401).json({ error: err.message });
    }

    req.invokerAddress = invokerAddress;
    req.namespace = namespace;

    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    let isNamespaceValid = false
    ucans.verify(token, {
        audience: serviceDID,
        requiredCapabilities: [
            {
                capability: {
                    with: { scheme: "storage", hierPart: invokerAddress, },
                    can: { namespace: namespace, segments: ["CREATE", "GET"] }
                },
                rootIssuer: invokerAddress,
            }
        ],
    }).then((result) => {
        isNamespaceValid = result.ok;
    });

    if (!isNamespaceValid) {
        const err = new Error('Uploading file on namespace:' + namespace + ' unauthorized');
        return res.status(401).json({
            error: err.message
        });
    }

    next();
}

module.exports = validateNamespaceMiddleware;