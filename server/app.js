var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./models/user');
var Question = require('./models/question');
var Session = require('./models/session');
var db = require('./models/db');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'SECRET',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 24*60000,
        httpOnly: false
    },
    store: new MongoStore({ mongooseConnection: db })
}));

//app.use('/', routes);

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ '_id': username },{ 'password': 1 }, function(err, user){
        if(err){ console.log(err) }
        if(!user.validPassword(user, password)) { return 'invalid username or password' }
        Session.startSession(user._id, res);
    });
});

app.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var newUser = new User({
        '_id': username,
        'password': password
    });
    newUser.save(function (err, inserted) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            Session.startSession(inserted._id, res);
        }
    })
});

app.get('/logout', function (req, res) {
    if(req.cookies.session){
        Session.remove({'_id': req.cookies.session}, function(err){
            if (err) {
                console.log(err)
            }
        })
    }
    res.clearCookie('session');
    res.redirect('/');
});

app.post('/result', isLoggedIn, function(req, res) {
    if (req.username) {
        User.update({'_id': req.username}, {$push: {'results': result}}, function (err, inserted) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("results were saved");
                res.send(inserted);
            }
        });
    }
});

app.get('/questions', function (req, res) {
    Question.find({}, function (err, docs) {
        if (err) {
            console.log("error while receiving questions: " + err)
        } else {
            res.send(docs);
        }
    })
});

app.get('/test', isLoggedIn);

app.get('/', isLoggedIn, function(req, res){
    console.log("test");
    res.sendFile('index.html', {root: path.join(__dirname, '../')});
});

function isLoggedIn(req, res, next) {
    if(req.cookies.session){
        Session.findOne({'_id': req.cookies.session}, function(err, session){
            if (err) {
                console.log(err)
            }
            req.username = session.username;
            next()
        })
    }
    console.log("not logged in user");
    next();
//    res.redirect('/login')
}

//app.listen(3000);

module.exports = app;

