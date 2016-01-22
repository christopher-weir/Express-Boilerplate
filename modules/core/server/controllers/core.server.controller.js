'use strict';

var React = require('react');
var ReactDOM = require('react-dom/server');

// react components
var helloMessage = require('../../client/components/message.js');

var helloMessageMarkup = ReactDOM.renderToString(React.createElement(helloMessage));

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        markup: helloMessageMarkup
    });

};
