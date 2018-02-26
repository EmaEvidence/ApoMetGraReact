import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';

import RegistrationForm from './RegistrationForm';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './Resolution/Goal';

import './style/app';

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
      <div className="wrapper">
        {
            this.props.data.user._id && <ResolutionForm client={this.props.client} />
        }
        <RegistrationForm user={this.props.data.user} client={this.props.client} />
        <div className="resolution-container">
          {
            this.props.data.user._id && (
              <ul className="resolution-list">
                {
                  this.props.data.resolutions.map((resolution) => (
                    <li key={resolution._id} className="resolution-card">
                      <div className="resolution-name">
                        <span style={{
                          textDecoration: resolution.completed ? 'line-through' : 'none',
                        }}>
                          {resolution.name}
                        </span>
                        <span className="resolution-control">
                          <button className="btn btn-info" onClick={() => {this.editResolution(resolution._id)}}>!</button>
                          <button className="btn btn-info" onClick={() => {this.deleteResolution(resolution._id)}}>X</button>
                        </span>
                      </div>
                      <ul className="goals">
                        {
                          resolution.goals.map((goal) => (
                            <Goal goal={goal} key={goal._id} />
                          ))
                        }
                      </ul>
                      <div>
                        <GoalForm resolutionId={resolution._id} />
                      </div>
                    </li>
                  ))
                }
            </ul>
          )
          }
        </div>
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
