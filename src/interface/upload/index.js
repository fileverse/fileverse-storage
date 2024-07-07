const fileUpload = require('express-fileupload');
const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const upload = require('./upload');
const uploadPublic = require('./public');

// middlewares
const {
  canUpload, isPublic
} = require('../middleware');

router.post(
  '/',
  asyncHandler(canUpload),
  fileUpload(),
  asyncHandlerArray(upload),
);

router.post(
  '/public',
  asyncHandler(isPublic),
  fileUpload(),
  asyncHandlerArray(uploadPublic),
);

module.exports = router;
