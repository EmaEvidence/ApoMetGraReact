import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { ToastContainer, toast } from 'react-toastify';

import RegistrationForm from './RegistrationForm';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './Resolution/Goal';
import EditResolution from './EditResolution';

import './style/app';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
    }
  }
  deleteResolution(id) {
    this.props.deleteResolution({
      variables: {
        id
      }
    }).then(() => {
      toast.info('Resolution Deleted');
    })
    .catch((error) => {
      toast.error(error.reason);
    });
  };
  showEdit(id, name) {
    this.setState({
      id,
      name
    });
  }

  render() {
    if (this.props.data.loading) return null;
    return (
      <div className="wrapper">
        <EditResolution id={this.state.id} resolution={this.state.name} />
        <ToastContainer />
        {
            this.props.data.user._id && <ResolutionForm client={this.props.client} />
        }
        <RegistrationForm user={this.props.data.user} client={this.props.client} />
        <div className="resolution-container">
          {
            (this.props.data.resolutions.length === 0 && this.props.data.user._id) && (
              <div className="no-resolution-wrapper">
                <b>No resolution yet</b>
              </div>
            )
          }
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
                          <button
                            className=""
                            onClick={() => {this.showEdit(resolution._id, resolution.name)}}
                            data-toggle="modal"
                            data-target="#editModal"
                          >
                            <img 
                              src="http://res.cloudinary.com/damc3mj5u/image/upload/v1520250033/edit_grey_192x192_ujjidx.png"
                            />
                          </button>
                          <button className="" onClick={() => {this.deleteResolution(resolution._id)}}>
                            <img 
                              src="http://res.cloudinary.com/damc3mj5u/image/upload/v1520250033/delete_grey_192x192_bhnl3p.png"
                            />
                          </button>
                        </span>
                      </div>
                      <ul className="goals">
                        {
                          resolution.goals.length === 0 && (<b> No Goal added </b>)
                        }
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
        <div className="footer">
          &copy; Evidence { new Date().getFullYear() }
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

const deleteResolution = gql `
  mutation deleteResolution($id: String!) {
    deleteResolution(_id: $id) {
      _id
    }
  }
`;

export default compose(graphql(hiQuery), graphql(deleteResolution, {
  name: "deleteResolution",
  options: {
    refetchQueries: ["Resolutions"]
  }
}))(withApollo(App));
