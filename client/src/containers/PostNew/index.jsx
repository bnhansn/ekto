import { connect } from 'react-redux';
import { createPost } from './actions';
import Editor from '../../components/Editor';
import React, { Component, PropTypes } from 'react';

class PostEdit extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    this.props.createPost(this.props.params.accountSlug, data);
  }

  render() {
    const { isSaving } = this.props;

    return (
      <div className="container">
        <Editor
          isSaving={isSaving}
          onSubmit={::this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    isSaving: state.postNew.isSaving,
  }),
  { createPost }
)(PostEdit);
