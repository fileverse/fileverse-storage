const config = require("../../../config");
const { Task } = require("../../infra/database/models");
const { tasks, getRank, getStorage } = require("./tasks");

const NodeCache = require("node-cache");
const taskChache = new NodeCache({ stdTTL: 300 });

async function formatTasks({
  invokerAddress,
  contractAddress,
  taskMap,
  removeCache,
}) {
  const cacheKey = `${invokerAddress}_${contractAddress}`;
  let tasksData = taskChache.get(cacheKey);
  if (!tasksData || removeCache) {
    const promises = tasks.map(async (elem) => {
      const object = {};
      object.taskId = elem.taskId;
      object.activityType = elem.taskId;
      object.name = elem.name;
      object.points = elem.points;
      object.type = elem.type;
      object.category = elem.category;
      object.completed = taskMap[elem.taskId] ? true : false;
      return object;
    });
    tasksData = await Promise.all(promises);
    taskChache.set(cacheKey, tasksData);
  }
  return tasksData;
}

async function formatTaskStatus({
  invokerAddress,
  contractAddress,
  taskMap,
  currentRank,
  removeCache,
}) {
  const tasks = await formatTasks({
    invokerAddress,
    contractAddress,
    taskMap,
    removeCache,
  });
  let totalPoints = 0;
  let collectedPoints = 0;
  tasks.map((elem) => {
    totalPoints += elem.points;
    if (elem.completed) {
      collectedPoints += elem.points;
    }
  });
  const newRank = getRank({
    collectedPoints,
  });
  let canLevelUp = false;
  if (currentRank !== newRank) {
    canLevelUp = true;
  }
  const { totalUnlockableStorage, unlockedStorage, storageUnit } = getStorage({
    rank: currentRank,
  });
  return {
    tasks,
    totalPoints,
    collectedPoints,
    rank: currentRank,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
    canLevelUp,
  };
}

async function getTaskStatus({
  contractAddress,
  invokerAddress,
  setCache = true,
}) {
  const taskStatus = await Task.findOne({ contractAddress });
  const currentRank = taskStatus && taskStatus.rank || 'explorer';
  const {
    tasks,
    totalPoints,
    collectedPoints,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
    canLevelUp,
  } = await formatTaskStatus({
    invokerAddress,
    contractAddress,
    taskMap: (taskStatus && taskStatus.taskMap) || {},
    currentRank,
    removeCache: setCache,
  });
  return {
    tasks,
    rank: currentRank,
    canLevelUp,
    totalPoints,
    collectedPoints,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
  };
}

module.exports = getTaskStatus;
