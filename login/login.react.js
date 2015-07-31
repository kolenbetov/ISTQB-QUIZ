var React = require('react');
var handleLoginRequest = require('./login');
var startQuiz = require('../quiz/start-quiz');
var RegistrationForm = require('../register/registration-form.react');
var makeFormMixin = require('../shared/make-form.react');

var loginFormMixin = makeFormMixin([
    "username",
    "password"
]);

function addDiv(){
    var div = document.createElement("div");
    div.setAttribute("class", "registration");
    document.body.appendChild(div);
}

module.exports = React.createClass({
    mixins: [loginFormMixin],

    render: function () {
        return (
            <div>
                <form>
                    <h1>Login Form</h1>
                    <div>
                        <input type="text" id="username" placeholder="Email" onChange={this.onUsernameChange}></input>
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Password" onChange={this.onPasswordChange}></input>
                    </div>
                    <div>
                        <input type="button" value="Login" onClick={this.onLogin}></input>
                        <a href="#" onClick={this.onGoToRegistration}>Register</a>
                        <a href="#">Forgot Password</a>
                    </div>
                    <div>
                        <input type="button" value="Just Start The Test" onClick={this.onStart}></input>
                    </div>
                </form>
            </div>
        );
    },

    onLogin: function(){
        var username = this.state.username;
        var password = this.state.password;
        handleLoginRequest(username, password);
    },

    onGoToRegistration: function(){
        addDiv();
        React.unmountComponentAtNode(document.querySelector('.login-container'));
        React.render(<RegistrationForm />, document.querySelector('.registration'));
    },

    onStart: function(){
        React.unmountComponentAtNode(document.querySelector('.login-container'));
        startQuiz();
    },

    componentWillUnmount: function(){
        document.body.removeChild(document.querySelector('.login-container'));
    }
});
