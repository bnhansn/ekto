import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DashboardNavbar = ({ className }) =>
  <div className={`tabs ${className}`}>
    <Link to="/accounts" className="tab-item" activeClassName="active">Accounts</Link>
    <Link to="/profile" className="tab-item" activeClassName="active">Profile</Link>
  </div>;

DashboardNavbar.propTypes = {
  className: PropTypes.string,
};

export default DashboardNavbar;
