const mongoose = require('mongoose');
const { Schema } = mongoose;

const _stat = {};

_stat.schema = new Schema({
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  tagStats: { type: Schema.Types.Mixed },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

_stat.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_stat.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'contractAddress',
    'tagStats',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_stat.model = mongoose.model('stats', _stat.schema);

module.exports = _stat;
