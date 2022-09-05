const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');

// domain
const content = require('./content');

// middlewares
const { canView } = require('../middleware');

router.get('/:fileId', asyncHandler(canView), asyncHandlerArray(content));

module.exports = router;
