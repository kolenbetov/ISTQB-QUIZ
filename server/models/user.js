var mongoose = require('mongoose');
var db = require('./db');

var userSchema = new mongoose.Schema({
	_id: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

var User = mongoose.model('users', userSchema)	

//mongoose.connect('mongodb://admin:Testing#123@ds057538.mongolab.com:57538/istqb-quiz')

module.exports = User;