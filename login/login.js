var React = require('react');
var bcrypt = require('bcrypt-nodejs');
var Landing = require('../landing/landing.react.js');


/*function getJSON(cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(xhr.readyState != 4) return;
        var users = JSON.parse(this.response);
        cb(users)
    };
    xhr.send(null);
}

function doLogin(username){
    getJSON(onUsersReceived);

    function onUsersReceived(users){
        var logedUser = isRegistered(username, users);
        if (logedUser){
            React.unmountComponentAtNode(document.querySelector('.login-container'));
            React.render(<Landing />, document.querySelector('.app'));

//            startQuiz(logedUser);
        } else {
            alert("You need to register first");
        }
    }

    function isRegistered(username, users){
        var registeredUser;
        users.forEach(function (user){
            if (user.username === username) {
                registeredUser = user;
            }
        });
        return registeredUser;
    }
}*/

function getUser(username, cb){
    var params = 'username=' + encodeURIComponent(username);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(xhr.readyState != 4 && http.status != 200) return;
        var res = JSON.parse(this.response);
        cb(res);
    };
    xhr.send(params);
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

/*
 var existingName =  localStorage.getItem('username');
 displayLoginBox();

 function submitUsername(){
 var userName = document.querySelector('#username');
 localStorage.setItem('username', userName.value);
 doLogin();
 //    var existingName =  localStorage.getItem('username');
 //    alert(existingName);
 }

 function doLogin(){
 displayWelcomeMessage(existingName);
 getJSON(function(questions){
 selectQuestionsForTest(questions);
 displayTestForm(container, questionsForTest, curQuestion);
 });
 }

 function displayWelcomeMessage(username){
 var welcome = document.createElement('div');
 welcome.classList.add('welcome');
 welcome.textContent = "Welcome, " + username + ".";
 document.body.insertBefore(welcome, container);
 }

 function displayLoginBox(){
 if(!existingName) {
 var loginBox = document.createElement('div');
 loginBox.classList.add('loginBox');
 var fragment = document.createDocumentFragment();
 var form = document.createElement('form');


 //    var userNameLabel = document.createElement('label');
 //    userNameLabel.textContent = "Username";
 //    setAttributes(userNameLabel, {
 //        'for': 'username'
 //    })

 var userNameField = document.createElement('input');
 //    userNameField.textContent = "User name";
 //    userNameField.classList.add('username');
 setAttributes(userNameField, {
 'type': 'text',
 'id': 'username',
 'placeholder': "Username"
 });

 //    var passwordLabel = document.createElement('p');
 //    passwordLabel.textContent = "Password";
 //    var password = document.createElement('input');
 //    password.setAttribute('type', 'password');

 var submit = document.createElement('button');
 //    submit.setAttribute('type', 'button');
 submit.textContent = "login";
 submit.setAttribute('id', 'submit');
 submit.addEventListener('click', function () {
 submitUsername();
 });

 //    form.appendChild(userNameLabel);
 form.appendChild(userNameField);
 //    form.appendChild(passwordLabel);
 //    form.appendChild(password);
 form.appendChild(submit);
 fragment.appendChild(form);
 loginBox.appendChild(fragment);
 document.body.appendChild(loginBox);
 }
 else{
 doLogin();
 }
 }

 */