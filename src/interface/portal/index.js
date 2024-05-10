const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');
const enablePortalHadler = require('./enable');
const getPortalHandler = require('./getPortal');

router.post('/index', asyncHandlerArray([isAuthenticated, enablePortalHadler]));
router.get('file/:fileId', asyncHandlerArray([getPortalHandler]));

module.exports = router;
