const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().optional(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  const { tags } = req.query;


  // create a new upload fn to handle upload for when  there is no contract address in request ( temp account)

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

module.exports = [validate(uploadValidation), uploadFn];
