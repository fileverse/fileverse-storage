const { ValidationError } = require('./validator');

// eslint-disable-next-line no-unused-vars
function expressErrorHandler(err, req, res, next) {
    console.log(req.params);
    console.log(err.details);
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
