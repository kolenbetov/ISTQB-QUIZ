var $ = require('jquery');
var questionTpl = require('../templates/question.hbs');

module.exports = function(options) {


    var el = $(questionTpl(options.data)).get(0);
    if(options.data.userAnswer){
        el.querySelector('[data-id=' + options.data.userAnswer.toLowerCase() + options.data.id + ']').checked = true;
    }
    $(el).find('input:radio').on('change', options.onSelect );
    return el;

}