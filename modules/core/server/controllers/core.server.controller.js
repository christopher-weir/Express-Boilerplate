'use strict';

var ReactDOM = require('react-dom/server');

// react components
var helloMessage = require('../../client/components/message.js');

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {
    var testA = {
        test: 'awefawef'
    };

    console.log(testA);

    res.render('modules/core/server/views/index', {
        markup: ReactDOM.renderToString(helloMessage)
    });

};
