'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');

// react components
var HelloMessage = require('../../client/components/message.js');

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        markup: ReactDOM.renderToString( React.createElement(HelloMessage) )
    });

};
