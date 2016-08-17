import { connect } from 'react-redux';
import { createPost } from './actions';
import Editor from '../../components/Editor';
import React, { Component, PropTypes } from 'react';

class PostEdit extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
    createPost: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    this.props.createPost(this.props.params.accountSlug, data);
  }

  render() {
    const { user, team, account, isSaving } = this.props;

    return (
      <div className="container">
        <Editor
          user={user}
          team={team}
          account={account}
          isSaving={isSaving}
          onSubmit={::this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    team: state.account.team,
    account: state.account.account,
    isSaving: state.postNew.isSaving,
  }),
  { createPost }
)(PostEdit);
