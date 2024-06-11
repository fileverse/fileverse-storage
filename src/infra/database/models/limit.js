const config = require("../../../../config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const _limit = {};

const getDefaultStorageLimit = (contractAddress) => {

  const regularUserStorageLimit = Number(config.DEFAULT_STORAGE_LIMIT) || 200000000;
  // temp user storage limit is by default 1/4th of regular user storage limit
  const tempUserStorageLimit = Number(config.DEFAULT_TEMP_STORAGE_LIMIT) || Math.floor(regularUserStorageLimit / 4);
  return contractAddress ? regularUserStorageLimit : tempUserStorageLimit;
};

_limit.schema = new Schema({
  contractAddress: {
    type: String,
    lowercase: true,
    required: false,
    index: true,
  },
  invokerAddress: {
    type: String,
    lowercase: true,
    required: false,
    index: true,
    default: null,
  },
  storageLimit: {
    type: Number,
    default: function () { // Use a function to calculate the default value dynamically
      return getDefaultStorageLimit(this.contractAddress);
    },
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
