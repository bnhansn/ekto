import { connect } from 'react-redux';
import Editor from '../../components/Editor';
import { createPost, publishPost } from './actions';
import React, { Component, PropTypes } from 'react';

class PostEdit extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
    publishPost: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    this.props.createPost(this.props.params.accountSlug, data);
  }

  handlePublish(data) {
    const { params: { accountSlug, id } } = this.props;
    this.props.publishPost(accountSlug, id, data);
  }

  render() {
    const { isSaving } = this.props;

    return (
      <div className="container">
        <Editor
          isSaving={isSaving}
          onSubmit={::this.handleSubmit}
          onPublish={::this.handlePublish}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    isSaving: state.postNew.isSaving,
  }),
  { createPost, publishPost }
)(PostEdit);
