import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { login } from './actions';
import LoginForm from '../../components/LoginForm';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  @autobind
  handleSubmit(data) {
    this.props.login(data);
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <LoginForm isSubmitting={isSubmitting} onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(
  state => ({
    isSubmitting: state.login.isSubmitting,
  }),
  { login }
)(Login);
