var util = require('util');
var EventEmitter = require('events').EventEmitter;
var calculateResults = require('./calculate-results');

function State(){
    this.questions = [];
    this.currentQuestion = null;
    this.isFinished = false;
    this.score = 0;
    EventEmitter.call(this);
}
util.inherits(State, EventEmitter);

State.prototype.set = function(propertyName, value) {
    this[propertyName] = value;
    this.emit("change");
};

State.prototype.calculateResult = function (force){
    force ? this.emit("forceCalculate") : this.emit("calculate");
};

State.prototype.finish = function(questions, force){
    this.score = calculateResults(questions, force);
    if(this.score !== null) {
        this.isFinished = true;
        this.emit("finish");
    }
};

var state = new State();

module.exports = state;