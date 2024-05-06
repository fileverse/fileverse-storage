const express = require('express');

const router = express.Router();

const {
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

// domain
const { fileList, getUniqueFile } = require('./fileList');

router.get('/hash', asyncHandlerArray([getUniqueFile]));
router.get('/invoker', asyncHandlerArray([fileList]));

module.exports = router;
