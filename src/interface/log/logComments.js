const { log } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const logCommentValidation = {
    headers: Joi.object({
        contract: Joi.string().required(),
        invoker: Joi.string().required(),
    }).unknown(true)
};

async function logComments(req, res) {
    const { contractAddress, invokerAddress } = req;
    const { file } = req.query;

    try {
        const data = await log.upsertComment({ contractAddress, invokerAddress, file });
        res.json({
            success: data.success,
            task_completed: data.task_completed
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = [validate(logCommentValidation), logComments];