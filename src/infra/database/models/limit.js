const config = require("../../../../config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const _limit = {};

_limit.schema = new Schema({
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },
  storageLimit: {
    type: Number,
    default: config.DEFAULT_STORAGE_LIMIT || 200000000,
  },
  storageUse: {
    type: Number,
    default: 0,
  },
  extraStorage: {
    type: Number,
    default: 0,
  },
  unit: { type: String, default: "bytes" },
  claimsMap: { type: Schema.Types.Mixed },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

_limit.schema.pre("save", function (next) {
  this.timeStamp = Date.now();
  next();
});

_limit.schema.methods.safeObject = function () {
  const safeFields = [
    "_id",
    "contractAddress",
    "storageLimit",
    "timeStamp",
    "extraStorage",
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_limit.model = mongoose.model("limits", _limit.schema);

module.exports = _limit;
