const mongoose = require('mongoose');
const { Schema } = mongoose;

const _log = {};

_log.schema = new Schema({
  contractAddress: { type: String, lowercase: true, required: true },
  eventName: { type: String, required: true },
  fileId: { type: String, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
});

_log.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_log.schema.methods.safeObject = function () {
  const safeFields = ['_id', 'eventName', 'contractAddress', 'fileId', 'timeStamp'];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_log.model = mongoose.model('logs', _log.schema);

module.exports = _log;
