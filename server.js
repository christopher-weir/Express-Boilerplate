'use strict';

/**
 * Module dependencies.
 */
require('babel-core/register');
var config      = require('./config/config');
var express     = require('./config/lib/express');
var cluster     = require('express-cluster');

cluster(function(worker) {
    // Initialize express
    var app = express.init();

    // Logging initialization
    console.log('Application started on port ' + config.port);

    // Start the app by listening on <port>
    return app.listen(config.port);
});
