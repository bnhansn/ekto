import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { reduxForm, Field } from 'redux-form';
import { debouncedHandler } from '../../utils';
import UserSearchResult from '../UserSearchResult';

class InviteUserForm extends Component {
  static propTypes = {
    teamIds: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    searchedUsers: PropTypes.array.isRequired,
    onNewUserInvite: PropTypes.func.isRequired,
    isSearchingUsers: PropTypes.bool.isRequired,
    isInvitingNewUser: PropTypes.bool.isRequired,
    onExistingUserInvite: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      hasSearched: false,
    };
    this.handleSearch = debouncedHandler(this.handleSearch, 500);
  }

  @autobind
  handleSearch(e) {
    this.setState({
      search: e.target.value,
    }, () => this.handleSearchChange());
  }

  handleSearchChange() {
    const { search } = this.state;
    this.setState({ hasSearched: search.length > 1 });
    this.props.onSearch(search);
  }

  @autobind
  handleSubmit(data) {
    this.props.onNewUserInvite(data);
  }

  renderSearchResults() {
    const { searchedUsers, teamIds } = this.props;
    if (!searchedUsers.length) { return null; }

    return searchedUsers.map(user =>
      <UserSearchResult
        user={user}
        key={user.id}
        teamIds={teamIds}
        onUserInvite={this.props.onExistingUserInvite}
      />
    );
  }

  render() {
    const {
      isInvalid,
      handleSubmit,
      searchedUsers,
      isSearchingUsers,
      isInvitingNewUser,
    } = this.props;
    const { hasSearched } = this.state;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="card">
          <div className="card-header">
            Add user
          </div>
          <div className="card-block">
            <p>
              Search for a user in Ekto by name or email, or enter an email
              address to invite someone new.
            </p>
            <Field
              type="text"
              name="email"
              component="input"
              style={{ maxWidth: '250px' }}
              className="form-control m-b-1"
              onKeyUp={e => this.handleSearch(e)}
            />
            {isSearchingUsers && <div className="loader" />}
            {this.renderSearchResults()}
            {hasSearched && !searchedUsers.length &&
              <div>
                <p>
                  Enter the user's name and we will send an email invite
                  to <b>{this.state.search}</b>. Once they sign up, they will
                  have access to this account.
                </p>
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <Field
                    type="text"
                    name="name"
                    component="input"
                    style={{ maxWidth: '250px' }}
                    className="form-control m-b-1"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isInvalid || isInvitingNewUser}
                >
                  {isInvitingNewUser ? 'Sending...' : 'Send'}
                </button>
              </div>
            }
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'inviteUser',
  validate,
})(InviteUserForm);
