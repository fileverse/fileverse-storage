const fileUpload = require('express-fileupload');
const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const upload = require('./upload');

// middlewares
const {
  canUpload,
} = require('../middleware');

router.post(
  '/:fileId',
  asyncHandler(canUpload),
  fileUpload(),
  asyncHandlerArray(upload),
);

module.exports = router;
