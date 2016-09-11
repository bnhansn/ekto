import React, { Component, PropTypes } from 'react';
import includes from 'lodash/includes';
import { css, StyleSheet } from 'aphrodite';
import Gravatar from '../Gravatar';

const styles = StyleSheet.create({
  userSearchResult: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
  },

  currentMember: {
    opacity: '.5',
  },
});

class UserSearchResult extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    teamIds: PropTypes.array.isRequired,
    onUserInvite: PropTypes.func.isRequired,
  };

  handleUserInvite = () => this.props.onUserInvite({ userId: this.props.user.id });

  render() {
    const { user, teamIds } = this.props;
    const isCurrentMember = includes(teamIds, user.id);
    const className = css(
      styles.userSearchResult,
      isCurrentMember && styles.currentMember,
    );

    return (
      <div key={user.id} className={className}>
        <Gravatar email={user.email || ''} size={30} className="img-rounded" />
        <span style={{ marginRight: '4px', marginLeft: '10px' }}>{user.name}</span>
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
