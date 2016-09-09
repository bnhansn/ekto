import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Topnav from '../../components/Topnav';
import Callout from '../../components/Callout';
import { fetchAccounts, createAccount } from './actions';
import NewAccountForm from '../../components/NewAccountForm';
import { colors } from '../../styles/variables';

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
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
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
        <div style={{ flexGrow: '1' }} />
        <i className="icon icon-arrow-right2" />
      </Link>
    );
  }

  render() {
    const { accountFormOpen } = this.state;
    const { accounts, isLoading, finishedLoading, isSavingNewAccount } = this.props;
    const noAccounts = !accounts.length && finishedLoading;

    return (
      <div>
        <Topnav header="Accounts" className="m-b-2" />
        <div className="container">
          {isLoading && !accounts.length && <div className="loader" />}
          {noAccounts &&
            <Callout klass="primary">
              <p>Create an account with the icon below to get started</p>
            </Callout>
          }
          <div className="list-group m-b-1">
            {this.renderAccounts()}
          </div>
          <button
            className="btn btn-secondary m-b-1"
            onClick={() => this.setState({ accountFormOpen: !accountFormOpen })}
          >
            <i className={`icon icon-${accountFormOpen ? 'minus3' : 'plus3'}`} />
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
