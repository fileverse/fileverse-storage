const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');
const enablePortalHadler = require('./enable');
const getPortalHandler = require('./getPortal');

// router.post('/enable', asyncHandlerArray([isAuthenticated, enablePortalHadler]));
router.post('/enable', asyncHandlerArray([enablePortalHadler]));
router.get('/', asyncHandlerArray([getPortalHandler]));

module.exports = router;
