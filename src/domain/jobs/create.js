const { Job } = require('../../infra/database/models');

async function createJob(jobType, jobData, contractAddress) {
    // create new job
    const job = await new Job({
        jobType,
        jobData,
        contractAddress,
    });

    await job.save();
    return job;
}

module.exports = { createJob };