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
const middleware = require('./interface/middleware');

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

app.use(middleware.verifyUcan);

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

app.use('/', router);

app.use(middleware.errorHandler);

// Export the express app instance
module.exports = app;
