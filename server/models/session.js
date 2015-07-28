var crypto = require('crypto');
var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    username: { type: String, require: true }
});

sessionSchema.statics.generateSessionId = function(){
    var date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var session_id = crypto.createHash('sha1').update(date + random).digest('hex');
    return session_id;
};

sessionSchema.statics.startSession = function(user, res){
    var newSession = new Session({
        '_id': Session.generateSessionId(),
        'username': user
    });
    newSession.save(function(err, session) {
        if (err) {
            return err
        }
        res.cookie('session', session._id);
        return res.send({"_id": user});
    })
};

sessionSchema.statics.endSession = function(sessionId){

};



var Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;