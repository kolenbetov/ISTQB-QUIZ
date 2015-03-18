var getQuestionsForTest = require('./createDataForTest').selectQuestionsForTest;
var questionsView = require('./views/question-view');
var buttonView = require('./views/button-view');
var resultsView = require('./views/result-view');
//var startTimer = require('./countDown');
var Region = require('./region');
var buttonsParentView = require('./views/buttonsParentView');
var reactTimer = require('./timer.react.js');

var containerRegion = new Region({
    el: '.container'
});

var buttonsRegion = new Region({
    el: '.buttons'
});

function startQuiz(){
    getQuestionsForTest(onQuestionsReady);

    function onQuestionsReady(questionsForTest) {
        renderQuestionPage(questionsForTest[0], questionsForTest);
//        startTimer(finishTest.bind(null, questionsForTest, true));
    }
}

function renderQuestionPage(currentQuestion, questions) {

    var viewEl = questionsView({
        data: currentQuestion,
        onSelect: getUserAnswer
    });
    var nextBtn = buttonView({
        data: { id: 'next', text:'Next' },
        onClick: renderNextQuestion
    });
    var backBtn = buttonView( {
        data: {id: 'back', text: 'Back'},
        onClick: renderPreviousQuestion
    });
    var finishBtn = buttonView( {
        data:{id: 'finish', text: 'Finish'},
        onClick: finishTest.bind(null, questions)
    });

    containerRegion.set(viewEl);

    var buttonViews = [];
    if ( questions.indexOf(currentQuestion) == questions.length - 1 ) {
        buttonViews.push(backBtn, finishBtn);
    } else if ( questions.indexOf(currentQuestion) == 0 ) {
        buttonViews.push(finishBtn, nextBtn);
    } else {
        buttonViews.push(backBtn, finishBtn, nextBtn);
    }
    buttonsRegion.set(buttonsParentView({
        children: buttonViews
    }));

    function getUserAnswer(){
        currentQuestion.userAnswer = this.value;
    }

    function renderNextQuestion(){
        var nextQuestionInx = questions.indexOf(currentQuestion) + 1;
        if (nextQuestionInx < questions.length) {
            renderQuestionPage(questions[nextQuestionInx], questions);
        }
    }

    function renderPreviousQuestion(){
        var previousQuestionInx = questions.indexOf(currentQuestion) - 1;
        if (previousQuestionInx >= 0) {
            renderQuestionPage(questions[previousQuestionInx], questions);
        }
    }
}

function finishTest(questions, force){
    if(force) {
        if (!isAllAnswered(questions)) {
            populateUnansweredQuestions(questions);
        }
        var score = getUserScore(questions);
        renderResultsPage(questions, score);
    }
    else {
        if(!isAllAnswered(questions)) {
            alert("Please select answers for all the question");
        }
    }
}

function populateUnansweredQuestions(questions){
    questions.forEach(function(question){
        if(!question.userAnswer){
            question.userAnswer = " ";
        }
    });
}

function isAllAnswered(questions){
    return questions.every(function(question){
        return question.userAnswer;
    });
}

function getUserScore(questions){
    var score = 0;
    questions.forEach(function(question){
        if(question.userAnswer === question.correct){
            score++;
        }
    });
    return score;
}

function renderResultsPage(questions, score) {

    var resultsEl = resultsView({
        results: questions,
        score: score
    });

    containerRegion.set(resultsEl);
    buttonsRegion.set(null);
//    var buttonsContainer = document.querySelector('.buttons');
//    buttonsContainer.innerHTML = "";
//    container.appendChild(resultsEl);
}

startQuiz();