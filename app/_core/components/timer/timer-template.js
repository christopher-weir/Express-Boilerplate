'use strict';

module.exports = function() {

    // console.log(this);
    var boundClick = this.handleClick;
    return (
        <div onClick={boundClick}>
            Seconds Elapsed:
            {this.state.secondsElapsed}
        </div>
    );

};
