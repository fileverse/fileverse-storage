// check if address has .eth ens name
async function checkClaim({ invokerAddress }) {
  const name = await provider.lookupAddress(invokerAddress);
  return name.endsWith(".eth");
}

module.exports = {
  id: "ENS",
  name: "ENS",
  storage: 100000,
  checkClaim,
};
