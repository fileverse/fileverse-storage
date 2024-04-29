const express = require('express');

const router = express.Router();

const {
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

// domain
const fileList = require('./fileList');

// TODO: confirm do if we need any middleware here.

router.get('/', asyncHandlerArray(fileList));

module.exports = router;
