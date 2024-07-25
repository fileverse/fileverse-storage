'use strict';

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const config = require('../config');
var getRawBody = require('raw-body');
var contentType = require('content-type');

if (config.ENABLE_APM === 'true') {
  require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: config.ELASTIC_SERVICE_NAME,
    secretToken: config.ELASTIC_SECRET_TOKEN,
    serverUrl: config.ELASTIC_SERVER_URL,
    environment: config.ELASTIC_ENVIRONMENT,
  });
}

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./interface');
const { errorHandler } = require('./interface/middleware');
const { asyncHandler } = require('./infra/asyncHandler');
const ucan = require('./infra/ucan');
const { id } = require('ethers/lib/utils');

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

app.use(asyncHandler(ucan.verify));
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '200mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) {
      const headers = req.headers;
      const identifier = {
        chain: headers['chain'],
        contract: headers['contract'],
        invoker: headers['invoker'],
        host: headers['host'],
      }
      console.log('req limit exceeded of req with headers', identifier)
      return next(err)
    }
    req.text = string
    next()
  })
})

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

app.use('/', router);

app.use(errorHandler);

// Export the express app instance
module.exports = app;
