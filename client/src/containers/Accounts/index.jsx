import { connect } from 'react-redux';
import { fetchAccounts } from './actions';
import React, { Component, PropTypes } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';

class Accounts extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    finishedLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchAccounts();
  }

  renderAccounts() {
    const { accounts } = this.props;

    if (!accounts.length) { return null; }

    return accounts.map(account =>
      <li
        key={account.id}
        className="list-group-item"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <span>{account.attributes.name}</span>
        <i className="icon icon-arrow-right2"></i>
      </li>
    );
  }

  render() {
    const { accounts, isLoading, finishedLoading } = this.props;
    const noAccounts = !accounts.length && finishedLoading;

    return (
      <div className="container">
        <DashboardNavbar className="m-b-2" />
        <div>{isLoading && 'Loading'}</div>
        <div>{noAccounts && 'No accounts'}</div>
        <ul className="list-group">
          {this.renderAccounts()}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts,
    isLoading: state.accounts.isLoading,
    finishedLoading: state.accounts.finishedLoading,
  }),
  { fetchAccounts }
)(Accounts);
