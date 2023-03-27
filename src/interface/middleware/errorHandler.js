const reporter = require('../../infra/reporter');
const { ValidationError } = require('./validator');

// eslint-disable-next-line no-unused-vars
function expressErrorHandler(err, req, res, next) {
  // Error Reporting to Slack
  const errorMessage = `Message: ${err.message}\nError Code: ${err.statusCode || err.code}`;
  reporter.reportError(errorMessage).catch(console.log);
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, token: err.token });
  }
  res
    .status(err.code || 500)
    .json({ message: err.message, token: err.token });
  next();
}

module.exports = expressErrorHandler;
