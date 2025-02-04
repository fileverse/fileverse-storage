const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;
const ErrorHandler = require('../../infra/errorHandler')


const uploadValidation = {
    headers: Joi.object({
        invoker: Joi.string().optional(),
    }).unknown(true),
    
};
const commenSchema = Joi.object({
    selectedText: Joi.string().required(),
    highlightYjsDiff: Joi.string().required(),
    content: Joi.string().required(),
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
  const { error } = commenSchema.validate(jsonData);
  
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