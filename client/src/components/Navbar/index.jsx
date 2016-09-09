import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Link } from 'react-router';
import Gravatar from '../Gravatar';

class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
  };

  handleLogoutClick = () => this.props.onLogoutClick();

  render() {
    const { user, isAuthenticated, isAuthenticating } = this.props;

    return (
      <nav className="navbar bg-primary">
        <Link to={isAuthenticated ? '/accounts' : '/'} className="navbar-brand">Ekto</Link>
        {!isAuthenticated && !isAuthenticating &&
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item m-r-sm">
              <a href="https://github.com/bnhansn/ekto/" target="_blank" rel="noopener noreferrer" className="nav-link">
                <i className="icon icon-github" style={{ fontSize: '1.5rem' }} />
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link btn login-button" activeClassName="active">
                Login
              </Link>
            </li>
          </ul>
        }
        {isAuthenticated &&
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Dropdown ref={(c) => { this.dropdown = c; }}>
                <DropdownTrigger className="user-dropdown-trigger">
                  <i className="icon icon-menu7 user-dropdown-icon" />
                  <Gravatar
                    size={30}
                    className="img-circle"
                    email={user.email || ''}
                  />
                </DropdownTrigger>
                <DropdownContent className="dropdown-right">
                  <Link
                    to="/accounts"
                    className="dropdown-item"
                    onClick={() => this.dropdown.hide()}
                  >
                    <i className="icon icon-database2 user-dropdown-icon" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => this.dropdown.hide()}
                  >
                    <i className="icon icon-equalizer2 user-dropdown-icon" />
                    <span>Settings</span>
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={this.handleLogoutClick}
                  >
                    <i className="icon icon-exit user-dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </DropdownContent>
              </Dropdown>
            </li>
          </ul>
        }
      </nav>
    );
  }
}

export default Navbar;
