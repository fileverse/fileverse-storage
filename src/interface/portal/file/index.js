const express = require('express');
const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');


const {
    getPortalHandler,
    getAllPortalHandler
} = require('./getPortal');

router.get('/:fileId', asyncHandlerArray([getPortalHandler]));
router.get('/', asyncHandlerArray([getAllPortalHandler]));

module.exports = router;