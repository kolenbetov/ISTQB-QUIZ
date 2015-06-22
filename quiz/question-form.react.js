var React = require('react');
var Answer = require('./answer.react.js');

var QuestionForm = React.createClass({

    render: function(){
        var question = this.props.question;
        var answers = question.answers;
        var isFinished = this.props.isFinished ? "result" : "question";
        return (
            <div className={isFinished}>
                <h2 className="title">{question.text}</h2>
                <form>
                {answers.map(function(answer){
                    return (<Answer question={question} answer={answer} key={question.id + answer.value} onChange={this.onChange} disabled={this.props.disabled} />)
                }.bind(this))}
                </form>
            </div>
        )
    },

    onChange: function(e){
        this.props.question.userAnswer = e.target.value;
        this.forceUpdate();
    }
});

module.exports = QuestionForm;