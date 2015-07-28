var React = require('react');
var QuestionForm = require('./question-form.react.js');

var Result = React.createClass({
    render: function () {
        var questions = this.props.questions;
        return (
            <div className="results">
                <div id="score">
                    <h2>Test finished on: {this.props.date}</h2>
                    <h2>Your score is {this.props.score} from {questions.length}</h2>
                </div>
            {questions.map(function(question){
                return (
                    <div key={question.id} className="question-result">
                        <QuestionForm question={question} disabled={true} isFinished={true} />
                    </div>
                );})}
            </div>
        )
    }
});

module.exports = Result;