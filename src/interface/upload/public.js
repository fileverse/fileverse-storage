const Log = require('../../domain/log');
const { upload } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;



const uploadValidation = {
    headers: Joi.object({
        invoker: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        tags: Joi.array().items(Joi.string()).optional(),
    }),
};


async function uploadPublicFn(req, res) {
    const { invokerAddress, chainId } = req;
    const { tags } = req.query;

    const createdFile = await upload({
        invokerAddress,
        chainId,
        file: req.files?.file,
        tags,
    }).catch(console.log);

    await Log.create('upload-public', { contractAddress, invokerAddress, ipfsHash: createdFile.ipfsHash, tags });
    res.json(createdFile);
}

module.exports = [validate(uploadValidation), uploadPublicFn];