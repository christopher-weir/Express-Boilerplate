'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var Message = require('./message/message.js');
var Timer = require('./timer/timer.js');



if ( document.getElementById('timer') ) {
    ReactDOM.render(<Timer />, document.getElementById('timer'));
}


if ( document.getElementById('message') ) {
    ReactDOM.render(<Message />, document.getElementById('message') );
}
