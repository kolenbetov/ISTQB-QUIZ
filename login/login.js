var React = require('react');
var bcrypt = require('bcrypt-nodejs');
var Landing = require('../landing/landing.react.js');

function getUser(username, password, cb){
    var params = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    fetch('/login', {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: params
    })
        .then(function(res){
            return res.json();
        }).then(function(json) {
            cb(json);
        }).catch(function(ex){
            console.log('Error: ', ex);
        });
}

function handleLoginRequest(username, password){
    getUser(username, password, function(res){
        if (res.name === 'MongoError'){
            alert(res);
        } else {
            alert(res);
//            if (isValidPassword(res, password)){
//                document.cookie = "user=" + username;
                React.unmountComponentAtNode(document.querySelector('.login-container'));
                React.render(<Landing />, document.querySelector('.app'));
                }
        });
//    })
}

function isValidPassword(user, password){
    var result = bcrypt.compareSync(password, user.password);
    return result;
}

module.exports = handleLoginRequest;