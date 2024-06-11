const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;



const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().optional(),
    invoker: Joi.string().optional(),
  }).unknown(true),
  query: Joi.object({
    tags: Joi.array().items(Joi.string()).optional(),
  }),
};

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  const { tags } = req.query;
  const { file } = req.files;

  if (file === undefined) {
    return res.status(400).json({ error: 'No file found to upload' });
  }

  try {
    const createdFile = await upload({
      contractAddress,
      invokerAddress,
      chainId,
      file: file,
      tags,
    }).catch(console.log);

    await Log.create('upload', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash, tags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
