const getStorageUse = require("../../domain/limit/getStorageUse");
const ErrorHandler = require("../../infra/errorHandler");


async function checkStorageLimit(contractAddress) {
  if (!contractAddress) {
    return false;
  }

  const limit = await getStorageUse({ contractAddress });
  const totalAllowedStorage = limit.storageLimit + limit.extraStorage;

  return limit.storageUse >= totalAllowedStorage;
}

async function canUpload(req, res, next) {
  const invokerAddress = req.invokerAddress;
  const contractAddress = req.contractAddress;

  if (!req.isAuthenticated) {
    const code = invokerAddress ? 403 : 401;
    const message = `${invokerAddress} does not have permission to upload file for subdomain ${contractAddress}`;
    return ErrorHandler.throwError({ code, message, req });
  }

  const storageLimitBreached = await checkStorageLimit(contractAddress);
  if (storageLimitBreached) {
    const statusCode = 507;
    const message = `Storage for ${contractAddress} is full, please either claim more storage or contact us on twitter @fileverse`;
    return ErrorHandler.throwError({ code: statusCode, message, req });
  }

  next();
}

module.exports = canUpload;
