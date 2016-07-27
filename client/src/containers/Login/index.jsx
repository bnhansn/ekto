import { login } from './actions';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import React, { Component, PropTypes } from 'react';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    this.props.login(data);
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <LoginForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
    );
  }
}

export default connect(
  state => ({
    isSubmitting: state.login.isSubmitting,
  }),
  { login }
)(Login);
