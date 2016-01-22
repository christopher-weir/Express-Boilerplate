// register components
var React = require('react');
var ReactDOM = require('react-dom');

var message = require('./components/message.js');
var timer = require('./components/timer.js');

ReactDOM.render(React.createElement(message), document.getElementById('message'));
ReactDOM.render(React.createElement(timer), document.getElementById('timer'));
