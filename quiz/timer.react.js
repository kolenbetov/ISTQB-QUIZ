var React = require('react');
var state = require("./app-state");

var Timer = React.createClass({
    getInitialState: function () {
        return {secondsRemaining: (1003)}
    },
    onChange: function () {
        if (this.state.secondsRemaining === 0) {
            clearInterval(this.interval);
            alert("Time is up");
            state.calculateResult(true);
        } else {
            this.setState({secondsRemaining: this.state.secondsRemaining - 1});
        }
    },
    componentDidMount: function () {
        this.interval = setInterval(this.onChange, 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    render: function () {
        var seconds = this.state.secondsRemaining % 60;
        var minutes = Math.round((this.state.secondsRemaining - 30) / 60);
        if (seconds < 10) {
            return (
                <div id="timer1">Time left: {minutes}:0{seconds}</div>
            )
        } else {
            return (
                <div id="timer1">Time left: {minutes}:{seconds}</div>
            )
        }

    }
});

module.exports = Timer;