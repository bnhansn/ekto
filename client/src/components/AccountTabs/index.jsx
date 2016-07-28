import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AccountTabs = ({ account }) =>
  <nav className="tabs m-b-2">
    <div className="container">
      <Link
        to={`/accounts/${account.attributes.slug}/posts`}
        className="tab-link"
        activeClassName="active"
      >
        Posts
      </Link>
      <Link
        to={`/accounts/${account.attributes.slug}/team`}
        className="tab-link"
        activeClassName="active"
      >
        Team
      </Link>
      <Link
        to={`/accounts/${account.attributes.slug}/settings`}
        className="tab-link"
        activeClassName="active"
      >
        Settings
      </Link>
    </div>
  </nav>;

AccountTabs.propTypes = {
  account: PropTypes.object.isRequired,
};

export default AccountTabs;
