const constants = require('../../domain/contants');
const { Job } = require('../../infra/database/models');

async function getJobByContractAddress(contractAddress) {
    // get job by contract address
    const jobs = await Job.find({
        contractAddress,
        status: { $in: [constants.JobConst.Pending, constants.JobConst.Processing] },
        retries: { $lt: constants.JobConst.RetryLimit }
    }).exec();

    return jobs
}


async function getJobByUuid(uuid) {
    // get job by uuid
    const job = await Job.findOne({ uuid }).exec();
    return job;
}

async function getAvailableJobs(limit) {
    // filter jobs by status in Pending or Processing
    const jobs = await Job.find({
        status: { $in: [constants.JobConst.Pending, constants.JobConst.Processing] },
        retries: { $lt: constants.JobConst.RetryLimit }
    }).sort({ updatedAt: 1 }).limit(limit).exec();

    return jobs;
}


module.exports = { getJobByUuid, getAvailableJobs, getJobByContractAddress };