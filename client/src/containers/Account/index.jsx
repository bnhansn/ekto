import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchAccount } from './actions';
import React, { Component, PropTypes } from 'react';

class Account extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchAccount: PropTypes.func.isRequired,
    finishedLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchAccount(this.props.params.id);
  }

  renderAccount() {
    const { account } = this.props;
    if (isEmpty(account)) { return false; }

    return (
      <div>{account.attributes.name}</div>
    );
  }

  render() {
    return (
      <div className="container">
        {::this.renderAccount()}
      </div>
    );
  }
}

export default connect(
  state => ({
    account: state.account.account,
    isLoading: state.account.isLoading,
    finishedLoading: state.accounts.finishedLoading,
  }),
  { fetchAccount }
)(Account);
