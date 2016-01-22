'use strict';
var React = require('react');

var helloMessage2 = React.createClass({
    displayName: 'HelloMessage2',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'Hello new helloMessage2'
        );
    }
});

module.exports = helloMessage2;
