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
      <li>
        <input type="checkbox" onChange={this.toggleGoal} checked={this.props.goal.completed} />
        <span onClick={this.toggleGoal} style={{
          textDecoration: this.props.goal.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}>{this.props.goal.name}</span>
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
