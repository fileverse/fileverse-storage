const { Task, Limit } = require("../../infra/database/models");
const { getRank, getStorage } = require('./tasks');
const getTaskStatus = require('./getTaskStatus');

async function updateStorageLimit({ contractAddress, addedStorage }) {
  await Limit.findOneAndUpdate(
    { contractAddress },
    { $inc: { storageLimit } },
  );
}

async function levelUp({ contractAddress, invokerAddress }) {
  const { collectedPoints, canLevelUp, rank: currentRank } = await getTaskStatus({ contractAddress, invokerAddress });
  if (!canLevelUp) {
    return false;
  }
  const currentStorage = getStorage({ rank: currentRank });
  const newRank = getRank({ collectedPoints });
  const newStorage = getStorage({ rank: newRank });
  const addedStorage = newStorage - currentStorage;
  // add to the limit
  await updateStorageLimit({ contractAddress, addedStorage });
  await Task.findOneAndUpdate(
    { contractAddress },
    { $set: { rank: newRank } },
    { upsert: true }
  );
  return true;
}

module.exports = levelUp;
