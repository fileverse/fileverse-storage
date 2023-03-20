const mongoose = require("mongoose");
const { Schema } = mongoose;

const _log = {};

_log.schema = new Schema({
  invokerAddress: { type: String },
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  eventName: { type: String, required: true },
  fileId: { type: String },
  timeStamp: { type: Date, required: true, default: Date.now },
});

_log.schema.index({ eventName: 1, contractAddress: 1 });

_log.schema.pre("save", function (next) {
  this.timeStamp = Date.now();
  next();
});

_log.schema.methods.safeObject = function () {
  const safeFields = [
    "_id",
    "eventName",
    "invokerAddress",
    "contractAddress",
    "fileId",
    "timeStamp",
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_log.model = mongoose.model("logs", _log.schema);

module.exports = _log;
