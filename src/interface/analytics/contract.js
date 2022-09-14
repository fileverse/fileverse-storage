const { analytics } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const analyticsByContractValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
};

async function analyticsByContract(req, res) {
  const { contractAddress } = req;
  res.json(await analytics.getByContract({ contractAddress }));
}

module.exports = [validate(analyticsByContractValidation), analyticsByContract];
