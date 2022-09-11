const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
  params: Joi.object({
    fileId: Joi.string().required(),
  }),
};

async function uploadFn(req, res) {
  const { contract } = req.headers;
  const { fileId } = req.params;
  const createdFile = await upload({
    contractAddress: contract,
    file: req.files && req.files.file,
  });
  await Log.create('upload', { contractAddress: contract, fileId, ipfsHash: createdFile.ipfsHash });
  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
