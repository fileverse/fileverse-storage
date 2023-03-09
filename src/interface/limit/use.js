const { limit } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const useValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
    invoker: Joi.string().required(),
    chain: Joi.string().required(),
  }).unknown(true),
};

async function use(req, res) {
  const { contractAddress, invokerAddress, chainId } = req;
  console.log({ contractAddress, invokerAddress, chainId });
  const data = await limit.getStorageUse({ contractAddress, invokerAddress });
  res.json(data);
}

module.exports = [validate(useValidation), use];
