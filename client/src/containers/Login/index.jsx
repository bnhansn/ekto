import { connect } from 'react-redux';
import { login, loginAttempt } from './actions';
import { routerActions } from 'react-router-redux';
import LoginForm from '../../components/LoginForm';
import React, { Component, PropTypes } from 'react';

class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    loginAttempt: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.redirectIfLoggedIn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfLoggedIn(nextProps);
  }

  redirectIfLoggedIn(props) {
    const { isAuthenticated, replace, redirect } = props;

    if (isAuthenticated) {
      replace(redirect);
    }
  }

  handleSubmit(data) {
    this.props.loginAttempt();
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
  (state, ownProps) => ({
    isSubmitting: state.login.isSubmitting,
    isAuthenticated: state.app.isAuthenticated,
    redirect: ownProps.location.query.redirect || '/',
  }),
  { login, loginAttempt, replace: routerActions.replace }
)(LoginContainer);
