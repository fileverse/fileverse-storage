const { log } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const createValidation = {
  body: Joi.object({
    eventName: Joi.string().required(),
    fileId: Joi.string().required(),
    ipfsHash: Joi.string().optional(),
    tags: Joi.array().optional(),
  }),
};

async function create(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { eventName, fileId, ipfsHash, tags } = req.body;
  const createdData = await log.create(eventName, {
    fileId,
    contractAddress,
    invokerAddress,
    ipfsHash,
    tags,
  });
  res.json(createdData);
}

module.exports = [validate(createValidation), create];
