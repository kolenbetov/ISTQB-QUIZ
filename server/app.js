var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(express);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./models/user');
var Question = require('./models/question');
var db = require('./models/db');

var app = express();

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
/*app.use(express.session({
 secret: 'quuuiiiz',
 store: new MongoStore({
 MongooseConnection : db
 })
 }));*/

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../') });
});

app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({'_id':username}, function (err, user){
    if (err) {
      console.log("error" + err);
      res.send(err);
      return err;
    } else {
      res.send(user);
    }
  })
});

//TODO change to app.get('/questions')
app.post('/start', function(req, res){
  Question.find({}, function(err, docs){
    if (err) {
      console.log("error while receiving questions: " + err)
    } else {
      res.send(docs);
    }
  })
});

app.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({
    '_id': username,
    'password': password
  });
  newUser.save(function(err, inserted){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(inserted);
    }
  })
});

/*app.get('/logout', function(req,res) {
 delete req.session.user_id;
 req.session.destroy();
 res.redirect('/login');
 });*/

module.exports = app;