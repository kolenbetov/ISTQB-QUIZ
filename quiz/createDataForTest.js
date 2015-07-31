var NUM_OF_QUESTIONS = 5;

function getJSON(cb) {
    fetch('/questions')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            cb(json);
        }).catch(function(ex){
            console.log("questions were not retrieved", ex)
        });
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