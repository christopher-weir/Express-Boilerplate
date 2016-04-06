'use strict';

var _       = require('lodash');
var assets  = require('../config/assets/default');

module.exports = function ( gulp, plugins ) {

    return plugins.nodemon({
        script: 'server.js',
        verbose: true,
        // nodeArgs: ['--debug'],
        ext: 'js,html,json',
        watch: _.union(
            assets.server.views,
            assets.server.allJS,
            assets.server.config,
            assets.client.js,
            assets.client.sass
        )
    });
};
