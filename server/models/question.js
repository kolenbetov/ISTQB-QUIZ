var mongoose = require('mongoose');
var db = require('./db');

var questionSchema = new mongoose.Schema({
	id: Number,
	text: String,
	answers: Array,
	correct: String,
	userAnswer: String
}) 

var Question = mongoose.model('questions', questionSchema);

module.exports = Question;