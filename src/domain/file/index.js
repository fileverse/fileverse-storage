const create = require('./create');
const getSizeByContract = require('./getSizeByContract');
const { findAll, findOne, findAllIpfsHashes } = require('./findall');


module.exports = { create, getSizeByContract, findAll, findOne, findAllIpfsHashes };
