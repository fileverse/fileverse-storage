const express = require('express');
const router = express.Router();

const upload = require('./upload');
const content = require('./content/content');
const analytics = require('./analytics');

router.use('/upload', upload);
router.use('/content', content);
router.use('/analytics', analytics);

module.exports = router;
