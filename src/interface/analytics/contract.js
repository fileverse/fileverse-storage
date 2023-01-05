const { analytics, file } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const analyticsByContractValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
};

async function analyticsByContract(req, res) {
  const { contractAddress } = req;
  const data = await analytics.getByContract({ contractAddress });
  const fileData = await file.getSizeByContract({ contractAddress });
  data.totalFileSize = fileData.totalFileSize;
  res.json(data);
}

module.exports = [validate(analyticsByContractValidation), analyticsByContract];
