function getRank({ collectedPoints }) {
  if (collectedPoints >= 740) {
    return "open-sourcerer-gold";
  }
  if (collectedPoints >= 440) {
    return "open-sourcerer-orange";
  }
  if (collectedPoints >= 140) {
    return "pathfinder";
  }
  return "explorer";
}

module.exports = getRank;
