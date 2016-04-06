'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');

// react components
var HelloMessage = require('../components/message/message.js');

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('app/core/views/index', {
        markup: ReactDOM.renderToString( React.createElement(HelloMessage) )
    });

};
