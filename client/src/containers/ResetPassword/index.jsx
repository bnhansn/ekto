import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { resetPassword } from './actions';
import ResetPasswordForm from '../../components/ResetPasswordForm';

class ResetPassword extends Component {
  static propTypes = {
    params: PropTypes.object,
    replace: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    resetPassword: PropTypes.func.isRequired,
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
    this.props.resetPassword({
      ...data,
      token: this.props.params.token,
    });
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <ResetPasswordForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    isSubmitting: state.reset.isSubmitting,
    isAuthenticated: state.app.isAuthenticated,
    redirect: ownProps.location.query.redirect || '/',
  }),
  { resetPassword, replace: routerActions.replace }
)(ResetPassword);
