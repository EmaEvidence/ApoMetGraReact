import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class Login extends Component {

  login = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, (error) => {
      if (!error) {
        this.props.client.resetStore();
      }
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <div>
          <input type="email" placeholder="Email"
          ref={(input) => { this.email = input}}
        />
        </div>
        <div>
          <input type="password" placeholder="Password"
          ref={(input) => { this.password = input}}
        />
        </div>
        <div>
          <button type="submit" className="btn btn-secondary">Login</button>
        </div>
      </form>
    )
  }
}

export default Login;