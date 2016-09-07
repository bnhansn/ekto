import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { createPost } from './actions';
import Editor from '../../components/Editor';

class PostEdit extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
  };

  @autobind
  handleSubmit(data) {
    this.props.createPost(this.props.params.accountSlug, data);
  }

  render() {
    const { user, team, isSaving } = this.props;

    return (
      <div className="container">
        <Editor
          user={user}
          team={team}
          isSaving={isSaving}
          onSubmit={this.handleSubmit}
          initialValues={{ authorId: user.id }}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    team: state.account.team,
    isSaving: state.postNew.isSaving,
  }),
  { createPost }
)(PostEdit);
