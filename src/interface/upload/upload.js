const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;



const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().optional(),
    invokerAddress: Joi.string().optional(),
    namepsace: Joi.string().optional(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId, namepsace } = req;
  const { tags } = req.query;

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
    namepsace
  }).catch(console.log);

  await Log.create('upload', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash, tags });
  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
