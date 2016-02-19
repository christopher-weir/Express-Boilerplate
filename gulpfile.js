'use strict';



/**
 * Module dependencies.
 */
var _ = require('lodash');
var defaultAssets = require('./config/assets/default');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');
var plugins = gulpLoadPlugins();
var babel = require('gulp-babel');
var webpack = require('webpack-stream');

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


// JS minifying task
gulp.task('uglify', function() {

    if (process.env.NODE_ENV === 'production') {
        return gulp
            .src(
                [
                    './.dist/lib.js',
                    './modules/core/client/app/config.js',
                    './modules/core/client/app/init.js',
                    './.dist/application.js'
                ]
            )
            .pipe(plugins.uglify({
                mangle: false
            }))
            .pipe(plugins.concat('app.min.js'))
            .pipe(gulp.dest('public/js'));
    } else {
        return gulp
            .src(
                [
                    './.dist/lib.js',
                    './modules/core/client/app/config.js',
                    './modules/core/client/app/init.js',
                    './.dist/application.js'
                ]
            )
            .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest('public/js'));
    }
});


// JS linting task
gulp.task('eslint', function() {
    return gulp
        .src(_.union(defaultAssets.server.allJS, defaultAssets.client.js))
        .pipe(plugins.eslint({
            // gulp-eslint's config works much like .eslintrc with a dash of ESLint's CLI

            'extends': 'eslint:recommended',

            'ecmaFeatures': {
                'modules': false,
                'jsx': true
            },

            'rules': {
                'no-alert': 0,
                'no-bitwise': 0,
                'camelcase': 1,
                'curly': 1,
                'no-console': 0,
                'eqeqeq': 0,
                'no-eq-null': 0,
                'guard-for-in': 1,
                'no-empty': 1,
                'no-use-before-define': 0,
                'no-obj-calls': 2,
                'no-unused-vars': 0,
                'new-cap': 1,
                'no-shadow': 0,
                'strict': [2, 'global'],
                'no-invalid-regexp': 2,
                'comma-dangle': 2,
                'no-undef': 1,
                'no-new': 1,
                'no-extra-semi': 1,
                'no-debugger': 2,
                'no-caller': 1,
                'semi': 1,
                'quotes': 0,
                'no-unreachable': 2
            },

            'env': {
                'node': true,
                'browser': true
            },

            'globals': {
                'ReactDOM': true
            }
        }))
        .pipe(plugins.eslint.format());
});

// sass task
gulp.task('sass', function() {
    return gulp
        .src('./modules/core/client/sass/app.sass')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.rename('app.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('webpack', function() {

    return gulp.src(defaultAssets.client.js)
        .pipe(webpack({
            output: {
                filename: 'app.js'
            },
            externals: {
                'react': 'React',
                'react-dom': 'ReactDOM'
            },
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }]
            }
        }))
        .pipe(gulp.dest('public/js'));
});

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
