/**
 * query Profiles { 
 *  profiles(request: { ownedBy: ["0xD020E01C0c90Ab005A01482d34B808874345FD82"], limit: 2 }) {
 *      items {
 *          id
 *          name
 *      }
 *  }
 * }
*/
function checkClaim({ contractAddress, invokerAddress }) {
  return true;
}

module.exports = {
  id: "LENS",
  name: "Lens",
  storage: 1000,
  checkClaim,
};
