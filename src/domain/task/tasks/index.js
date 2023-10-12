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
      taskId: "PUBLISH_PUBLIC_DDOC",
      name: "Publish a public dDoc",
      activityType: "AUTO",
      points: 10,
      completed: isCompleted,
      type: "PUBLISH",
      category: "DISCOVERY",
    },
    {
      taskId: "PUBLISH_PRIVATE_WHITEBOARD",
      name: "Publish a private whiteboard",
      activityType: "AUTO",
      points: 10,
      completed: isCompleted,
      type: "PUBLISH",
      category: "DISCOVERY",
    },
    {
      taskId: "PUBLISH_PUBLIC_DPAGE",
      name: "Publish a public dPage",
      activityType: "AUTO",
      points: 10,
      completed: isCompleted,
      type: "PUBLISH",
      category: "DISCOVERY",
    },
    {
      taskId: "UPLOAD_PRIVATE_FILE",
      name: "Upload a private file",
      activityType: "AUTO",
      points: 10,
      completed: isCompleted,
      type: "UPLOAD",
      category: "DISCOVERY",
    },
    {
      taskId: "UPLOAD_PUBLIC_FILE",
      name: "Upload a public file",
      activityType: "AUTO",
      points: 10,
      completed: isCompleted,
      type: "UPLOAD",
      category: "DISCOVERY",
    },
    {
      taskId: "CHAT_ON_FILE",
      name: "Use chat on a file",
      activityType: "CLIENT",
      points: 10,
      completed: isCompleted,
      type: "CHAT",
      category: "DISCOVERY",
    },
    {
      taskId: "INVITE_PORTAL_COLLABORATOR",
      name: "Invite a collaborator to a portal",
      activityType: "CLIENT",
      points: 10,
      completed: isCompleted,
      type: "GROUP",
      category: "DISCOVERY",
    },
    {
      taskId: "TRY_LIVE_COLLABORATION",
      name: "Try a live collaboration",
      activityType: "CLIENT",
      points: 10,
      completed: isCompleted,
      type: "SHARE",
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
      taskId: "CREATE_PUBLISH_3_DDOCS",
      name: "Create and publish 3 DDocs",
      activityType: "AUTO",
      points: 25,
      completed: isCompleted,
      type: "CREATE",
      category: "ACHIEVEMENT",
    },
    {
      taskId: "COMMENT_ON_10_FILES",
      name: "Comment on 10 Files",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "CHAT",
      category: "ACHIEVEMENT",
    },
    {
      taskId: "PUBLISH_10_PUBLIC_WHITEBOARDS",
      name: "Publish 10 Public whiteboards",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "CREATE",
      category: "ACHIEVEMENT",
    },
    {
      taskId: "PUBLISH_10_PUBLIC_DDOCS",
      name: "Publish 10 Public DDocs",
      activityType: "AUTO",
      points: 50,
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
      category: "ONCHAIN",
    },
    {
      taskId: "OWN_FARCASTER_HANDLE",
      name: "Own a Farcaster Handle",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "FARCASTER",
      category: "ONCHAIN",
    },
    {
      taskId: "OWN_LENS_HANDLE",
      name: "Own a Lens Handle",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "LENS",
      category: "ONCHAIN",
    },
    {
      taskId: "OWN_SAFE_MULTISIG",
      name: "Own a Safe Multisig",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "SAFE",
      category: "ONCHAIN",
    },
    {
      taskId: "OWN_GITCOIN_PASSPORT",
      name: "Own a Gitcoin Passport",
      activityType: "AUTO",
      points: 50,
      completed: isCompleted,
      type: "GITCOIN",
      category: "ONCHAIN",
    },
  ],
};
