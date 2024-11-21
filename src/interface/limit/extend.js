const { limit } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const extendValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
    invoker: Joi.string().required(),
    chain: Joi.string().required(),
  }).unknown(true),
};

async function extendHandler(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  console.log({ contractAddress, invokerAddress, chainId });
  try {
    const data = await limit.extendStorage({ contractAddress, invokerAddress });
    return res.json({ success: data, message: 'Storage extended' });
  }
  catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = [validate(extendValidation), extendHandler];
