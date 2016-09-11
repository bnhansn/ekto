import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

export function authenticate(WrappedComponent) {
  class AuthenticationWrapper extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      isAuthenticating: PropTypes.bool.isRequired,
    };

    static contextTypes = {
      router: PropTypes.object,
    };

    componentWillMount() {
      if (!this.props.isAuthenticating && !this.props.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isAuthenticating && !nextProps.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      const { isAuthenticating } = this.props;
      if (isAuthenticating) { return null; }

      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    state => ({
      isAuthenticated: state.app.isAuthenticated,
      isAuthenticating: state.app.isAuthenticating,
    }),
    null
  )(AuthenticationWrapper);
}
