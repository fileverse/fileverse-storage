const ens = require("./ens");
const lens = require("./lens");
const safe = require("./safe");
const publicFiles = require("./publicFiles");
const whiteboard = require("./whiteboard");
const privateFiles = require("./privateFiles");
const impactDAO = require("./impactDAO");
const members = require("./members");

module.exports = {
  claims: [
    {
      id: "ENS",
      name: "Own an ENS Domain",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: ens,
      type: "External",
      enabled: true,
    },
    {
      id: "LENS",
      name: "Own a Lens handle",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: lens,
      type: "External",
      enabled: true,
    },
    {
      id: "SAFE",
      name: "Own a Safe multisig",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: safe,
      type: "External",
      enabled: true,
    },
    {
      id: "IMPACTDAO",
      name: "Impact DAO",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: impactDAO,
      type: "External",
      enabled: false,
    },
    {
      id: "PUBLIC_FILES",
      name: "Upload 3 Public Files",
      logo: "",
      storage: 200000000,
      unit: "bytes",
      canClaim: publicFiles,
      type: "Internal",
      enabled: true,
    },
    {
      id: "WHITEBOARD",
      name: "Create & Upload 1 Whiteboard",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: whiteboard,
      type: "Internal",
      enabled: true,
    },
    {
      id: "PRIVATE_FILES",
      name: "Created 1 Private File",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: privateFiles,
      type: "Internal",
      enabled: true,
    },
    {
      id: "MEMBERS",
      name: "Have 3 Portal Members",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: members,
      type: "Internal",
      enabled: false,
    },
  ],
};
