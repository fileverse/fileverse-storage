const mongoose = require('mongoose');
const { Schema } = mongoose;

const _portal = {};

_portal.schema = new Schema({
    contractAddress: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
    },
    fileId: {
        type: String,
        required: true,
        index: true,
    },
    files: {
        type: Array,
        default: [],
        required: true,
    },
    resolvedContent: {
        type: JSON,
        required: true,
    },
    resolvedMetadata: {
        type: JSON,
        required: true,
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

_portal.schema.methods.safeObject = function () {
    const safeFields = [
        '_id',
        'contractAddress',
        'fileId',
        'files',
        'resolvedContent',
        'resolvedMetadata',
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

_portal.model = mongoose.model('portal', _portal.schema);

module.exports = _portal;
