import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  state = {
    error: null,
  }
  submitForm = () => {
    this.props.createResolution({
      variables: {
        name: this.name.value
      }
    }).then((data) => {
      this.name.value = '';
    }).catch((error) => {
      this.setState({
        error: error.message
      });
    });
  };

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light resolution-form-container">
        <a className="navbar-brand" href="#"><h1>Resolutions</h1></a>
        {
          this.state.error && <p>{this.state.error}</p>
        }
        <input
          type="text" placeholder="Type your Resolution"
          ref={(input) => { this.name = input}}
        />
        <button onClick={this.submitForm} className="btn btn-secondary">Submit</button>
        <button onClick={() => { 
            Meteor.logout();
            this.props.client.resetStore();
          }} className="btn btn-info logout"> LogOut 
        </button>
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
