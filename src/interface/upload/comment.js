const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;
const ErrorHandler = require('../../infra/errorHandler')


const uploadValidation = {
    headers: Joi.object({
        invoker: Joi.string().optional(),
    }).unknown(true),
    
};

const commentSchema = Joi.object({
  encryptedData: Joi.string().allow('').required(),
  id: Joi.string().required(),
  username: Joi.string().required(),
  timestamp: Joi.date().timestamp("javascript").optional(), // milliseconds (13 digits)
});
  
async function uploadCommentFn(req, res) {

    const file = req.files?.file
    if (file.mimetype !== 'application/json') {
      return ErrorHandler.throwError({
        code: 400,
        message: `File must be a JSON file`,
        req,
      });
  }
  
  const jsonData = JSON.parse(file.data.toString());
  const { error } = commentSchema.validate(jsonData);
  
  if(error) {
    return ErrorHandler.throwError({
      code: 400,
      message: error.details[0].message,
      req,
    });
  }
  
    const createdFile = await upload({
        file: req.files?.file,
    }).catch(console.log);
    res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadCommentFn];