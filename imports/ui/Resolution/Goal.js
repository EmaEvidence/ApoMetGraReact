import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { cursorTo } from 'readline';

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    });
  }
  render() {
    return (
      <li className="individual-goal">
        <label onChange={this.toggleGoal}>
          <input type="checkbox" checked={this.props.goal.completed} />
          <span className="goal-name"style={{
            textDecoration: this.props.goal.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}>{this.props.goal.name}</span>
        </label>
      </li>
    )
  }
}

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`;

export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(Goal);
