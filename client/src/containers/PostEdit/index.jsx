import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { fetchPost, updatePost, deletePost } from './actions';
import Editor from '../../components/Editor';

class PostEdit extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
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

  @autobind
  handleSubmit(data) {
    const { params: { accountSlug, id } } = this.props;
    this.props.updatePost(accountSlug, id, data);
  }

  @autobind
  handleDelete() {
    const { params: { accountSlug, id } } = this.props;
    this.props.deletePost(accountSlug, id);
  }

  render() {
    const { post, user, team, isLoading, isSaving } = this.props;

    if (isLoading || isEmpty(post)) {
      return <div className="loader" />;
    }

    return (
      <div className="container">
        <Editor
          existingPost
          user={user}
          team={team}
          enableReinitialize
          isSaving={isSaving}
          initialValues={post}
          onSubmit={this.handleSubmit}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    team: state.account.team,
    post: state.postEdit.post,
    isSaving: state.postEdit.isSaving,
    isLoading: state.postEdit.isLoading,
  }),
  { fetchPost, updatePost, deletePost }
)(PostEdit);
