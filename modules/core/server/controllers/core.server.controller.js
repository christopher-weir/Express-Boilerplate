'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');
// react components
var helloMessage = require('../../shared/test.js');

var markup = ReactDOM.renderToString(React.createElement(helloMessage));

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        user: req.user || null
    });

};

exports.renderTestComponentPage = function( req, res ) {

    res.render('modules/core/server/views/testc', {
        markup: markup
    });

};
