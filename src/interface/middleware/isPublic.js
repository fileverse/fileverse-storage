const ErrorHandler = require('../../infra/errorHandler');

const X_API_KEY = process.env.X_API_KEY;

async function isPublic(req, res, next) {
    const xApiKey = req.header("x-api-key");
    if (xApiKey === X_API_KEY) {
        return next();
    } else {
        return ErrorHandler.throwError({
            code: 401,
            message: `unauthenticated request, please contact admin for api-key.`,
            req,
        });
    }
}

module.exports = isPublic;
