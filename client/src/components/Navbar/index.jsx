import { Link } from 'react-router';
import UserDropdown from '../UserDropdown';
import React, { PropTypes } from 'react';

const Navbar = ({ user, isAuthenticated, onLogoutClick }) =>
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="navbar-brand">Billow</Link>
      <ul className="nav navbar-nav pull-xs-right">
        {!isAuthenticated &&
          <Link to="/signup" className="nav-item nav-link" activeClassName="active">
            Signup
          </Link>
        }
        {!isAuthenticated &&
          <Link to="/login" className="nav-item nav-link" activeClassName="active">
            Login
          </Link>
        }
        {isAuthenticated &&
          <UserDropdown
            user={user}
            onLogoutClick={onLogoutClick}
          />
        }
      </ul>
    </div>
  </nav>;

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
