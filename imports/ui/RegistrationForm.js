import React, { Component } from 'react';

import RegisterUser from './RegisterUser';
import Login from './Login';

class RegistrationForm extends Component {
  state = {
    login: true,
  }
  render() {
    return (
      <div>
        { (this.props.user._id) ? (
            <div>
              <button onClick={() => { 
                Meteor.logout();
                this.props.client.resetStore();
              }}> LogOut </button>
            </div>
          ) : (
            <div>
              {
                (this.state.login) ? 
                <Login client={this.props.client} /> :
                <RegisterUser client={this.props.client} />
              }
              <button onClick={() => { this.setState({
                login: !this.state.login
              })}}>
                {
                  (this.state.login) ? 
                  'Register' :
                  'Login'
                }
              </button>
            </div>
        )}
      </div>
    );
  }
}

export default RegistrationForm;