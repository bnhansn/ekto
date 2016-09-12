import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Alert from '../Alert';
import { login, logout } from './actions';
import Navbar from '../../components/Navbar';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
  };

  handleLogin = (data) => this.props.login(data);

  handleLogout = () => this.props.logout();

  render() {
    const { children, user, isAuthenticated, isAuthenticating, isLoggingIn } = this.props;

    return (
      <div>
        <Alert />
        <Navbar
          user={user}
          isLoggingIn={isLoggingIn}
          onLoginSubmit={this.handleLogin}
          onLogoutClick={this.handleLogout}
          isAuthenticated={isAuthenticated}
          isAuthenticating={isAuthenticating}
        />
        {children}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    isAuthenticated: state.app.isAuthenticated,
    isAuthenticating: state.app.isAuthenticating,
    isLoggingIn: state.app.isLoggingIn,
  }),
  { login, logout }
)(App);
