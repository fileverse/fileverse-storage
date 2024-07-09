const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const { canView, isAuthenticated } = require('../middleware');

const logComments = require('./logComments');
const create = require('./create');
const ddocCreate = require('./ddoc');
const ddocSignUp = require('./ddocSignup');

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));
router.get('/create/ddoc', asyncHandlerArray(ddocCreate));
router.put('/comment', asyncHandler(isAuthenticated), asyncHandlerArray(logComments));
router.post('/signup/ddoc', asyncHandlerArray(ddocSignUp));

module.exports = router;
