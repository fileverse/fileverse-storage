const ens = require("./ens");
const lens = require("./lens");
const safe = require("./safe");
const publicFiles = require("./publicFiles");
const whiteboard = require("./whiteboard");
const privateFiles = require("./privateFiles");

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
    },
    {
      id: "LENS",
      name: "Lens",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: lens,
      type: "External",
    },
    {
      id: "SAFE",
      name: "Safe",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: safe,
      type: "External",
    },
    {
      id: "PUBLIC_FILES",
      name: "Create three public files",
      logo: "",
      storage: 200000000,
      unit: "bytes",
      canClaim: publicFiles,
      type: "Internal",
    },
    {
      id: "WHITEBOARD",
      name: "Create one whiteboard",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: whiteboard,
      type: "Internal",
    },
    {
      id: "PRIVATE_FILES",
      name: "Create one private file",
      logo: "",
      storage: 100000000,
      unit: "bytes",
      canClaim: privateFiles,
      type: "Internal",
    },
  ],
};
