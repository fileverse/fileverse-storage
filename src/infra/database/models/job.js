const mongoose = require('mongoose');
const { Schema } = mongoose;
const constants = require('../../../domain/constants');
const uuidv4 = require('uuid').v4;


const _job = {};

_job.schema = new Schema({
    uuid: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        default: uuidv4(),
    },
    contractAddress: {
        type: String,
        required: true,
        index: true,
    },
    jobType: {
        type: String,
        required: true,
        index: true,
    },
    retries: {
        type: Number,
        default: 0,
        Range: { min: 0, max: constants.JobConst.RetryLimit },
        required: true,
    },
    jobData: {
        type: JSON,
        required: true,
        default: {},
    },
    status: {
        type: String,
        default: constants.JobConst.Status.Pending,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

_job.schema.methods.safeObject = function () {
    const safeFields = [
        '_id',
        'uuid',
        'jobType',
        'retries',
        'jobData',
        'status',
        'createdAt',
        'updatedAt',
    ];
    const newSafeObject = {};
    safeFields.forEach((elem) => {
        // eslint-disable-next-line security/detect-object-injection
        newSafeObject[elem] = this[elem];
    });
    return newSafeObject;
};

_job.model = mongoose.model('job', _job.schema);

module.exports = _job;
