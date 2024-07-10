const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
const express = require('express');
const router = express.Router();

const canView = require('../middleware/canView');

const create = require('./create');
const ddocCreate = require('./ddoc');
const ddocSignUp = require('./ddocSignup');

router.post('/create', asyncHandler(canView), asyncHandlerArray(create));
router.get('/create/ddoc', asyncHandlerArray(ddocCreate));
router.post('/signup/ddoc', asyncHandlerArray(ddocSignUp));

module.exports = router;
