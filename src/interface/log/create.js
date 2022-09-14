const { log } = require('../../domain');
const { validator } = require('../middlewares');
const { Joi, validate } = validator;

const createValidation = {
  body: Joi.object({
    eventName: Joi.string().required(),
    fileId: Joi.string().required(),
    ipfsHash: Joi.string().optional(),
  }),
};

async function create(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { eventName, fileId, ipfsHash } = req.body;
  const createdData = await log.create(eventName, { fileId, contractAddress, invokerAddress, ipfsHash });
  res.json(createdData);
}

module.exports = [validate(createValidation), create];
