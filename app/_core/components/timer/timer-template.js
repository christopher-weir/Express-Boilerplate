'use strict';

module.exports = function() {

    var boundClick = this.handleClick;
    return (
        <div onClick={boundClick}>
            Seconds Elapsed:
            {this.state.secondsElapsed}
        </div>
    );

};
