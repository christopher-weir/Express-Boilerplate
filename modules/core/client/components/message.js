'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var helloMessage2 = React.createClass({
    displayName: 'HelloMessage2',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'Hello User. This is a shared component.'
        );
    }
});

module.exports = helloMessage2;
