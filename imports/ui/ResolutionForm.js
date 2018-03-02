import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ToastContainer, toast } from 'react-toastify';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  submitForm = () => {
    if (this.name.value !== '' && 
    this.name.value.trim().length !== 0) {
      this.props.createResolution({
        variables: {
          name: this.name.value
        }
      }).then((data) => {
        this.name.value = '';
      }).catch((error) => {
        toast.error(error.reason);
      });
    } else {
      toast.error('Resolution can not be empty');
    }
  }

  submitFormWithEnter = (event) => {
    if(event.which === 13)
    this.submitForm();
  }

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light resolution-form-container">
        <div className="brand-container">
          <a className="navbar-brand" href="#"><h1>Resolutions</h1></a>
          <ToastContainer />
          <button onClick={() => { 
              Meteor.logout();
              this.props.client.resetStore();
            }} className="btn btn-info logout"> LogOut 
          </button>
        </div>
        <div className="resolution-form">
          <input
            type="text" placeholder="Type your Resolution"
            ref={(input) => { this.name = input}}
            onKeyUp={this.submitFormWithEnter}
          />
          <button onClick={this.submitForm} className="btn btn-secondary">Submit</button>
        </div>
      </div>

    )
  }
}

export default graphql(createResolution, {
  name: "createResolution",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(ResolutionForm);
