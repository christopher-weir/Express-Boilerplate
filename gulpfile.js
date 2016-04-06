'use strict';



/**
 * Module dependencies.
 */
var _ = require('lodash');
var defaultAssets = require('./config/assets/default');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var babel = require('gulp-babel');


// Set NODE_ENV to 'test'
gulp.task('env:test', function() {
    process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function() {
    process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function() {
    process.env.NODE_ENV = 'production';
});


// Nodemon task
gulp.task('nodemon', function() {

    return plugins.nodemon({
        script: 'server.js',
        verbose: true,
        // nodeArgs: ['--debug'],
        ext: 'js,html,json',
        watch: _.union(
            defaultAssets.server.views,
            defaultAssets.server.allJS,
            defaultAssets.server.config,
            defaultAssets.client.js,
            defaultAssets.client.sass
        )
    });
});


// Watch Files For Changes
gulp.task('watch', function() {

    // watch all server js
    gulp.watch(
        defaultAssets.server.allJS,
        [
            'eslint'
        ]
    );

    //
    gulp.watch(
        defaultAssets.client.js, [
            'eslint',
            'webpack'
        ]
    );

    // watch all client sass
    gulp.watch(
        defaultAssets.client.sass, [
            'sass'
        ]
    );
});


// JS linting task
gulp.task('eslint', require('./gulp-tasks/eslint')(gulp, plugins));

// webpack
gulp.task('webpack', require('./gulp-tasks/webpack')(gulp, plugins));

// webpack
gulp.task('sass', require('./gulp-tasks/sass')(gulp, plugins));

// Run the project in development mode
gulp.task('default', function(done) {
    runSequence(
        'env:dev',
        'eslint',
        'webpack',
        [
            'nodemon',
            'watch'
        ],
        done
    );
});

// Run the project in production mode
gulp.task('production', function(done) {
    runSequence(
        'env:prod',
        'eslint',
        'webpack',
        [
            'nodemon',
            'watch'
        ],
        done
    );
});
