import { Link } from 'react-router';
import UserDropdown from '../UserDropdown';
import React, { PropTypes } from 'react';

const Navbar = ({ user, isAuthenticated, onLogoutClick }) =>
  <nav className="navbar">
    <Link to="/" className="navbar-item navbar-item-left">
      <span className="navbar-item-pad">
        <span className="navbar-item-label">Billow</span>
      </span>
    </Link>
    <div className="navbar-right">
      {!isAuthenticated &&
        <Link to="/signup" className="navbar-item navbar-item-right" activeClassName="active">
          <div className="navbar-item-pad">
            <span className="navbar-item-label">Signup</span>
            <i className="icon icon-enter navbar-item-icon"></i>
          </div>
        </Link>
      }
      {!isAuthenticated &&
        <Link to="/login" className="navbar-item navbar-item-right" activeClassName="active">
          <div className="navbar-item-pad">
            <span className="navbar-item-label">Login</span>
            <i className="icon icon-enter navbar-item-icon"></i>
          </div>
        </Link>
      }
      {isAuthenticated &&
        <div className="navbar-item navbar-item-right">
          <UserDropdown
            user={user}
            onLogoutClick={onLogoutClick}
          />
        </div>
      }
    </div>
  </nav>;

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
