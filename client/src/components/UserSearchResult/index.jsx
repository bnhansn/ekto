import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import includes from 'lodash/includes';
import Gravatar from '../Gravatar';

class UserSearchResult extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    teamIds: PropTypes.array.isRequired,
    onUserInvite: PropTypes.func.isRequired,
  };

  @autobind
  handleUserInvite() {
    this.props.onUserInvite({ userId: this.props.user.id });
  }

  render() {
    const { user, teamIds } = this.props;
    const isCurrentMember = includes(teamIds, user.id);

    return (
      <div key={user.id} className={`user-search-result ${isCurrentMember && 'is-current-member'}`}>
        <Gravatar email={user.email || ''} size={30} className="img-rounded m-r-sm" />
        <span style={{ marginRight: '4px' }}>{user.name}</span>
        <span className="small text-muted">{user.email}</span>
        {isCurrentMember && <span className="small" style={{ marginLeft: '4px' }}>(joined)</span>}
        <div style={{ flexGrow: '1' }} />
        {!isCurrentMember &&
          <button
            type="button"
            onClick={this.handleUserInvite}
            className="btn btn-sm btn-primary"
          >
            Add
          </button>
        }
      </div>
    );
  }
}

export default UserSearchResult;
