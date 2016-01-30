'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
    displayName: 'HelloMessage2',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'Hello User. This is a shared component.'
        );
    }
});




if( process.env.NODE_ENV ){

    module.exports = React.createElement(HelloMessage);

}else{

    var elm = document.getElementById('message');
    if (elm) {
        ReactDOM.render(React.createElement(HelloMessage), elm);
    }
}
