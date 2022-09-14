const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const canView = require('../middleware/canView');

const create = require('./create');

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));

module.exports = router;
