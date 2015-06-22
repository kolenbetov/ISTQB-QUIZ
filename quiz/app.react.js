var React = require('react');
var QuestionPage = require('./question-page.react.js');
var state = require('./app-state');
var Result = require('./result.react.js');

module.exports = React.createClass({

    getInitialState: function(){
        return {
            currentQuestion: state.currentQuestion,
            isFinished: false,
            score: 0
        };
    },

    componentDidMount: function(){
        state.on("change", function(){
            this.setState({currentQuestion: state.currentQuestion})
        }.bind(this));
        state.set("currentQuestion", 0);

        state.on("calculate", function(){
            state.finish(this.props.data)
        }.bind(this));

        state.on("forceCalculate", function(){
            state.finish(this.props.data, true)
        }.bind(this));

        state.on("finish", function(){
            this.setState({
                isFinished: state.isFinished,
                score: state.score
            })
        }.bind(this));
    },

    render: function(){
        var questions = this.props.data;

        var currentPage;
        if (this.state.isFinished === true) {
            currentPage = <Result questions={questions} score={this.state.score} />;
        } else if (this.state.currentQuestion !== null) {
            var question = questions[this.state.currentQuestion];
            var amountOfQuestions = questions.length;
            var questionNumber = questions.indexOf(question) + 1;
            var isFirst = questions.indexOf(question) === 0;
            var isLast = questions.indexOf(question) === (questions.length - 1);
            currentPage = <QuestionPage question={question} amountOfQuestions={amountOfQuestions} questionNumber={questionNumber} />
        }
        return (<div>{currentPage}</div>);
    }
});