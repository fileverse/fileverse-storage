const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
  
const contractAnalytics = require('./contract');
const fileAnalytics = require('./file');

// middlewares
const { canViewAnalytics } = require('../middleware');

router.get('/', asyncHandler(canViewAnalytics), asyncHandlerArray(contractAnalytics));
router.get('/:fileId', asyncHandler(canViewAnalytics), asyncHandlerArray(fileAnalytics));

module.exports = router;
