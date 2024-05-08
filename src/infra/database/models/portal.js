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
    files: {
        type: Array,
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
