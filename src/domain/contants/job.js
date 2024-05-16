const Pending = 'pending';
const Processing = 'processing';
const Failed = 'failed';
const Completed = 'completed';

const Type = {
    PublicPortal: 'public-portal',
}

const RetryLimit = 3;
const ProcessLimit = 10;

module.exports = {
    Pending, Processing, Failed, Completed, RetryLimit, Type, ProcessLimit
};

