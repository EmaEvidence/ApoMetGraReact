import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { cursorTo } from 'readline';

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    });
  }

  deleteGoal = (id) => {
    this.props.deleteGoal({
      variables: {
        id
      }
    });
  }

  render() {
    return (
      <li className="individual-goal">
        <label>
          <input type="checkbox" onChange={this.toggleGoal} checked={this.props.goal.completed} />
          <span className="goal-name"style={{
            textDecoration: this.props.goal.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}>{this.props.goal.name}</span>
        </label>
        <button onClick={() => { this.deleteGoal(this.props.goal._id)}}>
          <img 
            src="http://res.cloudinary.com/damc3mj5u/image/upload/v1520250033/delete_grey_192x192_bhnl3p.png"
          />
        </button>
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

const deleteGoal = gql`
  mutation deleteGoal($id: String!) {
    deleteGoal(_id: $id) {
      _id
    }
  }
`;

export default compose(
  graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
  }),
  graphql(deleteGoal, {
    name: "deleteGoal",
    options: {
      refetchQueries: ["Resolutions"]
    }
  }),
)(Goal);
