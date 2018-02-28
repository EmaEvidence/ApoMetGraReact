import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';

class RegisterUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoader: false,
    }
  }

  registerUser = (event) => {
    event.preventDefault();  
    Accounts.createUser({
      email: this.email.value,
      password: this.password.value,
    }, (error) => {
      if (!error) {
        this.props.client.resetStore();
      } else {
        toast.error(error.reason);
        this.setState({
          showLoader: false,
        });
      }
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
          <Loader showLoader={this.state.showLoader} />
          <ToastContainer />
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={() => this.setState({ showLoader: true})}
          >
            Sign Up
          </button>
        </div>
      </form>
    )
  }
}

export default RegisterUser;