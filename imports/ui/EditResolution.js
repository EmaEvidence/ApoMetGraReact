import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Resolutions from '../api/Resolutions/resolutions';

class EditResolution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resolution: 'his.props.resolution',
      text: 'event.target.value'
    }
  }

  submit = (event) => {
    event.preventDefault();
    this.props.editResolution({
      variables: {
        id: this.props.id,
        name: this.name.value
      }
    }).then((success) => {
      console.log(success);
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.setState({
      resolution: this.props.resolution
    });
  }

  onChange = () => {
    this.setState({
      resolution: event.target.value,
    });
  }

  render() {
    return (
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header edit-form">
              <form onSubmit={this.submit}>
                <h5>
                  <span>Edit Resolution</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </h5>
                <div>
                  <input
                    type="text"
                    value={this.state.resolution}
                    ref={(input) => { this.name = input; }}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <button className="btn btn-secondary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const editResolution = gql`
  mutation editResolution($id: String!, $name: String!) {
    editResolution(_id: $id, name: $name) {
      _id
    }
  }
`;

export default graphql(editResolution, {
  name: "editResolution",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(EditResolution);
