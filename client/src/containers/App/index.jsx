import { API_URL } from 'config'; // eslint-disable-line
import { logout } from './actions';
import { connect } from 'react-redux';
import Alert from '../Alert';
import Navbar from '../../components/Navbar';
import React, { Component, PropTypes } from 'react';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { children, user, isAuthenticated } = this.props;

    return (
      <div>
        <Alert />
        <Navbar
          user={user}
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
  }),
  { logout }
)(App);
