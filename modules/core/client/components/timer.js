'use strict';

var React = require('react');
var template = require('./timer-template.js');
var Timer;


module.exports = Timer = React.createClass(
    {
        getInitialState: function() {
            return {secondsElapsed: 0};
        },
        tick: function() {
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            });
        },
        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000);
        },
        componentWillUnmount: function() {
            clearInterval(this.interval);
        },

        handleClick: function() {
            console.log('click');
        },

        render: function render() {
            this.render = template.bind(this);
            return this.render();
        }
    }
);
