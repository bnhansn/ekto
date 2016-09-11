import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

export function redirectAuthenticated(WrappedComponent) {
  class RedirectWrapper extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      isAuthenticating: PropTypes.bool.isRequired,
    };

    static contextTypes = {
      router: PropTypes.object,
    };

    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push('/accounts');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenticated) {
        this.context.router.push('/accounts');
      }
    }

    render() {
      const { isAuthenticating } = this.props;

      if (isAuthenticating) {
        return <div />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    state => ({
      isAuthenticated: state.app.isAuthenticated,
      isAuthenticating: state.app.isAuthenticating,
    }),
    null
  )(RedirectWrapper);
}
