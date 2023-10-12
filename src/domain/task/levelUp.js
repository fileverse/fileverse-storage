const { Task } = require("../../infra/database/models");
const { getRank } = require('./tasks');
const getTaskStatus = require('./getTaskStatus');

async function levelUp({ contractAddress, invokerAddress }) {
  const { collectedPoints, canLevelUp } = await getTaskStatus({ contractAddress, invokerAddress });
  const newRank = getRank({ collectedPoints });
  if (!canLevelUp) {
    return false;
  }
  await Task.findOneAndUpdate(
    { contractAddress },
    { $set: { rank: newRank } },
    { upsert: true }
  );
  return true;
}

module.exports = levelUp;
