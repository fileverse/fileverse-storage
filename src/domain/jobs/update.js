const constants = require('../contants');

async function updateJobStatus(job, status) {
    // update job status
    const allowedStatus = [
        constants.JobConst.Status.Pending,
        constants.JobConst.Status.Processing,
        constants.JobConst.Status.Completed,
        constants.JobConst.Status.Failed
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
    job.status = constants.JobConst.Status.Pending;
    if (job.retries >= constants.JobConst.RetryLimit) {
        job.status = constants.JobConst.Status.Failed;
    }
    job.updatedAt = new Date();
    await job.save();
}

module.exports = { updateJobStatus, updateJobRetries };