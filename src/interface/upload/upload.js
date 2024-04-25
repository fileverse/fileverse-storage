const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

function validate_tags(tags) {
  if (!tags || !Array.isArray(tags)) {
    throw new Error('expected `tags` as an array');
  }

  if (!tags.includes('private') && !tags.includes('public')) {
    throw new Error('file visibility not defined in tags');
  }
}

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  const { tags } = req.query;

  try {
    validate_tags(tags);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }

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
