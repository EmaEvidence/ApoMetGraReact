import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

class GoalForm extends Component {
  state = {
    error: null,
  }
  submitForm = () => {
    this.props.createGoal({
      variables: {
        name: this.name.value,
        resolutionId: this.props.resolutionId
      }
    }).then((data) => {
      this.name.value = '';
    }).catch((error) => {
      this.setState({
        error: error.message,
      });
    });
  };

  render() {
    return (
      <div className="goal-form">
        {
          this.state.error && <p>{ this.state.error}</p>
        }
        <input
          type="text" placeholder="Type your Goal"
          ref={(input) => { this.name = input}}
        />
        <button onClick={this.submitForm} class="btn btn-secondary">Submit</button>
      </div>

    )
  }
}

export default graphql(createGoal, {
  name: "createGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(GoalForm);
