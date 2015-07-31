var newResult = {
    date: "",
    score: "",
    result: ""
};

function finishTest(questions, force){
    if(force) {
        if (!isAllAnswered(questions)) {
            populateUnansweredQuestions(questions);
        }
    }
    else {
        if(!isAllAnswered(questions)) {
            alert("Please select answers for all the questions");
            return null;
        }
    }

    newResult.result = questions;
    newResult.date = getDate();
    newResult.score = getScore(questions);
    saveResult(newResult, function(res){
        if(res.name == "MongoError"){
            console.log("Error when saving to DB: " + res);
        } else { console.log("result was saved to db"); }
    });
    return newResult;
}

function saveResult(result, cb){
    fetch('/result', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(result)
    })
        .then(function(res){
            return res.json()
        }).then(function(json){
            cb(json)
        }).catch(function(ex){
            console.log("Error: " + ex)
        })
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

function getScore(questions){
    var score = 0;
    questions.forEach(function(question){
        if(question.userAnswer === question.correct){
            score++;
        }
    });
    return score;
}

function getDate(){
    return new Date();
}

module.exports = finishTest;