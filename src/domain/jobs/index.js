const { getJobByUuid, getAvailableJobs, getJobByContractAddress } = require('./get');
const { createJob } = require('./create');
const { updateJobStatus, updateJobRetries } = require('./update');


module.exports = {
    getJobByUuid,
    createJob,
    getAvailableJobs,
    updateJobStatus,
    updateJobRetries,
    getJobByContractAddress
};
