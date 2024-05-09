const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;



const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().optional(),
    invokerAddress: Joi.string().optional(),
    namespace: Joi.string().optional(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId, namespace } = req;
  const { tags } = req.query;

  const createdFile = await upload({
    contractAddress,
    invokerAddress,
    chainId,
    file: req.files?.file,
    tags,
    namespace
  }).catch(console.log);

  await Log.create('upload', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash, tags });
  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
