const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/utils/asyncHandler');
const express = require('express');
const router = express.Router();

const contractAnalytics = require('./contract');
const fileAnalytics = require('./file');

// middlewares
const { canViewAnalytics } = require('../middlewares');

router.get('/', asyncHandler(canViewAnalytics), asyncHandlerArray(contractAnalytics));
router.get('/:fileId', asyncHandler(canViewAnalytics), asyncHandlerArray(fileAnalytics));

module.exports = router;
