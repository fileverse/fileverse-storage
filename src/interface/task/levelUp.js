const { task } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const levelUpValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
    invoker: Joi.string().required(),
    chain: Joi.string().required(),
  }).unknown(true),
};

async function levelUp(req, res) {
  const { contractAddress, invokerAddress } = req;
  const data = await task.levelUp({ contractAddress, invokerAddress });
  res.json({ success: data });
}

module.exports = [validate(levelUpValidation), levelUp];
