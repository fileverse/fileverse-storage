const constants = require('../../domain/contants');
const { Job } = require('../../infra/database/models');
const createJob = require('./create');

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

async function updateJobStatus(job, status) {
    // update job status
    const allowedStatus = [
        constants.JobConst.Pending,
        constants.JobConst.Processing,
        constants.JobConst.Completed,
        constants.JobConst.Failed
    ];

    if (!allowedStatus.includes(status)) {
        throw new Error('Invalid job status');
    }

    job.status = status;
    job.updatedAt = new Date();
    await job.save();
}

async function updateJobRetries(job) {
    job.retries += 1;
    if (job.retries >= constants.JobConst.RetryLimit) {
        job.status = constants.JobConst.Failed;
    }
    job.updatedAt = new Date();
    await job.save();
}

module.exports = { getJobByUuid, createJob, getAvailableJobs, updateJobStatus, updateJobRetries };
