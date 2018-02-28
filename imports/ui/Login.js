import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Accounts } from 'meteor/accounts-base';
import Loader from './Loader';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoader: false,
    }
  }

  login = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, (error) => {
      if (!error) {
        return this.props.client.resetStore();
      } else if (error.reason === 'Incorrect password' || 
      error.reason === 'User not found') {
        this.setState({
          showLoader: false,
        });
        toast.error('User not found');
      }
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
          <Loader showLoader={this.state.showLoader} />
          <ToastContainer />
          <button
            type="submit"
            onClick={() => this.setState({ showLoader: true})}
            className="btn btn-secondary"
          >
            Sign In
          </button>
        </div>
      </form>
    )
  }
}

export default Login;
