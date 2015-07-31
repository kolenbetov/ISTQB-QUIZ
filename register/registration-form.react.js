var React = require('react');
var makeFormMixin = require('../shared/make-form.react');
var addUser = require('./register');

var registrationFormMixin = makeFormMixin([
    "email",
    "password",
    "confirm"
]);

module.exports = React.createClass({
    getInitialState: function(){
        return {
            usernameError: {display: 'none'},
            passwordError: {display: 'none'},
            confirmationError: {display: 'none'}
        }
    },

    mixins: [registrationFormMixin],

    render: function(){
        return (
            <div>
                <form>
                    <h1> Registration Form </h1>
                    <div>
                        <input type="text" placeholder="Email" onChange={this.onEmailChange} onBlur={this.validateEmail} autofocus></input>
                        <span className="error-msg" style={this.state.usernameError}>please enter valid email</span>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.onPasswordChange} onBlur={this.validatePassword}></input>
                        <span className="error-msg" style={this.state.passwordError}>password must be from 6 to 21 characters long</span>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.onConfirmChange} onBlur={this.validatePasswordConfirmation}></input>
                        <span className="error-msg"style={this.state.confirmationError}>entered passwords do not match</span>
                    </div>
                    <div>
                        <input type="button" value="Submit" onClick={this.onSubmit}></input>
                    </div>

                </form>
            </div>
        )
    },

    validateEmail: function(){
        var usernameRegEx = /^([\w!.%+\-])+@([\w\-])+(?:\.[\w\-]+)+$/;
        if(!usernameRegEx.test(this.state.email)){
            this.state.usernameError = {display: 'block'};
            this.forceUpdate();
            return false;
        } else {
            this.state.usernameError = {display: 'none'};
            this.forceUpdate();
            return true;
        }
    },

    validatePassword: function(){
        var passwordRegEx = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
        if(!passwordRegEx.test(this.state.password)){
            this.state.passwordError = {display: 'block'};
            this.forceUpdate();
            return false;
        } else {
            this.state.passwordError = {display: 'none'};
            this.forceUpdate();
            return true;
        }
    },

    validatePasswordConfirmation: function(){
        if(this.state.password !== this.state.confirm){
            this.state.confirmationError = {display: 'block'};
            this.forceUpdate();
            return false;
        } else {
            this.state.confirmationError = {display: 'none'};
            this.forceUpdate();
            return true;
        }
    },

    onSubmit: function(){
        var email = this.state.email;
        var password = this.state.password;
        if(this.validateEmail() && this.validatePassword() && this.validatePasswordConfirmation()){
            addUser(email, password);
        }
    },

    componentWillUnmount: function(){
        document.body.removeChild(document.querySelector('.registration'));
    }
});