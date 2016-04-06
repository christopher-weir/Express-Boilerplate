'use strict';

var _       = require('lodash');
var assets  = require('../config/assets/default');

module.exports = function ( gulp, plugins ) {

    return function () {
        gulp
            .src( _.union( assets.server.allJS, assets.client.js ) )
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
    };
};
