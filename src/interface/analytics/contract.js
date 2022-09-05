const { analytics } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const analyticsByContractValidation = {
  headers: Joi.object({ contractAddress: Joi.string() }),
};

async function analyticsByContract(req, res) {
  const { contractAddress } = req.headers;
  res.json(await analytics.getByFile({ contractAddress }));
}

module.exports = [validate(analyticsByContractValidation), analyticsByContract];
