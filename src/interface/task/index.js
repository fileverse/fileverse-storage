const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
  
const list = require('./list');
const complete = require('./complete');

// middlewares
const { canCompleteTask, canListTask } = require('../middleware');

router.get('/list', asyncHandler(canListTask), asyncHandlerArray(list));
router.get('/complete', asyncHandler(canCompleteTask), asyncHandlerArray(complete));

module.exports = router;
