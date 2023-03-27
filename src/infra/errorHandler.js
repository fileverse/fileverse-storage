const reporter = require('./reporter');
const _errorHandler = {};

_errorHandler.throwError = ({ code = 500, message, token, req = {} }) => {
  const error = new Error(message);
  error.code = code;
  error.token = token;
  error.req = req;
  error.address = req.address;
  // Error Reporting to Slack
  const errorMessage = `Message: ${message}\nError Code: ${code}`;
  reporter.reportError(errorMessage).catch(console.log);
  throw error;
};

module.exports = _errorHandler;
