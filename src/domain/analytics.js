const getByFile = require('./log/getByFile');
const getByContract = require('./log/getByContract');
const _analytics = {};

_analytics.getByFile = getByFile;
_analytics.getByContract = getByContract;

module.exports = _analytics;
