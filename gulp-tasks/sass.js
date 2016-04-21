'use strict';

var _       = require('lodash');
var assets  = require('../config/assets/default');

module.exports = function ( gulp, plugins ) {

    return function () {
        gulp
            .src([
                'app/_core/sass/app.sass',
                'app/!(_core)/sass/*.sass',
                'app/!(_core)/sass/*.scss'
            ])
            .pipe(plugins.plumber())
            .pipe(plugins.sass())
            .pipe(plugins.concat('app.css'))
            .pipe(gulp.dest('public/css'));
    };
};
