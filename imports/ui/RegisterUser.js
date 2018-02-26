import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class RegisterUser extends Component {

  registerUser = (event) => {
    event.preventDefault();  
    Accounts.createUser({
      email: this.email.value,
      password: this.password.value,
    }, (error) => {
      if (!error) {
        this.props.client.resetStore();
      }
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.registerUser}>
        <div>
          <input type="email"
            ref={(input) => { this.email = input}}
            placeholder="Email"
          />
        </div>
        <div>
          <input type="password"
            placeholder="Password"
            ref={(input) => this.password = input}
          />
        </div>
        <div>
          <button type="submit">Register User</button>
        </div>
      </form>
    )
  }
}

export default RegisterUser;