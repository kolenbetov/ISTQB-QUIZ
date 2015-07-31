var mongoose = require('mongoose');
var config = require('../config');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
	console.log('connection to db established');
});

mongoose.connect('mongodb://' + config.dbAdmin + ':' + config.dbPass + config.dbHost);

module.exports = db;