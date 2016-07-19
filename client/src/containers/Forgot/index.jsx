import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import ForgotForm from '../../components/ForgotForm';
import { forgotPassword } from './actions';

class ForgotContainer extends Component {
  static propTypes = {
    replace: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    forgotPassword: PropTypes.func.isRequired,
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
  (state, ownProps) => ({
    isSubmitting: state.forgot.isSubmitting,
    isAuthenticated: state.app.isAuthenticated,
    redirect: ownProps.location.query.redirect || '/',
  }),
  { forgotPassword, replace: routerActions.replace }
)(ForgotContainer);
