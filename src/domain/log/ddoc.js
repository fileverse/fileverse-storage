const { Log } = require('../../infra/database/models');

async function ddocCreate(invokerAddress) {
    const logObject = await new Log({
        eventName: "DDOC_CREATE",
        invokerAddress,
    }).save();

    const safeLog = logObject.safeObject();
    return safeLog;
}

module.exports = ddocCreate;
