const express = require('express');
const router = express.Router();

const file = require('./file');
const index = require('./indexPortal');

router.use('/file', file);
router.use('/index', index);

module.exports = router;
