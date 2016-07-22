import React, { Component, PropTypes } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <DashboardNavbar className="m-b-2" />
        <div>Profile</div>
      </div>
    );
  }
}

export default Profile;
