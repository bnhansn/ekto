import { connect } from 'react-redux';
import { forgotPassword } from './actions';
import React, { Component, PropTypes } from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

class ForgotPassword extends Component {
  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    forgotPassword: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    this.props.forgotPassword(data);
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <ForgotPasswordForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
    );
  }
}

export default connect(
  state => ({
    isSubmitting: state.forgotPassword.isSubmitting,
  }),
  { forgotPassword }
)(ForgotPassword);
