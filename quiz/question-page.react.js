var React = require('react');
//var ReactTimer = require('./timer.react.js');
var TopSection = require('./top-menu.react');
var QuestionForm = require('./question-form.react.js');
var Button = require('./button.react.js');
var state = require('./app-state');

var QuestionPage = React.createClass({

    render: function(){

        var nextBtn = (this.props.questionNumber === this.props.amountOfQuestions) ? null : <Button className="next-button" text="Next" handleClick={this.clickHandler} />;
        var backBtn = (this.props.questionNumber === 1) ? null : <Button className="back-button" text="Back" handleClick={this.clickHandler} />;

        return (
            <div>
                <div className="top-section">
                    <TopSection questionNumber={this.props.questionNumber} amountOfQuestions={this.props.amountOfQuestions} />
                </div>
                <div className="question-container">
                    <QuestionForm question={this.props.question} />
                </div>
                <div className="buttons">
                    {backBtn}
                    <Button className="finish-button" text="Finish" handleClick={this.clickHandler} />
                    {nextBtn}
                </div>
            </div>
        )
    },

    clickHandler: function(e){
        if (e.target.className === "next-button"){
            state.set("currentQuestion", (state.currentQuestion + 1) );
        } else if (e.target.className === "back-button"){
            state.set("currentQuestion", (state.currentQuestion - 1) );
        } else if (e.target.className === "finish-button"){
            state.calculateResult();
        }
    }
});

module.exports = QuestionPage;