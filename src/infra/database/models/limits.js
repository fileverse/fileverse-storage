const mongoose = require('mongoose');
const { Schema } = mongoose;

const _limit = {};

_limit.schema = new Schema({
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  storageLimit: { type: Number },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

_limit.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_limit.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'contractAddress',
    'storageLimit',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_limit.model = mongoose.model('limits', _limit.schema);

module.exports = _limit;
