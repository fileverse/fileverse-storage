const TaskList = require("./tasks");
const { Task } = require("../../infra/database/models");

async function verifyTask({ contractAddress, invokerAddress, taskId }) {
  const onchainTaskIds = TaskList.filter(
    (elem) => elem.category === "ONCHAIN"
  ).map((elem) => elem.taskId);
  if (!onchainTaskIds.includes(taskId)) return false;
  const taskStatus = await Task.findOne({ contractAddress }).lean();
  const taskMap = (taskStatus && taskStatus.taskMap) || {};
  taskMap[taskId] = invokerAddress;
  await Task.findOneAndUpdate(
    { contractAddress },
    { $set: { taskMap } },
    { upsert: true }
  );
  return true;
}

module.exports = verifyTask;
