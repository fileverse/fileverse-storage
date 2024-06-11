const { Limit } = require("../../infra/database/models");

async function updateStorageUse({ contractAddress, invokerAddress, fileSize }) {
    const updateLimitForTempUser = Limit.updateOne(
        { invokerAddress },
        {
            $inc: { storageUse: fileSize },
            $setOnInsert: { invokerAddress },
        },
        { upsert: true }
    );

    const updateLimitForContract = Limit.updateOne(
        { contractAddress },
        {
            $inc: { storageUse: fileSize },
            $setOnInsert: { contractAddress },
        },
        { upsert: true }
    );


    return contractAddress ? await updateLimitForContract : await updateLimitForTempUser;
}

module.exports = updateStorageUse;