var NUM_OF_QUESTIONS = 5;

function getJSON(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/start', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.readyState !=4 && http.status != 200 ) return;
        var questions = JSON.parse(this.response);
        cb(questions);
    };
    xhr.send();
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
};