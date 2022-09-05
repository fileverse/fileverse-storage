const {
  asyncHandler,
} = require('../../../infra/utils/asyncHandler');
const fileUpload = require('express-fileupload');
const express = require('express');
const router = express.Router();

const upload = require('./upload');

// middlewares
const {
  canUpload,
} = require('../middlewares');

router.post(
  '/:fileId',
  asyncHandler(canUpload),
  fileUpload(),
  asyncHandlerArray(upload),
);

module.exports = router;
