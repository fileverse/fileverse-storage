function isCompleted() { return true };

module.exports = {
  tasks: [
    {
      taskId: "PRIVATE_KEY_DOWNLOAD",
      name: "Download your private keys",
      activityType: "CLIENT",
      points: 50,
      completed: isCompleted,
      type: "SECURITY",
      category: "DISCOVERY",
    },
    {
      taskId: "CREATE_PUBLISH_3_DPAGES",
      name: "Create and publish 3 DPages",
      activityType: "AUTO",
      points: 25,
      completed: isCompleted,
      type: "CREATE",
      category: "ACHIEVEMENT",
    },
    {
      taskId: "OWN_ENS_DOMAIN",
      name: "Own a ENS Domain",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "ENS",
      category: "ACHIEVEMENT",
    },
  ],
};
