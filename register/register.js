var React = require('react');
var bcrypt = require('bcrypt-nodejs');
var Landing = require('../landing/landing.react');

function saveUserToDB(email, password, cb){
    var salt = bcrypt.genSaltSync();
    var password_hash = bcrypt.hashSync(password, salt);

    var params = 'username=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password_hash);

    fetch('/register', {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: params
    })
        .then(function(res){
            return res.json()
        }).then(function(json){
            cb(json)
        }).catch(function(ex){
            console.log("Error: ", ex)
        });
}

function handleRegisterRequest(email, password){
    saveUserToDB(email, password, function(res){
        if (res.name == 'MongoError') {
            alert("Error: " + res);
            if (res.code == '11000') {
                alert('username is in use')
            }
        } else {
                React.unmountComponentAtNode(document.querySelector('.registration'));
                React.render(<Landing />, document.querySelector('.app'));
        }
    })
}

module.exports = handleRegisterRequest;