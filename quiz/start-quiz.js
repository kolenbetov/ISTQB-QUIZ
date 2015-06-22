var React = require('react');
var getQuestionsForTest = require('./createDataForTest').selectQuestionsForTest;
var App = require('./app.react.js');
var TopMenu = require('./../shared/horizontal-menu.react.js');

module.exports = function startQuiz(user){
    getQuestionsForTest(onQuestionsReady);

    function onQuestionsReady(questions){
//        if (!user) React.unmountComponentAtNode(document.querySelector('.login-container'));
//        if(user) React.render(<TopMenu user={user} />, document.querySelector('.horizontal-menu'));
        React.render(<App data={questions} />, document.querySelector('.app'));
    }
};