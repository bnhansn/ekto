import Gravatar from '../Gravatar';
import React, { PropTypes } from 'react';
import Dropdown from '../Dropdown';

const UserDropdown = ({ user: { email }, onLogoutClick }) =>
  <Dropdown className="user-dropdown" triggerClassName="navbar-item-pad">
    <button className="user-dropdown-button">
      <i className="icon icon-menu7"></i>
      <Gravatar email={email} size={30} className="user-dropdown-avatar" />
    </button>
    <div className="dropdown-menu dropdown-menu-right">
      <a
        href="#"
        onClick={(e) => { onLogoutClick(e); }}
        className="dropdown-item user-dropdown-item"
      >
        <i className="icon icon-exit"></i>
        Logout
      </a>
    </div>
  </Dropdown>;

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default UserDropdown;
