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

async function complete(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { taskId } = req.body;
  const data = await task.completeTask({ contractAddress, invokerAddress, taskId });
  res.json({ success: data });
}

module.exports = [validate(completeValidation), complete];
