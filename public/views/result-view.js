var $ = require('jquery');
var resultTpl = require('../templates/result.hbs');

module.exports = function(options){

    var el = $(resultTpl(options)).get(0);
    options.results.forEach(function(question) {
        if(question.userAnswer && question.userAnswer !== " "){
            var userAnswer = el.querySelector('[data-id=' + question.userAnswer.toLowerCase() + question.id + ']');
            userAnswer.checked = true;
        }
        var correctAnswer = el.querySelector('[data-id=' + question.correct.toLowerCase() + question.id + '-choice]');
        correctAnswer.className = 'correct-answer';
    });
    return el;
}