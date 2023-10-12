const { tasks } = require("./tasks");
const { Task } = require("../../infra/database/models");

async function verifyTask({ contractAddress, invokerAddress, taskId }) {
  const onchainTaskIds = tasks.filter(
    (elem) => elem.category === "ONCHAIN"
  ).map((elem) => elem.taskId);
  if (!onchainTaskIds.includes(taskId)) return false;
  let status = false;
  if (taskId === 'OWN_ENS_DOMAIN') {
    status = await ownsENSHandle(invokerAddress);
  }
  if (taskId === 'OWN_FARCASTER_HANDLE') {
    status = await ownsFarcasterHandle(invokerAddress);
  }
  if (taskId === 'OWN_LENS_HANDLE') {
    status = await ownsLensHandle(invokerAddress);
  }
  if (taskId === 'OWN_SAFE_MULTISIG') {
    status = await ownsSafeMultiSig(invokerAddress);
  }
  if (taskId === 'OWN_GITCOIN_PASSPORT') {
    status = await ownsGitcoinPassport(invokerAddress);
  }
  if (!status) return false;
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
