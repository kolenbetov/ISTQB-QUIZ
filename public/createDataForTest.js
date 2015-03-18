var curQuestion = 0;
var NUM_OF_QUESTIONS = 5;
var questionsForTest = [];
var url = 'data.json';


function getJSON(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.readyState !=4 ) return;
        var questions = JSON.parse(this.response);
        cb(questions);
    };
    xhr.send(null);
}

function generateRandomNumber(max) {
    var random = Math.floor(Math.random() * max);
    return random;
}

function selectQuestionsForTest(cb) {

    getJSON(onQuestionsReceived);

    function onQuestionsReceived(questions) {
        var questionsForTest = [];
        for (var i = 0; i < NUM_OF_QUESTIONS; i++) {
            var random = generateRandomNumber(questions.length);
            while (questionsForTest.indexOf(questions[random]) >= 0) {
                random = generateRandomNumber(questions.length);
            }
            questionsForTest.push(questions[random]);
        }
        cb(questionsForTest);
    }
}


module.exports = {
    selectQuestionsForTest: selectQuestionsForTest
    /*getJSON: getJSON,
     curQuestion: curQuestion,
     numberOfQuestions: NUM_OF_QUESTIONS,
     questionsForTest: questionsForTest*/
};