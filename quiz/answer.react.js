var React = require('react');
var state = require('./app-state');

var Answer = React.createClass({

    render: function(){
        var answer = this.props.answer;
        var value = answer.value;
        var text = answer.text;
        var id = value.toLowerCase();
        var questionId = this.props.question.id;
        var selection = this.props.question.userAnswer === value;
        var classname;
        if (state.isFinished) {
            if(this.props.question.correct === value){
                classname = "correct-answer";
            }
            else if(selection && this.props.question.correct !== value) {
                classname = "wrong-answer";
            }
        }
        return (
            <div>
                <input id={id} type="radio" name="answer" value={value} onChange={this.props.onChange} checked={selection} disabled={this.props.disabled}/>
                <label htmlFor={id} className={classname}>{value + '. ' + text}</label>
            </div>
        )
    }
});

module.exports = Answer;