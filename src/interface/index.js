const express = require('express');
const router = express.Router();

const upload = require('./upload');
const content = require('./content');

router.use('/upload', upload);
router.use('/content', content);

module.exports = router;
