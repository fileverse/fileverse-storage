const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const { canView, isAuthenticated } = require('../middleware');

const logComments = require('./logComments');
const create = require('./create');

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));
router.put('/comment', asyncHandler(isAuthenticated), asyncHandlerArray(logComments));

module.exports = router;
