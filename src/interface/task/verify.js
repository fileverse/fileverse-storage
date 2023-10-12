const { task } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const completeValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
    invoker: Joi.string().required(),
    chain: Joi.string().required(),
  }).unknown(true),
  body: Joi.object({
    taskId: Joi.string().required(),
  }),
};

async function verify(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { taskId } = req.body;
  const data = await task.verifyTask({ contractAddress, invokerAddress, taskId });
  res.json({ success: data });
}

module.exports = [validate(completeValidation), verify];
