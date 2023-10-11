const config = require("../../../config");
const { Task } = require("../../infra/database/models");
const { tasks } = require("./tasks");

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

function getRank({ totalPoints, collectedPoints }) {
  const percent = parseInt((collectedPoints / totalPoints) * 100, 10);
  if (percent < 30) {
    return "explorer 1";
  }
  if (percent < 60) {
    return "explorer 2";
  }
  if (percent < 80) {
    return "explorer 3";
  }
  return "explorer 4";
}

function getStorage({
  totalPoints,
  collectedPoints,
}) {
  const totalUnlockableStorage = 1000000000;
  const percent = parseInt((collectedPoints / totalPoints) * 100, 10);
  let unlockedStorage = 0;
  if (percent > 30) {
    unlockedStorage = totalUnlockableStorage * 0.30;
  }
  if (percent > 60) {
    unlockedStorage = totalUnlockableStorage * 0.60;
  }
  if (percent > 80) {
    unlockedStorage = totalUnlockableStorage * 0.80;
  }
  if (percent === 100) {
    unlockedStorage = totalUnlockableStorage;
  }
  return {
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit: "byte",
  };
}

async function formatTaskStatus({
  invokerAddress,
  contractAddress,
  taskMap,
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
  const rank = getRank({
    totalPoints,
    collectedPoints,
  });
  const { totalUnlockableStorage, unlockedStorage, storageUnit } = getStorage({
    totalPoints,
    collectedPoints,
  });
  return {
    tasks,
    totalPoints,
    collectedPoints,
    rank,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
  };
}

async function getTaskStatus({
  contractAddress,
  invokerAddress,
  setCache = true,
}) {
  const taskStatus = await Task.findOne({ contractAddress });
  const {
    tasks,
    rank,
    totalPoints,
    collectedPoints,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
  } = await formatTaskStatus({
    invokerAddress,
    contractAddress,
    taskMap: (taskStatus && taskStatus.taskMap) || {},
    removeCache: setCache,
  });
  return {
    tasks,
    rank,
    totalPoints,
    collectedPoints,
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit,
  };
}

module.exports = getTaskStatus;
