import { Link } from 'react-router';
import { connect } from 'react-redux';
import Topnav from '../../components/Topnav';
import Callout from '../../components/Callout';
import React, { Component, PropTypes } from 'react';
import { fetchAccounts, createAccount } from './actions';
import NewAccountForm from '../../components/NewAccountForm';

class Accounts extends Component {
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

  handleNewAccountSubmit(data) {
    const attrs = { data: { attributes: { ...data } } };
    this.props.createAccount(attrs);
  }

  renderAccounts() {
    const { accounts } = this.props;

    if (!accounts.length) { return null; }

    return accounts.map(account =>
      <Link
        key={account.id}
        to={`/accounts/${account.attributes.slug}`}
        className="list-group-item list-group-item-action"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className="account-icon"><i className="icon icon-earth2"></i></div>
        <span>{account.attributes.name}</span>
        <div style={{ flexGrow: '1' }}></div>
        <i className="icon icon-arrow-right2"></i>
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
          {isLoading && !accounts.length && <div className="loader"></div>}
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
            <i className={`icon icon-${accountFormOpen ? 'minus3' : 'plus3'}`}></i>
          </button>
          {accountFormOpen &&
            <NewAccountForm
              isSavingNewAccount={isSavingNewAccount}
              onSubmit={::this.handleNewAccountSubmit}
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
)(Accounts);
