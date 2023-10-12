const { Task } = require("../../infra/database/models");

async function completeMultipleTask({ contractAddress, invokerAddress, taskIds }) {
  const taskStatus = await Task.findOne({ contractAddress }).lean();
  const taskMap = taskStatus && taskStatus.taskMap || {};
  taskIds.map(elem => {
    if (!taskMap[taskId]) {
      taskMap[taskId] = invokerAddress;
    }
  })
  console.log(taskMap);
  await Task.findOneAndUpdate(
    { contractAddress },
    { $set: { taskMap } },
    { upsert: true }
  );
  return true;
}

module.exports = completeMultipleTask;
