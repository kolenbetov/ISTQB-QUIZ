var React = require('react');
var ReactTimer = require('./timer.react.js');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
            <div className="question-of">
                Question {this.props.questionNumber} of {this.props.amountOfQuestions}
            </div>
            <div className="timer">
                <ReactTimer />
            </div>
                </div>
        )
    }
});