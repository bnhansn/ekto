import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Topnav from '../../components/Topnav';
import Callout from '../../components/Callout';
import { fetchAccounts, createAccount } from './actions';
import NewAccountForm from '../../components/NewAccountForm';
import { colors } from '../../styles/settings';

class AccountIndex extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    createAccount: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    finishedLoading: PropTypes.bool.isRequired,
    isSavingNewAccount: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      accountFormOpen: false,
    };
  }

  componentWillMount() {
    this.props.fetchAccounts();
  }

  handleNewAccountSubmit = (data) => this.props.createAccount(data);

  renderAccounts() {
    const { accounts } = this.props;

    if (!accounts.length) { return null; }

    return accounts.map(account =>
      <Link
        key={account.id}
        to={`/accounts/${account.slug}`}
        className="list-group-item list-group-item-action"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            marginRight: '1rem',
            color: colors.primary,
            background: 'rgba(0,0,0,.05)',
            borderRadius: '3px',
          }}
        >
          {account.name.charAt(0)}
        </div>
        <span>{account.name}</span>
      </Link>
    );
  }

  render() {
    const { accountFormOpen } = this.state;
    const { accounts, isLoading, finishedLoading, isSavingNewAccount } = this.props;
    const noAccounts = !accounts.length && finishedLoading;

    return (
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <Topnav header="Accounts" />
        </div>
        <div className="container">
          {isLoading && !accounts.length && <div className="loader" />}
          {noAccounts &&
            <Callout>
              <p>Create an account with the icon below to get started</p>
            </Callout>
          }
          <div className="list-group" style={{ marginBottom: '1rem' }}>
            {this.renderAccounts()}
          </div>
          <button
            className="btn btn-secondary" style={{ marginBottom: '1rem' }}
            onClick={() => this.setState({ accountFormOpen: !accountFormOpen })}
          >
            {!accountFormOpen && <span style={{ fontSize: '20px', lineHeight: '1' }}>&#43;</span>}
            {accountFormOpen && <span style={{ fontSize: '20px', lineHeight: '1' }}>&#8722;</span>}
          </button>
          {accountFormOpen &&
            <NewAccountForm
              isSavingNewAccount={isSavingNewAccount}
              onSubmit={this.handleNewAccountSubmit}
            />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts,
    isLoading: state.accounts.isLoading,
    finishedLoading: state.accounts.finishedLoading,
    isSavingNewAccount: state.accounts.isSavingNewAccount,
  }),
  { fetchAccounts, createAccount }
)(AccountIndex);
