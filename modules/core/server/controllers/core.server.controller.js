'use strict';
//
var helloMessage = require('../../shared/test.js');
//
// var HelloMessage = React.createFactory(HelloMessagea);
// console.log(HelloMessage);




// var markup = React.renderComponentToString(
//     helloMessage()
// );
var markup = helloMessage;

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
