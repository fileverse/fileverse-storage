const mongoose = require('mongoose');
const { Schema } = mongoose;

const _task = {};

_task.schema = new Schema({
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  taskMap: { type: Schema.Types.Mixed },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

_task.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_task.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'contractAddress',
    'taskMap',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_task.model = mongoose.model('points', _task.schema);

module.exports = _task;
