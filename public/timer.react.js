var React = require('react');

var Timer = React.createClass({
    getInitialState: function(){
        return {secondsRemaining: 5}
    },
    tick: function(){
        this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000)
    },
    componentWillUnmount: function(){
        if(this.state.secondsRemaining === 0){
            clearInterval(this.interval);
            alert("time is up");
        }
    },
    render: function(){
        return(
            <div>TimeRemaining: {this.state.secondsRemaining}</div>
        )
    }
});

React.render(<Timer />, document.getElementById('timer'));