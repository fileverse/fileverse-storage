const Job = require('../../../domain/jobs');
const constants = require('../../../domain/contants');

async function enablePortalHadler(req, res) {
    let resp = { ...constants.Response.GenericResp };
    const { contractAddress, chainId } = req;
    const { publicLayoutFileId } = req.body;

    const jobBody = {
        chainId: chainId,
        publicLayoutFileId: publicLayoutFileId,
    }

    try {
        const newJob = await Job.createJob(constants.JobConst.Type.PublicPortal, jobBody, contractAddress);
        resp.message = constants.Response.RespMsg.SUCCESS;
        resp.data = {
            uuid: newJob.uuid,
            status: newJob.status,
            contractAddress: newJob.contractAddress,
            jobData: newJob.jobData,
        };
        res.status(200).send(resp);
    } catch (err) {
        // Log and send an error response if there is an error in creating the job
        const error = "Error in creating job: " + err;
        console.log(error);
        resp.message = constants.Response.RespMsg.ERROR;
        resp.error = error;
        res.status(500).send(resp);
    }

}

module.exports = enablePortalHadler;
