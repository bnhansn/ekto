import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import Topnav from '../../components/Topnav';
import React, { Component, PropTypes } from 'react';
import AccountTabs from '../../components/AccountTabs';
import { fetchAccount, fetchTeam, fetchDomains } from './actions';

class Account extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchAccount: PropTypes.func.isRequired,
    fetchDomains: PropTypes.func.isRequired,
    fetchTeam: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.fetchAccountData(this.props.params.accountSlug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.accountSlug !== this.props.params.accountSlug) {
      this.fetchAccountData(nextProps.params.accountSlug);
    }
  }

  fetchAccountData(accountSlug) {
    this.props.fetchAccount(accountSlug);
    this.props.fetchTeam(accountSlug);
    this.props.fetchDomains(accountSlug);
  }

  render() {
    const { account, children, isLoading } = this.props;
    if (isLoading) {
      return <div className="loader"></div>;
    }

    if (isEmpty(account)) {
      return null;
    }

    return (
      <div>
        <Topnav
          header="Accounts"
          headerRoute="/accounts"
          subheader={account.name}
        />
        <AccountTabs account={account} />
        {children}
      </div>
    );
  }
}

export default connect(
  state => ({
    account: state.account.account,
    isLoading: state.account.isLoading,
  }),
  { fetchAccount, fetchTeam, fetchDomains }
)(Account);
