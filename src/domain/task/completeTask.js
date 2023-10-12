const { Task } = require("../../infra/database/models");

async function completeTask({ contractAddress, invokerAddress, taskId }) {
  const taskStatus = await Task.findOne({ contractAddress }).lean();
  const taskMap = taskStatus && taskStatus.taskMap || {};
  taskMap[taskId] = invokerAddress;
  await Task.findOneAndUpdate(
    { contractAddress },
    { $set: { taskMap } },
    { upsert: true }
  );
  return true;
}

module.exports = completeTask;
