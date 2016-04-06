'use strict';

var React = require('react');
var HelloMessage;

module.exports = HelloMessage = React.createClass({

    render: function render() {
        return React.createElement(
            'div',
            null,
            'Hello User. This is a shared component.'
        );
    }
});
