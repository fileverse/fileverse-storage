const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');
const enablePortalHadler = require('./enable');
const { getPortalHandler, getAllPortalHandler } = require('./getPortal');

router.post('/index', asyncHandlerArray([isAuthenticated, enablePortalHadler]));
router.get('/file/:fileId', asyncHandlerArray([getPortalHandler]));
router.get('/file', asyncHandlerArray([getAllPortalHandler]));

module.exports = router;
