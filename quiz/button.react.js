var React = require('react');

var Button = React.createClass({
    render: function(){
        return (
            <button className={this.props.className} onClick={this.props.handleClick}>{this.props.text}</button>
        )
    }
});

module.exports = Button;