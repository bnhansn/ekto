import { connect } from 'react-redux';
import { forgotPassword } from './actions';
import React, { Component, PropTypes } from 'react';
import ForgotForm from '../../components/ForgotForm';

class Forgot extends Component {
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
      <ForgotForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
    );
  }
}

export default connect(
  state => ({
    isSubmitting: state.forgot.isSubmitting,
  }),
  { forgotPassword }
)(Forgot);
