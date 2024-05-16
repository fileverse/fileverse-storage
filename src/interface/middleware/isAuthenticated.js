const ErrorHandler = require('../../infra/errorHandler');

async function isAuthenticated(req, res, next) {
    const invokerAddress = req.invokerAddress;
    const contractAddress = req.contractAddress;
    if (req.isAuthenticated) {
        next();
    } else {
        let statusCode = 403;
        if (!invokerAddress) {
            statusCode = 401;
        }
        return ErrorHandler.throwError({
            code: statusCode,
            message: `invokerAddress: ${invokerAddress} and contractAddress: ${contractAddress} is not authenticated to make this request.`,
            req,
        });
    }
}

module.exports = isAuthenticated;
