const mongoose = require('mongoose');
const { Schema } = mongoose;

const _file = {};

_file.schema = new Schema({
  invokerAddress: { type: String },
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  fileId: { type: String },
  chainId: { type: String },
  ipfsHash: { type: String },
  fileSize: { type: Number },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

_file.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_file.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'invokerAddress',
    'contractAddress',
    'fileId',
    'ipfsHash',
    'fileSize',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_file.model = mongoose.model('files', _file.schema);

module.exports = _file;
