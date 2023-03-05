require('../');

const _models = {
  Log: require('./log').model,
  File: require('./file').model,
  Limit: require('./limit').model,
};

module.exports = _models;
