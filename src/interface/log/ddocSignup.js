const { log } = require("../../domain");
const constants = require("../../domain/contants")

async function ddocSignUp(req, res) {
    const { invokerAddress } = req;
    const resp = { ...constants.Response.GenericResp }

    try {
        const ddocLog = await log.ddocSignup(invokerAddress);
        resp.status = constants.Response.RespMsg.SUCCESS;
        resp.data = { log: ddocLog };
        res.json(resp);
        return
    }
    catch (error) {
        resp.status = constants.Response.RespMsg.ERROR;
        resp.message = error.message;
        res.status(500).json(resp);
        return
    }

}

module.exports = [ddocSignUp];
