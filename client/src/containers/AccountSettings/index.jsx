import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import AccountSettingsForm from '../../components/AccountSettingsForm';
import AccountDomainsList from '../../components/AccountDomainsList';
import { updateAccount, fetchDomains, createDomain, deleteDomain } from './actions';

class AccountSettings extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    domains: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    createDomain: PropTypes.func.isRequired,
    fetchDomains: PropTypes.func.isRequired,
    deleteDomain: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    isCreatingDomain: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchDomains(this.props.account.id);
  }

  handleSubmit(data) {
    this.props.updateAccount(this.props.account.id, data);
  }

  handleNewDomainSubmit(data) {
    this.props.createDomain(this.props.account.id, data);
  }

  handleDomainDelete(id) {
    this.props.deleteDomain(this.props.account.id, id);
  }

  render() {
    const { isSubmitting, initialValues, domains, isCreatingDomain } = this.props;

    return (
      <div className="container">
        <AccountSettingsForm
          enableReinitialize
          isSubmitting={isSubmitting}
          initialValues={initialValues}
          onSubmit={::this.handleSubmit}
        />
        <AccountDomainsList
          domains={domains}
          isCreatingDomain={isCreatingDomain}
          onDomainDelete={::this.handleDomainDelete}
          onNewDomainSubmit={::this.handleNewDomainSubmit}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    account: state.account.account,
    domains: state.accountSettings.domains,
    isSubmitting: state.accountSettings.isSubmitting,
    initialValues: state.account.account.attributes,
    isCreatingDomain: state.accountSettings.isCreatingDomain,
  }),
  { updateAccount, fetchDomains, createDomain, deleteDomain }
)(AccountSettings);
