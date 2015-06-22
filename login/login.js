var React = require('react');
var bcrypt = require('bcrypt-nodejs');
var Landing = require('../landing/landing.react.js');

function getUser(username, cb){
    var params = 'username=' + encodeURIComponent(username);
    fetch('/login', {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: params
    })
        .then(function(res){
            return res.json();
        }).then(function(json) {
            console.log(json);
            cb(json);
        }).catch(function(ex){
            console.log('Error: ', ex);
        });

/*
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(xhr.readyState != 4 && http.status != 200) return;
        var res = JSON.parse(this.response);
        cb(res);
    };
    xhr.send(params);
*/
}

function handleLoginRequest(username, password){
    getUser(username, function(res){
        if (res.name === 'MongoError'){
            alert(res);
        } else {
            if (isValidPassword(res, password)){
                React.unmountComponentAtNode(document.querySelector('.login-container'));
                React.render(<Landing />, document.querySelector('.app'));
            }
        }
    })
}

function isValidPassword(user, password){
    var result = bcrypt.compareSync(password, user.password);
    return result;
}

module.exports = handleLoginRequest;