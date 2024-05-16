const Status = {
    Pending: 'pending',
    Processing: 'processing',
    Failed: 'failed',
    Completed: 'completed'
}

const Type = {
    PublicPortal: 'public-portal',
}

const RetryLimit = 3;
const ProcessLimit = 10;

module.exports = {
    RetryLimit,
    Type,
    ProcessLimit,
    Status
};

