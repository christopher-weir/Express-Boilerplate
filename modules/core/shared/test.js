'use strict';
var React = require('react');
var ReactDOM = require('react-dom/server');
/**
 * Render the main applicaion page
 */
//  var HelloMessage = React.createClass({
//    handleClick: function () {
//      alert('You clicked!');
//    },
//
//    render: function() {
//      return <div onClick={this.handleClick}>Hello {this.props.name}</div>;
//    }
//  });
//
// module.exports = HelloMessage;

var helloMessage = React.createClass({
  displayName: 'HelloMessage',

  render: function render() {
    return React.createElement(
      'div',
      null,
      'Hello new rrawecccfweaf'
    );
  }
});

module.exports = ReactDOM.renderToString(React.createElement(helloMessage));
