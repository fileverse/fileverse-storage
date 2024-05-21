const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');

const express = require('express');
const router = express.Router();

const enablePortalHadler = require('./enable');
const triggerJobProcessing = require('./trigger');
const processStatus = require('./triggerStatus');
const middleware = require('../../middleware');

router.post('/', asyncHandlerArray([middleware.isAuthenticated, enablePortalHadler]));
router.get('/trigger', asyncHandlerArray([triggerJobProcessing]));
router.get('/trigger/status', asyncHandlerArray([middleware.isAuthenticated, processStatus]));

module.exports = router;