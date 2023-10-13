// best way is to process the logs and increment the stats in the DB per portal
// fileverse_chat -> File
// fileverse_files -> File
// fileverse_documents -> DDocs
// fileverse_whiteboard -> Whiteboard

// public -> Public
// private -> Collaborator
// members_private -> Members
// gated -> Token Gated
const completeMultipleTask = require("../task/completeMultipleTask");
const { Stat } = require("../../infra/database/models");

async function completeTasks({
  contractAddress,
  invokerAddress,
  currentTags,
  tagStats,
}) {
  const taskIds = [];
  if (
    tagStats["fileverse_files"] > 0 &&
    currentTags.includes("fileverse_files") &&
    currentTags.includes("public")
  ) {
    taskIds.push("PUBLISH_PUBLIC_FILE");
  }
  if (
    tagStats["fileverse_files"] > 0 &&
    currentTags.includes("fileverse_files") &&
    currentTags.includes("private")
  ) {
    taskIds.push("UPLOAD_PRIVATE_FILE");
  }
  if (
    tagStats["fileverse_documents"] > 0 &&
    currentTags.includes("fileverse_documents") &&
    currentTags.includes("public")
  ) {
    taskIds.push("PUBLISH_PUBLIC_DDOC");
  }
  if (
    tagStats["fileverse_whiteboard"] > 0 &&
    currentTags.includes("fileverse_whiteboard") &&
    currentTags.includes("private")
  ) {
    taskIds.push("PUBLISH_PRIVATE_WHITEBOARD");
  }
  if (
    tagStats["fileverse_dpage"] > 0 &&
    currentTags.includes("fileverse_dpage") &&
    currentTags.includes("public")
  ) {
    taskIds.push("PUBLISH_PUBLIC_DPAGE");
  }
  if (
    tagStats["fileverse_chat"] > 0 &&
    currentTags.includes("fileverse_chat")
  ) {
    taskIds.push("CHAT_ON_FILE");
  }
  if (
    tagStats["fileverse_dpage"] >= 3 &&
    currentTags.includes("fileverse_dpage")
  ) {
    taskIds.push("CREATE_PUBLISH_3_DPAGES");
  }
  if (
    tagStats["fileverse_documents"] >= 3 &&
    currentTags.includes("fileverse_documents")
  ) {
    taskIds.push("CREATE_PUBLISH_3_DDOCS");
  }
  if (
    tagStats["fileverse_whiteboard"] >= 10 &&
    currentTags.includes("fileverse_whiteboard") &&
    currentTags.includes("public")
  ) {
    taskIds.push("PUBLISH_10_PUBLIC_WHITEBOARDS");
  }
  if (
    tagStats["fileverse_documents"] >= 10 &&
    currentTags.includes("fileverse_documents") &&
    currentTags.includes("public")
  ) {
    taskIds.push("PUBLISH_10_PUBLIC_DDOCS");
  }
  if (
    tagStats["fileverse_chat"] >= 10 &&
    currentTags.includes("fileverse_chat")
  ) {
    taskIds.push("COMMENT_ON_10_FILES");
  }

  if (taskIds.length === 0) return;
  await completeMultipleTask({ contractAddress, invokerAddress, taskIds });
}

async function process(contractAddress, invokerAddress = 'system', log) {
  const currentTags = log.tags || [];
  if (currentTags.length === 0) {
    return;
  }
  const statObject = await Stat.findOne({ contractAddress });
  const tagStats = (statObject && statObject.tagStats) || {};
  currentTags.map((tag) => {
    if (!tagStats[tag]) tagStats[tag] = 0;
    tagStats[tag] = tagStats[tag] + 1;
  });
  await Stat.findOneAndUpdate(
    { contractAddress },
    { $set: { tagStats } },
    { upsert: true }
  );
  // mark the task complete if done based on stat
  await completeTasks({
    contractAddress,
    invokerAddress,
    currentTags,
    tagStats,
  });
  return;
}

module.exports = process;
