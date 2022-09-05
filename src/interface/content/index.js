const {
    asyncHandler,
    asyncHandlerArray,
  } = require('../../../infra/utils/asyncHandler');
  const express = require('express');
  const router = express.Router();
  
  // domain
  const content = require('./content');

  // middlewares
  const { canView } = require('../middlewares');
  
  router.get('/:fileId', asyncHandler(canView), asyncHandlerArray(content));
  
  module.exports = router;
  