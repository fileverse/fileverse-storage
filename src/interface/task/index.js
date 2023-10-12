const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');
  
const list = require('./list');
const complete = require('./complete');
const verify = require('./verify');

// middlewares
const { canCompleteTask, canListTask } = require('../middleware');

router.get('/list', asyncHandler(canListTask), asyncHandlerArray(list));
router.post('/complete', asyncHandler(canCompleteTask), asyncHandlerArray(complete));
router.post('/verify', asyncHandler(canCompleteTask), asyncHandlerArray(verify));

module.exports = router;
