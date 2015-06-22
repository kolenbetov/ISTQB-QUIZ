var React = require('react');
var makeFormMixin = require('../shared/make-form.react');
var addUser = require('./register');

var registrationFormMixin = makeFormMixin([
    "email",
    "password",
    "verify"
]);

module.exports = React.createClass({
    mixins: [registrationFormMixin],

    render: function(){
        return (
            <div>
                <form>
                    <h1> Registration Form </h1>
                    <div>
                        <input type="text" placeholder="Email" onChange={this.onEmailChange}></input>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.onPasswordChange}></input>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.onVerifyChange}></input>
                    </div>
                    <div>
                        <input type="button" value="Submit" onClick={this.onSubmit}></input>
                    </div>

                </form>
            </div>
        )
    },

    onSubmit: function(){
        var email = this.state.email;
        var password = this.state.password;
        addUser(email, password);
    },

    componentWillUnmount: function(){
        document.body.removeChild(document.querySelector('.registration'));
    }
});