import React, { Component } from 'react';

import RegisterUser from './RegisterUser';
import Login from './Login';

class RegistrationForm extends Component {
  state = {
    login: true,
  }
  render() {
    return (
      <div className="form-container">
        { (!this.props.user._id) && (
            <div className="reg-form-container">
              {
                (this.state.login) ? 
                <Login client={this.props.client} /> :
                <RegisterUser client={this.props.client} />
              }
              <button onClick={() => { this.setState({
                login: !this.state.login
              })}} className="btn btn-info">
                {
                  (this.state.login) ? 
                  'Sign Up' :
                  'Sign In'
                }
              </button>
            </div>
        )}
      </div>
    );
  }
}

export default RegistrationForm;