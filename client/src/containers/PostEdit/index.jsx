import {
  fetchPost,
  updatePost,
  deletePost,
} from './actions';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import Editor from '../../components/Editor';
import React, { Component, PropTypes } from 'react';

class PostEdit extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    fetchPost: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { params: { accountSlug, id } } = this.props;
    this.props.fetchPost(accountSlug, id);
  }

  handleSubmit(data) {
    const { params: { accountSlug, id } } = this.props;
    this.props.updatePost(accountSlug, id, data);
  }

  handleDelete() {
    const { params: { accountSlug, id } } = this.props;
    this.props.deletePost(accountSlug, id);
  }

  render() {
    const { post, isLoading, isSaving } = this.props;

    if (isLoading || isEmpty(post)) {
      return <div className="loader"></div>;
    }

    return (
      <div className="container">
        <Editor
          isSaving={isSaving}
          initialValues={post}
          onSubmit={::this.handleSubmit}
          onDelete={::this.handleDelete}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.post,
    isSaving: state.post.isSaving,
    isLoading: state.post.isLoading,
  }),
  { fetchPost, updatePost, deletePost }
)(PostEdit);
