import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';

import RegistrationForm from './RegistrationForm';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './Resolution/Goal';

class App extends Component {
  constructor(props) {
    super(props);
  }
  deleteResolution(id) {
    alert(id);
  };
  editResolution(id) {
    alert(id)
  }
  render() {
    if (this.props.data.loading) return null;
    return (
      <div>
        <RegistrationForm user={this.props.data.user} client={this.props.client} />
        {
          this.props.data.user._id && <ResolutionForm />
        }
        {
          this.props.data.user._id && (
            <ul>
              {
                this.props.data.resolutions.map((resolution) => (
                  <li key={resolution._id}>
                    <span style={{
                      textDecoration: resolution.completed ? 'line-through' : 'none',
                    }}>
                      {resolution.name}
                    </span>
                    <ul>
                      {
                        resolution.goals.map((goal) => (
                          <Goal goal={goal} key={goal._id} />
                        ))
                      }
                    </ul>
                    <b><GoalForm resolutionId={resolution._id}></GoalForm></b>
                    <button onClick={() => {this.editResolution(resolution._id)}}>!</button>
                    <button onClick={() => {this.deleteResolution(resolution._id)}}>X</button>
                  </li>
                ))
              }
          </ul>
        )
        }
      </div>
    );
  }
};

const hiQuery = gql`
query Resolutions {
  resolutions {
    _id
    name
    completed
    goals {
      _id
      name
      completed
    }
  }
  user {
    _id
  }
}
`;

export default graphql(hiQuery)(withApollo(App));
