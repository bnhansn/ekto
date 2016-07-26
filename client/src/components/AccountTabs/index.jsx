import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AccountTabs = ({ slug }) =>
  <nav className="tabs m-b-2">
    <div className="container">
      <Link
        to={`/accounts/${slug}/posts`}
        className="tab-link"
        activeClassName="active"
      >
        Posts
      </Link>
      <Link
        to={`/accounts/${slug}/team`}
        className="tab-link"
        activeClassName="active"
      >
        Team
      </Link>
      <Link
        to={`/accounts/${slug}/settings`}
        className="tab-link"
        activeClassName="active"
      >
        Settings
      </Link>
    </div>
  </nav>;

AccountTabs.propTypes = {
  slug: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default AccountTabs;
