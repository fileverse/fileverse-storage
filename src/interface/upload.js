const { upload } = require('../domain');
const { validator } = require('./middleware');
const { Joi, validate } = validator;

const uploadValidation = {
    body: Joi.object({ name: Joi.string().required() }),
};

async function uploadFn(req, res) {
  const createdFile = await upload({
    file: req.files && req.files.file,
  });
  res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadFn];
