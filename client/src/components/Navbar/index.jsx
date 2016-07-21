import Gravatar from '../Gravatar';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  handleLogoutClick(e) {
    this.props.onLogoutClick(e);
  }

  handleDropdownLinkClick(e) {
    e.preventDefault();
    this.refs.dropdown.hide();
    this.context.router.push('/accounts');
  }

  render() {
    const { user, isAuthenticated } = this.props;

    return (
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">Billow</Link>
          <ul className="nav navbar-nav pull-xs-right">
            {!isAuthenticated &&
              <Link to="/login" className="nav-item nav-link" activeClassName="active">
              Login
              </Link>
            }
            {!isAuthenticated &&
              <Link to="/signup" className="nav-item nav-link" activeClassName="active">
                Signup
              </Link>
            }
            {isAuthenticated &&
              <Dropdown ref="dropdown">
                <DropdownTrigger className="user-dropdown-trigger">
                  <i className="icon icon-menu7 user-dropdown-icon"></i>
                  <Gravatar email={user.email} size={30} className="user-dropdown-avatar" />
                </DropdownTrigger>
                <DropdownContent className="dropdown-right">
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={(e) => this.handleDropdownLinkClick(e)}
                  >
                      Accounts
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { ::this.handleLogoutClick(e); }}
                    className="dropdown-item"
                  >
                    Logout
                  </a>
                </DropdownContent>
              </Dropdown>
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
