var React = require('react');
var bcrypt = require('bcrypt-nodejs');
var Landing = require('../landing/landing.react');

function saveUserToDB(email, password, cb){
    var salt = bcrypt.genSaltSync();
    var password_hash = bcrypt.hashSync(password, salt);

    var params = 'username=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password_hash);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/register', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if (xhr.readyState != 4 && http.status != 200) return;
        var res = JSON.parse(this.response);
        cb(res);
    };
    xhr.send(params);
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