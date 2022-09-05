'use strict';

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./interface');
const { errorHandler } = require('./interface/middleware');
const ucan = require('./infra/ucan');

// Express App
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Use default logger for now
app.use(logger('combined'));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  }),
);

app.use(ucan.verify);

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

app.use('/', router);

app.use(errorHandler);

// Export the express app instance
module.exports = app;
