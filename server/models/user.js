var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	_id: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	results:[{
        date: Date,
        score: String,
        result : [{
            id: Number,
            text: String,
            answers: Array,
            correct: String,
            userAnswer: String
        }]
    }]
});

userSchema.methods.validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model('users', userSchema);

module.exports = User;