const getStorageUse = require("../../domain/limit/getStorageUse");
// const ErrorHandler = require("../../infra/errorHandler");
const reporter = require("../../infra/reporter");


async function checkStorageLimit(contractAddress, invokerAddress) {
  if (!contractAddress && !invokerAddress) {
    return false;
  }

  const limit = await getStorageUse({ contractAddress, invokerAddress });
  const totalAllowedStorage = limit.storageLimit + limit.extraStorage;

  return limit.storageUse >= totalAllowedStorage;
}

async function canUpload(req, res, next) {
  const invokerAddress = req.invokerAddress;
  const contractAddress = req.contractAddress;

  if (!req.isAuthenticated) {
    const code = invokerAddress ? 403 : 401;
    const message = `invokerAddress: ${invokerAddress} does not have permission to upload file for subdomain: ${contractAddress}`;
    return ErrorHandler.throwError({ code, message, req });
  }

  const storageLimitBreached = await checkStorageLimit(contractAddress, invokerAddress);
  if (storageLimitBreached) {
    const statusCode = 400;
    const message = `Storage for ${contractAddress} is full, please either claim more storage or contact us on twitter @fileverse`;
    // ErrorHandler.throwError({ code: statusCode, message, req });
    reporter.reportError(message).catch(console.log);
    res.status(statusCode).json({ message })
    res.end();
    req.connection.destroy();
    return;
  }

  next();
}

module.exports = canUpload;
