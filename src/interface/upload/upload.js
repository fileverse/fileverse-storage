const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const config = require('../../../config');
const { Joi, validate } = validator;
const ucans = require('ucans');



const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().optional(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
    namepsace: Joi.string().optional(),
  }),
};

function validateNamespace(req, res, next) {
  const { namespace } = req.query;
  const { invokerAddress } = req;
  const serviceDID = config.SERVICE_DID;

  if (!namespace) {
    // no validation required
    next();
  }

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
          can: { namespace: namespace, segments: ["CREATE"] }
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
      error: 'Uploading file on namespace:' + namespace + ' unauthorized'
    });
  }

  next();
}

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  const { tags, namepsace } = req.query;

  if (!validateNamespace(namepsace, req.headers)) {
    return res.status(401).json({
      error: 'Uploading file on namespace:' + namepsace + ' unauthorized'
    });
  }

  // TODO: Add namespace to metadata records

  const createdFile = await upload({
    contractAddress,
    invokerAddress,
    chainId,
    file: req.files?.file,
    tags,
  }).catch(console.log);

  await Log.create('upload', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash, tags });
  res.json(createdFile);
}

module.exports = [validateNamespace, validate(uploadValidation), uploadFn];
