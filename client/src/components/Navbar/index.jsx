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

  handleLinkClick(e) {
    e.preventDefault();
    this.refs.dropdown.hide();
    const route = e.target.dataset.route;
    this.context.router.push(route);
  }

  render() {
    const { user, isAuthenticated } = this.props;

    return (
      <nav className="navbar bg-primary">
        <Link to="/" className="navbar-brand">Ekto</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {!isAuthenticated &&
              <Link to="/login" className="nav-link" activeClassName="active">
              Login
              </Link>
            }
          </li>
          <li className="nav-item">
            {!isAuthenticated &&
              <Link to="/signup" className="nav-link" activeClassName="active">
                Signup
              </Link>
            }
          </li>
          {isAuthenticated &&
            <Dropdown ref="dropdown">
              <DropdownTrigger className="user-dropdown-trigger">
                <i className="icon icon-menu7 user-dropdown-icon"></i>
                <Gravatar email={user.email} size={30} className="user-dropdown-avatar" />
              </DropdownTrigger>
              <DropdownContent className="dropdown-right">
                <a
                  href="#"
                  data-route="/accounts"
                  className="dropdown-item"
                  onClick={(e) => this.handleLinkClick(e)}
                >
                  <i className="icon icon-database2 user-dropdown-icon"></i>
                  <span>Dashboard</span>
                </a>
                <a
                  href="#"
                  data-route="/settings"
                  className="dropdown-item"
                  onClick={(e) => this.handleLinkClick(e)}
                >
                  <i className="icon icon-equalizer2 user-dropdown-icon"></i>
                  <span>Settings</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => { ::this.handleLogoutClick(e); }}
                  className="dropdown-item"
                >
                  <i className="icon icon-exit user-dropdown-icon"></i>
                  <span>Logout</span>
                </a>
              </DropdownContent>
            </Dropdown>
          }
        </ul>
      </nav>
    );
  }
}

export default Navbar;
