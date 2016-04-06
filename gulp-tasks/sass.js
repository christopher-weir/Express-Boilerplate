'use strict';

var _       = require('lodash');
var assets  = require('../config/assets/default');

module.exports = function ( gulp, plugins ) {

    return function () {
        gulp
            .src('app/_core/sass/app.sass')
            .pipe(plugins.plumber())
            .pipe(plugins.sass())
            .pipe(plugins.rename('app.css'))
            .pipe(gulp.dest('public/css'));
    };
};
