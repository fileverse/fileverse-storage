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
      name: "ENS",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: ens,
      type: "External",
      enabled: true,
    },
    {
      id: "LENS",
      name: "Lens",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: lens,
      type: "External",
      enabled: true,
    },
    {
      id: "SAFE",
      name: "Safe",
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
      name: "Create three public files",
      logo: "",
      storage: 200000000,
      unit: "bytes",
      canClaim: publicFiles,
      type: "Internal",
      enabled: true,
    },
    {
      id: "WHITEBOARD",
      name: "Create one whiteboard",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: whiteboard,
      type: "Internal",
      enabled: true,
    },
    {
      id: "PRIVATE_FILES",
      name: "Create one private file",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: privateFiles,
      type: "Internal",
      enabled: true,
    },
    {
      id: "MEMBERS",
      name: "Add three members",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: members,
      type: "Internal",
      enabled: false,
    },
  ],
};
