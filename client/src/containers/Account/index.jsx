import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchAccount } from './actions';
import React, { Component, PropTypes } from 'react';
import AccountTabs from '../../components/AccountTabs';
import Topnav from '../../components/Topnav';

class Account extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchAccount: PropTypes.func.isRequired,
    finishedLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchAccount(this.props.params.accountSlug);
  }

  render() {
    const { params: { accountSlug }, account, children } = this.props;
    if (isEmpty(account)) {
      return <div className="container">Loading...</div>;
    }

    return (
      <div>
        <Topnav
          header="Accounts"
          headerRoute="/accounts"
          subheader={account.attributes.name}
        />
        <AccountTabs accountSlug={accountSlug} />
        {children}
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
