const create = require('./create');
const getByFile = require('./getByFile');
const getByContract = require('./getByContract');
const ddocCreate = require('./ddoc');
const upsertComment = require('./upsertComment');

module.exports = { create, getByFile, getByContract, upsertComment, ddocCreate };
