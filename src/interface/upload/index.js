const fileUpload = require('express-fileupload');
const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const upload = require('./upload');
const uploadPublic = require('./public');
const uploadComment = require('./comment')

// middlewares
const {
  canUpload, 
  isPublic,
  canComment
} = require('../middleware');

router.post(
  '/',
  asyncHandler(canUpload),
  fileUpload(),
  asyncHandlerArray(upload),
);

router.post(
  '/comment',
  asyncHandler(canComment),
  fileUpload(),
  asyncHandlerArray(uploadComment),
);

router.post(
  '/public',
  asyncHandler(isPublic),
  fileUpload(),
  asyncHandlerArray(uploadPublic),
);

module.exports = router;
