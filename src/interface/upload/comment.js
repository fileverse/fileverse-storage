const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;



const uploadValidation = {
    headers: Joi.object({
        invoker: Joi.string().optional(),
    }).unknown(true),
};


async function uploadCommentFn(req, res) {
    const createdFile = await upload({
        file: req.files?.file,
    }).catch(console.log);
    res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadCommentFn];