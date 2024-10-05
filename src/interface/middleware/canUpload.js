const getStorageUse = require("../../domain/limit/getStorageUse");
const reporter = require("../../infra/reporter");

async function checkStorageLimit(contractAddress, invokerAddress) {
  if (!contractAddress && !invokerAddress) {
    return false;
  }

  const limit = await getStorageUse({ contractAddress, invokerAddress });
  const totalAllowedStorage = limit.storageLimit + limit.extraStorage;

  return limit.storageUse >= totalAllowedStorage;
}

function drainReq(req, res, statusCode, message) {
  if (req.readable) {
    req.resume();
    req.on("end", () => {
      res.status(statusCode).json({ error: message });
    });
  } else {
    res.status(statusCode).json({ error: message });
  }
}

async function canUpload(req, res, next) {
  const invokerAddress = req.invokerAddress;
  const contractAddress = req.contractAddress;
  console.log("invokerAddress: ", invokerAddress);
  console.log("contractAddress: ", contractAddress);
  console.log("req.isAuthenticated: ", req.isAuthenticated);
  if (!req.isAuthenticated) {
    const statusCode = invokerAddress ? 403 : 401;
    const message = `invokerAddress: ${invokerAddress} does not have permission to upload file for subdomain: ${contractAddress}`;
    reporter.reportError(message).catch(console.log);
    drainReq(req, res, statusCode, message);
    return;
  }

  const storageLimitBreached = await checkStorageLimit(
    contractAddress,
    invokerAddress
  );
  if (storageLimitBreached) {
    const statusCode = 400;
    const message = `Storage for ${contractAddress} is full, please either claim more storage or contact us on twitter @fileverse`;
    reporter.reportError(message).catch(console.log);
    drainReq(req, res, statusCode, message);
    return;
  }

  next();
}

module.exports = canUpload;
