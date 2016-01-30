'use strict';

var React = require('react');


var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});




if( process.env.NODE_ENV ){

    module.exports = React.createElement(Timer);

}else{

    var elm = document.getElementById('timer');
    if (elm) {
        ReactDOM.render(React.createElement(Timer), elm);
    }
}
