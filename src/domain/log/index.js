const create = require('./create');
const getByFile = require('./getByFile');
const getByContract = require('./getByContract');
const { ddocCreate, ddocSignup } = require('./ddoc');

module.exports = { create, getByFile, getByContract, ddocCreate, ddocSignup };
