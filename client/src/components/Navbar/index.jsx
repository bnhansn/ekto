import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Gravatar from '../Gravatar';
import { colors } from '../../styles/settings';
import github from './github.png';

const styles = StyleSheet.create({
  navbar: {
    background: colors.primary,
    borderRadius: 0,
  },

  navLink: {
    color: '#fff',
    ':hover': {
      color: 'rgba(255,255,255,.8)',
    },
    ':focus': {
      colors: '#fff',
    },
  },

  dropdownTrigger: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    ':hover': {
      color: 'rgba(255,255,255,.8)',
      textDecoration: 'none',
    },
    ':focus': {
      color: '#fff',
      textDecoration: 'none',
    },
  },

  dropdownIcon: {
    marginRight: '.5rem',
  },

  loginButton: {
    color: colors.primary,
    background: '#fff',
    border: '1px solid #fff',
    ':hover': {
      color: colors.primary,
      background: '#fff',
    },
    ':focus': {
      color: colors.primary,
      background: '#fff',
    },
  },
});

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
      <nav className={`navbar ${css(styles.navbar)}`}>
        <Link
          to={isAuthenticated ? '/accounts' : '/'}
          className={`navbar-brand ${css(styles.navLink)}`}
        >
          Ekto
        </Link>
        {!isAuthenticated && !isAuthenticating &&
          <ul className="nav navbar-nav" style={{ float: 'right' }}>
            <li className="nav-item" style={{ marginRight: '.5rem' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '4px 0' }}
                href="https://github.com/bnhansn/ekto/"
                className={`nav-link ${css(styles.navLink)}`}
              >
                <img src={github} alt="github" style={{ width: '24px' }} />
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className={`btn nav-link ${css(styles.loginButton)}`}>
                Login
              </Link>
            </li>
          </ul>
        }
        {isAuthenticated &&
          <ul className="nav navbar-nav" style={{ float: 'right' }}>
            <li className="nav-item">
              <Dropdown ref={(c) => { this.dropdown = c; }}>
                <DropdownTrigger className={css(styles.dropdownTrigger)}>
                  <div style={{ marginRight: '.75rem', fontSize: '18px' }}>&#9776;</div>
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
                    <span className={`glyphicon glyphicon-dashboard ${css(styles.dropdownIcon)}`} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => this.dropdown.hide()}
                  >
                    <span className={`glyphicon glyphicon-tasks ${css(styles.dropdownIcon)}`} />
                    <span>Settings</span>
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={this.handleLogoutClick}
                  >
                    <span className={`glyphicon glyphicon-log-out ${css(styles.dropdownIcon)}`} />
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
