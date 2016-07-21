import React, { Component, PropTypes } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';

class Accounts extends Component {
  render() {
    return (
      <div className="container">
        <DashboardNavbar />
        <div>Accounts</div>
      </div>
    );
  }
}

export default Accounts;
