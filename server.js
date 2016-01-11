'use strict';

/**
 * Module dependencies.
 */
var config      = require('./config/config');
var express     = require('./config/lib/express');
var cluster     = require('express-cluster');
var nunjucks    = require('nunjucks');

cluster(function(worker) {
    // Initialize express
    var app = express.init();

    // Start the app by listening on <port>
    app.listen(config.port);

    // Logging initialization
    console.log('Application started on port ' + config.port);
});
