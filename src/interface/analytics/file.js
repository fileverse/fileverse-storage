const { analytics } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const analyticsByFileValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
  params: Joi.object({
    fileId: Joi.string().required(),
  }),
};

async function analyticsByFile(req, res) {
  const { contractAddress } = req;
  const { fileId } = req.params;
  res.json(await analytics.getByFile({ contractAddress, fileId }));
}

module.exports = [validate(analyticsByFileValidation), analyticsByFile];
