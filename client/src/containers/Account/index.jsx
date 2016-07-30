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
  };

  componentWillMount() {
    this.props.fetchAccount(this.props.params.accountSlug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.accountSlug !== this.props.params.accountSlug) {
      this.props.fetchAccount(nextProps.params.accountSlug);
    }
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
          subheader={account.attributes.name}
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
  { fetchAccount }
)(Account);
