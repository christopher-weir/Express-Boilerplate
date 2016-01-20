'use strict';
var React = require('react');
var ReactDOM = require('react-dom/server');
//
// var HelloMessagea = require('../../shared/test.js');
//
// var HelloMessage = React.createFactory(HelloMessagea);
// console.log(HelloMessage);
/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        user: req.user || null
    });

};
