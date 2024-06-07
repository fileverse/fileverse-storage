const Job = require('../../../domain/jobs');
const constants = require('../../../domain/constants');

async function processStatus(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { jobUuid } = req.query;

    try {
        const job = await Job.getJobByUuid(jobUuid);
        if (!job) {
            resp.message = constants.Response.RespMsg.NOT_FOUND;
            res.status(404).send(resp);
            return;
        }

        resp.message = constants.Response.RespMsg.SUCCESS;
        resp.data = {
            uuid: job.uuid,
            status: job.status,
            contractAddress: job.contractAddress,
            jobData: job.jobData,
        };
        res.status(200).send(resp);
    } catch (err) {
        // Log and send an error response if there is an error in getting the job
        const error = "Error in getting job: " + err;
        console.log(error);
        resp.message = constants.Response.RespMsg.ERROR;
        resp.error = error;
        res.status(500).send(resp);
    }
}

module.exports = processStatus;