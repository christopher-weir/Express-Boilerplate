'use strict';

var _       = require('lodash');
var assets  = require('../config/assets/default');
var webpack = require('webpack-stream');

module.exports = function ( gulp, plugins ) {

    return function () {
        gulp
            .src( assets.client.js )
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
    };
};
