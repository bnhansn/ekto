import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { isInvalid } from 'redux-form';
import { inviteNewUser, inviteExistingUser, searchUsers, removeTeamMember } from './actions';
import InviteUserForm from '../../components/InviteUserForm';
import TeamMember from '../../components/TeamMember';

class Team extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    searchUsers: PropTypes.func.isRequired,
    inviteNewUser: PropTypes.func.isRequired,
    searchedUsers: PropTypes.array.isRequired,
    isSearchingUsers: PropTypes.bool.isRequired,
    removeTeamMember: PropTypes.func.isRequired,
    inviteFormInvalid: PropTypes.bool.isRequired,
    isInvitingNewUser: PropTypes.bool.isRequired,
    inviteExistingUser: PropTypes.func.isRequired,
    isInvitingExistingUser: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inviteFormOpen: false,
      memberIdToRemove: null,
      removeMemberModalOpen: false,
    };
  }

  handleSearch = (search) => this.props.searchUsers(search);

  handleNewUserInvite = (data) => this.props.inviteNewUser(this.props.account.id, data);

  handleExistingUserInvite = (data) => this.props.inviteExistingUser(this.props.account.id, data);

  handleMemberRemoveClick = (teamMemberId) => {
    this.setState({
      memberIdToRemove: teamMemberId,
      removeMemberModalOpen: true,
    });
  }

  handleMemberRemove = () => {
    this.props.removeTeamMember(this.props.account.id, this.state.memberIdToRemove);
    this.setState({ removeMemberModalOpen: false });
  }

  renderTeam() {
    const { user, team, account } = this.props;
    if (!team.length) { return null; }
    const ownerId = account.ownerId;

    return team.map(member =>
      <TeamMember
        key={member.id}
        ownerId={ownerId}
        teamMember={member}
        currentUserId={user.id}
        onRemoveClick={this.handleMemberRemoveClick}
      />
    );
  }

  render() {
    const { inviteFormOpen, removeMemberModalOpen } = this.state;
    const {
      user,
      team,
      account,
      searchedUsers,
      isSearchingUsers,
      isInvitingNewUser,
      inviteFormInvalid,
      isInvitingExistingUser,
    } = this.props;
    const isAccountOwner = user.id === account.ownerId;
    const teamIds = team.map(u => u.id);

    return (
      <div className="container">
        <ul className="list-group m-b-1">
          {this.renderTeam()}
        </ul>
        {isAccountOwner &&
          <button
            className="btn btn-secondary m-b-1"
            onClick={() => this.setState({ inviteFormOpen: !inviteFormOpen })}
          >
            {!inviteFormOpen && <span style={{ fontSize: '20px', lineHeight: '1' }}>&#43;</span>}
            {inviteFormOpen && <span style={{ fontSize: '20px', lineHeight: '1' }}>&#8722;</span>}
          </button>
        }
        {inviteFormOpen &&
          <InviteUserForm
            teamIds={teamIds}
            onSearch={this.handleSearch}
            searchedUsers={searchedUsers}
            isInvalid={inviteFormInvalid}
            isSearchingUsers={isSearchingUsers}
            isInvitingNewUser={isInvitingNewUser}
            isInvitingExistingUser={isInvitingExistingUser}
            onNewUserInvite={this.handleNewUserInvite}
            onExistingUserInvite={this.handleExistingUserInvite}
          />
        }
        <Modal
          className="modal"
          isOpen={removeMemberModalOpen}
          overlayClassName="modal-overlay"
          onRequestClose={() => this.setState({ removeMemberModalOpen: false })}
        >
          <div className="modal-header">
            <h6>Remove user</h6>
            <i
              className="modal-close"
              onClick={() => this.setState({ removeMemberModalOpen: false })}
            />
          </div>
          <div className="modal-content">
            <p>Are you sure you want to remove this user's account access?</p>
          </div>
          <div className="modal-footer text-xs-right">
            <div className="btn-toolbar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.setState({ removeMemberModalOpen: false })}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={this.handleMemberRemove}>
                Remove user
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    team: state.account.team,
    account: state.account.account,
    searchedUsers: state.team.searchedUsers,
    isSearchingUsers: state.team.isSearchingUsers,
    isInvitingNewUser: state.team.isInvitingNewUser,
    inviteFormInvalid: isInvalid('inviteUser')(state),
    isInvitingExistingUser: state.team.isInvitingExistingUser,
  }),
  { inviteNewUser, inviteExistingUser, searchUsers, removeTeamMember }
)(Team);
