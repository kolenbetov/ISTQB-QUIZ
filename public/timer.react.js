var React = require('react');

module.exports = function(cb) {
    var Timer = React.createClass({
        getInitialState: function () {
            return {secondsRemaining: (10)}
        },
        onChange: function () {
            if (this.state.secondsRemaining === 0) {
                clearInterval(this.interval);
                alert("Time is up");
                cb();
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
            if(seconds === 0){
                return null;
            } else if (seconds < 10) {
                return (
                    <div>Time Remaining: {minutes}:0{seconds}</div>
                )
            } else {
                return (
                    <div>Time Remaining: {minutes}:{seconds}</div>
                )
            }
        }
    });
    React.render(<Timer />, document.getElementById('timer'));
};