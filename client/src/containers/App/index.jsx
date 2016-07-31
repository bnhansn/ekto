import Alert from '../Alert';
import { logout } from './actions';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import React, { Component, PropTypes } from 'react';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
  };

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { children, user, isAuthenticated, isAuthenticating } = this.props;

    return (
      <div>
        <Alert />
        <Navbar
          user={user}
          isAuthenticating={isAuthenticating}
          isAuthenticated={isAuthenticated}
          onLogoutClick={::this.handleLogout}
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
  }),
  { logout }
)(App);
