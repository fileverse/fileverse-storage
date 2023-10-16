function getStorage({
  rank
}) {
  const totalUnlockableStorage = 1000000000;
  let unlockedStorage = 0;
  if (rank === 'explorer') {
    unlockedStorage = totalUnlockableStorage * 0.20;
  }
  if (rank === 'pathfinder') {
    unlockedStorage = totalUnlockableStorage * 0.40;
  }
  if (rank === 'open-sourcerer-orange') {
    unlockedStorage = totalUnlockableStorage * 0.80;
  }
  if (rank === 'open-sourcerer-yellow') {
    unlockedStorage = totalUnlockableStorage;
  }
  return {
    totalUnlockableStorage,
    unlockedStorage,
    storageUnit: "byte",
  };
}

module.exports = getStorage;
