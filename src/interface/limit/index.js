const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
  
const check = require('./check');
const claim = require('./claim');
const use = require('./use');

// middlewares
const { canUpdateLimit, canCheckLimit, canCheckLimitUse } = require('../middleware');

router.get('/check', asyncHandler(canCheckLimit), asyncHandlerArray(check));
router.get('/use', asyncHandler(canCheckLimitUse), asyncHandlerArray(use));
router.get('/claim', asyncHandler(canUpdateLimit), asyncHandlerArray(claim));

module.exports = router;
