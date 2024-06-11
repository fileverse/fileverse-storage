const { Log } = require('../../infra/database/models');
const completeMultipleTask = require('../task/completeMultipleTask')

async function upsertComment({ contractAddress, invokerAddress, file }) {
    let resp = {
        success: false,
        task_completed: false
    }
    const portalLogs = await Log.findOneAndUpdate({
        eventName: "comment",
        contractAddress,
        invokerAddress,
    }, {
        "$addToSet": { "tags": file }
    }, {
        "new": true, "upsert": true
    });


    resp.success = true;


    if (portalLogs.tags.length >= 10) {
        await completeMultipleTask({ contractAddress, invokerAddress, taskIds: ["COMMENT_ON_10_FILES"] });
        resp.task_completed = true;
    }

    return resp;
}

module.exports = upsertComment;