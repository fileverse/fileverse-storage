const getStorageUse = require('../../domain/limit/getStorageUse');
const ErrorHandler = require('../../infra/errorHandler');

async function canUpload(req, res, next) {
  const invokerAddress = req.invokerAddress;
  const contractAddress = req.contractAddress;
  if (req.isAuthenticated) {
    const limit = await getStorageUse({ contractAddress });
    if (limit.storageUse < limit.storageLimit) {
      next();
    } else {
      let statusCode = 507;
      return ErrorHandler.throwError({
        code: statusCode,
        message: `Storage for ${contractAddress} is full, please either claim more storage or contact us on twitter @fileverse`,
        req,
      });
    }
  } else {
    let statusCode = 403;
    if (!invokerAddress) {
      statusCode = 401;
    }
    return ErrorHandler.throwError({
      code: statusCode,
      message: `${invokerAddress} does not have permission to upload file for subdomain ${contractAddress}`,
      req,
    });
  }
}

module.exports = canUpload;
