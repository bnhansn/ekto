import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DashboardNavbar = ({ className }) =>
  <nav className={`tabs ${className}`}>
    <Link to="/accounts" className="tab-link" activeClassName="active">Accounts</Link>
  </nav>;

DashboardNavbar.propTypes = {
  className: PropTypes.string,
};

export default DashboardNavbar;
