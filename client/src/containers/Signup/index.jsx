import { connect } from 'react-redux';
import { signup } from './actions';
import { routerActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import SignupForm from '../../components/SignupForm';

class Signup extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
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
    this.props.signup(data);
  }

  render() {
    const { isSubmitting } = this.props;

    return (
      <SignupForm isSubmitting={isSubmitting} onSubmit={::this.handleSubmit} />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    isSubmitting: state.signup.isSubmitting,
    isAuthenticated: state.app.isAuthenticated,
    redirect: ownProps.location.query.redirect || '/',
  }),
  { signup, replace: routerActions.replace }
)(Signup);
