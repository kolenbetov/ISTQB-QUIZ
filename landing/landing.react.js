var React = require('react');
var startQuiz = require('../quiz/start-quiz');

/*var questions = [{
    "id": 1,
    "text": "Which option is part of the ‘implementation and execution’ area of the fundamental test process?",
    "answers": [
        "A. Developing the tests.",
        "B. Comparing actual and expected results.",
        "C. Writing a test summary.",
        "D. Analysing lessons learnt for future releases."],
    "correct": "B"
}, {
    "id": 2,
    "text": "The five parts of the fundamental test process have a broad chronological order. Which of the options gives three different parts in the correct order?",
    "answers": [
        "A. Implementation and execution, planning and control, analysis and design.",
        "B. Analysis and design, evaluating exit criteria and reporting, test closure activities.",
        "C. Evaluating exit criteria and reporting, implementation and execution, analysis and design.",
        "D. Evaluating exit criteria and reporting, test closure activities, analysis and design."],
    "correct": "B"
}, {
    "id": 3,
    "text": "Which statement is most true?",
    "answers": [
        "A. Different testing is needed depending upon the application.",
        "B. All software is tested in the same way.",
        "C. A technique that finds defects will always find defects.",
        "D. A technique that has found no defects is not useful."],
    "correct": "A"
}, {
    "id": 4,
    "text": "A bug or defect is:",
    "answers": [
        "A. A mistake made by a person;",
        "B. A run-time problem experienced by a user;",
        "C. The result of an error or mistake;",
        "D. The result of a failure, which may lead to an error?"],
    "correct": "C"
}, {
    "id": 5,
    "text": "The effect of testing is to:",
    "answers": [
        "A. Increase software quality;",
        "B. Give an indication of the software quality;",
        "C. Enable those responsible for software failures to be identified;",
        "D. Show there are no problems remaining?"],
    "correct": "B"
}, {
    "id": 6,
    "text": "What is retesting?",
    "answers": [
        "A. Running the same test again in the same circumstances to reproduce the problem.",
        "B. A cursory run through a test pack to see if any new errors have been introduced.",
        "C. Checking that the predetermined exit criteria for the test phase have been met.",
        "D. Running a previously failed test against new software/data/documents to see if the problem is solved."],
    "correct": "D"
}, {
    "id": 7,
    "text": "Which of the following is correct?  Debugging is:",
    "answers": [
        "A. Testing/checking whether the software performs correctly.",
        "B. Checking that a previously reported defect has been corrected.",
        "C. Identifying the cause of a defect, repairing the code and checking the fix is correct.",
        "D. Checking that no unintended consequences have occurred as a result of a fix."],
    "correct": "C"
}, {
    "id": 8,
    "text": "When is testing complete?",
    "answers": [
        "A. When time and budget are exhausted.",
        "B. When there is enough information for sponsors to make an informed decision about release.",
        "C. When there are no remaining high priority defects outstanding.",
        "D. When every data combination has been exercised successfully."],
    "correct": "B"
}, {
    "id": 9,
    "text": "Which list of levels of tester independence is in the correct order, starting with the most independent first?",
    "answers": [
        "A. Tests designed by the author; tests designed by another member of the development team; tests designed by someone from a different company.",
        "B. Tests designed by someone from a different department within the company; tests designed by the author; tests designed by someone from a different company.",
        "C. Tests designed by someone from a different company; tests designed by someone from a different department within the company; tests designed by another member of the development team.",
        "D. Tests designed by someone from a different department within the company; tests designed by someone from a different company; tests designed by the author."],
    "correct": "C"
}, {
    "id": 10,
    "text": "Which of the following is in the correct order (typically)?",
    "answers": [
        "A. Unit testing, system testing, acceptance testing, maintenance testing.",
        "B. System testing, unit testing, acceptance testing, maintenance testing.",
        "C. Acceptance testing, system testing, maintenance testing, unit testing.",
        "D. Unit testing, maintenance testing, system testing, acceptance testing."],
    "correct": "A"
}];*/

module.exports = React.createClass({

    render: function(){
        return (<div>
            <button onClick = {this.onClick} id="start-quiz">Start QUIZ </button>
        </div>)
    },

    onClick: function(){
        startQuiz();
    }

});