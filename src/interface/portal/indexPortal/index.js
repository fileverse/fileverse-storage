const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');

const express = require('express');
const router = express.Router();

const enablePortalHadler = require('./enable');
const triggerJobProcessing = require('./trigger');
const processStatus = require('./triggerStatus');
const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/', asyncHandlerArray([isAuthenticated, enablePortalHadler]));
router.get('/trigger', asyncHandlerArray([triggerJobProcessing]));
router.get('/trigger/status', asyncHandlerArray([isAuthenticated, processStatus]));

module.exports = router;