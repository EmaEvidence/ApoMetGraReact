import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ToastContainer, toast } from 'react-toastify';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

class GoalForm extends Component {
  submitForm = () => {
    if (this.name.value !== '' && 
    this.name.value.trim().length !== 0) {
      this.props.createGoal({
        variables: {
          name: this.name.value,
          resolutionId: this.props.resolutionId
        }
      }).then((data) => {
        this.name.value = '';
      }).catch((error) => {
          toast.error(error.reason);
      });
    } else {
      toast.error('Goal can not be empty');
    }
  }

  submitFormWithEnter = (event) => {
    if(event.which === 13) {
      this.submitForm();
    } 
  }

  render() {
    return (
      <div className="goal-form">
        <input
          type="text" placeholder="Type your Goal"
          ref={(input) => { this.name = input}}
          onKeyUp={this.submitFormWithEnter}
        />
        <button onClick={this.submitForm} className="btn btn-secondary">Submit</button>
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
