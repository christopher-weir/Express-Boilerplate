'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var <%= module_name_react %> = require('./<%= module_name_folder %>/<%= module_name_folder %>.js');

if ( document.getElementById('<%= module_name_folder %>') ) {
    ReactDOM.render(<<%= module_name_react %> />, document.getElementById('<%= module_name_folder %>'));
}
