function getRank({ collectedPoints }) {
  if (collectedPoints >= 680) {
    return "open-sourcerer-gold";
  }
  if (collectedPoints >= 430) {
    return "open-sourcerer-orange";
  }
  if (collectedPoints >= 130) {
    return "pathfinder";
  }
  return "explorer";
}

module.exports = getRank;
