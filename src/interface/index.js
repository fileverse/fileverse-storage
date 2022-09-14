const express = require('express');
const router = express.Router();

const upload = require('./upload');
const content = require('./content');
const analytics = require('./analytics');
const log = require('./log');

router.use('/upload', upload);
router.use('/content', content);
router.use('/analytics', analytics);
router.use('/log', log);

module.exports = router;
