import { connect } from 'react-redux';
import { updateAccount } from './actions';
import React, { Component, PropTypes } from 'react';
import AccountSettingsForm from '../../components/AccountSettingsForm';

class AccountSettings extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    updateAccount: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    this.props.updateAccount(this.props.account.id, data);
  }

  render() {
    const { isSubmitting, initialValues } = this.props;

    return (
      <div className="container">
        <AccountSettingsForm
          enableReinitialize
          isSubmitting={isSubmitting}
          initialValues={initialValues}
          onSubmit={::this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    account: state.account.account,
    isSubmitting: state.accountSettings.isSubmitting,
    initialValues: state.account.account.attributes,
  }),
  { updateAccount }
)(AccountSettings);
