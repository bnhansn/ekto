import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AccountTabs = ({ accountSlug }) =>
  <nav className="tabs m-b-2">
    <div className="container">
      <Link
        to={`/accounts/${accountSlug}/posts`}
        className="tab-link"
        activeClassName="active"
      >
        Posts
      </Link>
      <Link
        to={`/accounts/${accountSlug}/team`}
        className="tab-link"
        activeClassName="active"
      >
        Team
      </Link>
      <Link
        to={`/accounts/${accountSlug}/settings`}
        className="tab-link"
        activeClassName="active"
      >
        Settings
      </Link>
    </div>
  </nav>;

AccountTabs.propTypes = {
  accountSlug: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default AccountTabs;
