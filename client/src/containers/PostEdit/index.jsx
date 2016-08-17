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
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
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
    const { post, user, team, account, isLoading, isSaving } = this.props;

    if (isLoading || isEmpty(post)) {
      return <div className="loader"></div>;
    }

    return (
      <div className="container">
        <Editor
          user={user}
          team={team}
          account={account}
          enableReinitialize
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
    user: state.app.user,
    team: state.account.team,
    post: state.postEdit.post,
    account: state.account.account,
    isSaving: state.postEdit.isSaving,
    isLoading: state.postEdit.isLoading,
  }),
  { fetchPost, updatePost, deletePost }
)(PostEdit);
