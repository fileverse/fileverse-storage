require('../');

const _models = {
  Log: require('./log').model,
  File: require('./file').model,
  Limit: require('./limit').model,
  Task: require('./task').model,
  Stat: require('./stat').model,
};

module.exports = _models;
