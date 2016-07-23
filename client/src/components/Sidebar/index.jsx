import React from 'react';
import { Link } from 'react-router';

const Sidebar = () =>
  <div className="sidebar">
    <Link to="/accounts" className="sidebar-link" activeClassName="active">
      <i className="icon icon-sphere2"></i>
    </Link>
    <Link to="/profile" className="sidebar-link" activeClassName="active">
      <i className="icon icon-user3"></i>
    </Link>
  </div>;

export default Sidebar;
