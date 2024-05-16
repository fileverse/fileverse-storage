const constants = require('../../domain/contants');

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
    job.status = constants.JobConst.Pending;
    if (job.retries >= constants.JobConst.RetryLimit) {
        job.status = constants.JobConst.Failed;
    }
    job.updatedAt = new Date();
    await job.save();
}

module.exports = { updateJobStatus, updateJobRetries };