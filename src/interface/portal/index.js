const {
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const express = require('express');
const router = express.Router();


const enablePortalHadler = require('./enable');
const getPortalHandler = require('./getPortal');

router.post('/enable', asyncHandlerArray(create));
router.get('/', asyncHandlerArray(getPortalHandler);

module.exports = router;
