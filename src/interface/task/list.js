const { task } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const listValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
    invoker: Joi.string().required(),
    chain: Joi.string().required(),
  }).unknown(true),
};

async function list(req, res) {
  const { contractAddress, invokerAddress } = req;
  const data = await task.getTaskStatus({ contractAddress, invokerAddress });
  res.json(data);
}

module.exports = [validate(listValidation), list];
