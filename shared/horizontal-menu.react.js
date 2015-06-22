var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (
            <div> Welcome, {this.props.user.firstName} {this.props.user.lastName} </div>
        );
    }
});
