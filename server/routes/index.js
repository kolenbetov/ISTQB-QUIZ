var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/question');
var sess;


module.exports = function(passport, session) {
    /*app.get('*', function(req, res){
     var path = url.parse(req.url).pathname;
     var markup = React.renderComponentToString(Login());
     console.log("success")
     res.send(markup);
     });*/

    router.get('/1', function (req, res) {
        req.session.cookie.path = "/1";
        printSessValue(req.session);
        res.sendFile('index.html', {root: path.join(__dirname, '../')});
    });

    router.post('/login', function(req, res) {
        printSessValue(req.session);
        passport.authenticate('local', function(err, user, info){
            if(err) {
                console.log(err);
                return err;
            }
            if (!user) { return "incorrect username or password" }
            req.logIn(user, function(err){
                if(err){
                    console.log(err);
                    return err;
                }
                return res.send(user);
            })
            printSessValue(req.session);
        })(req, res);

    });


    /*app.post('/login', function(req, res){
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
     });*/

    router.get('/questions', function (req, res) {
        Question.find({}, function (err, docs) {
            if (err) {
                console.log("error while receiving questions: " + err)
            } else {
                res.send(docs);
            }
        })
    });

    router.post('/register', function (req, res) {
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
                res.send(inserted);
            }
        })
    });

    router.post('/result', function (req, res) {
        var result = req.body;
        console.log(result);
        User.update({'_id': 'test'}, {$push: {'results': result}}, function (err, inserted) {
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

    router.get('/test', isLoggedIn)

    function isLoggedIn(req, res, next) {
        printSessValue(req.session);
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            res.redirect('/loggedin')

        // if they aren't redirect them to the home page
        res.redirect('/nosession');
    }

    return router;
};