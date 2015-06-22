function finishTest(questions, force){
    if(force) {
        if (!isAllAnswered(questions)) {
            populateUnansweredQuestions(questions);
        }
        return getUserScore(questions);
    }
    else {
        if(!isAllAnswered(questions)) {
            alert("Please select answers for all the questions");
            return null;
        }
        else {
            return getUserScore(questions);
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

module.exports = finishTest;