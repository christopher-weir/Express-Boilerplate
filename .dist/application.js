'use strict';

var Timer = React.createClass({
  displayName: 'Timer',

  getInitialState: function getInitialState() {
    return { secondsElapsed: 0 };
  },
  tick: function tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      'Seconds Elapsed: ',
      this.state.secondsElapsed
    );
  }
});

ReactDOM.render(React.createElement(Timer, null), document.getElementById('exampletime'));

'use strict';

var HelloMessage = React.createClass({
    displayName: 'HelloMessage',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'Hello ',
            this.props.name
        );
    }
});

ReactDOM.render(React.createElement(HelloMessage, {
    name: 'John'
}), document.getElementById('example'));
