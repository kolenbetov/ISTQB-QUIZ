var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	_id: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

var User = mongoose.model('users', userSchema)

module.exports = User;