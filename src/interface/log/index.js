const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const canView = require('../middleware/canView');

const create = require('./create');
const ddocCreate = require('./ddoc')

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));
router.get('/create/ddoc', asyncHandlerArray(ddocCreate));

module.exports = router;
