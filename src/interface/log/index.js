const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const { canView, isAuthenticated } = require('../middleware');

const logComments = require('./logComments');
const create = require('./create');
const ddocCreate = require('./ddoc')

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));
router.put('/comment', asyncHandler(isAuthenticated), asyncHandlerArray(logComments));
router.get('/create/ddoc', asyncHandlerArray(ddocCreate));

module.exports = router;
