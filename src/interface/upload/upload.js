const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const uploadValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
};

async function uploadFn(req, res) {
  const { contractAddress, invokerAddress } = req;
  const createdFile = await upload({
    contractAddress,
    file: req.files && req.files.file,
  });
  await Log.create('upload', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash });
  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
