const mongoose = require('mongoose');
const { Schema } = mongoose;

const _portal = {};

const portalFileSchema = new Schema({
    ipfsHash: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    gatewayUrl: {
        type: String,
        required: true
    }
});



_portal.schema = new Schema({
    contractAddress: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
    },
    files: {
        type: [portalFileSchema],
        default: [],
    }
});

_portal.schema.methods.safeObject = function () {
    const safeFields = [
        '_id',
        'contractAddress',
        'files',
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
