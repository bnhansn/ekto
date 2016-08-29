import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const Topnav = ({ className, header, headerRoute, subheader }) =>
  <div className={`topnav ${className || ''}`}>
    <div className="container">
      {headerRoute ?
        <Link to={headerRoute}>
          <h5 className="topnav-header topnav-header-link">{header}</h5>
        </Link> :
        <h5 className="topnav-header">{header}</h5>
      }
      {subheader && <i className="icon icon-arrow-right4 subheader-arrow" />}
      {subheader && <h5 className="topnav-subheader">{subheader}</h5>}
    </div>
  </div>;

Topnav.propTypes = {
  className: PropTypes.string,
  subheader: PropTypes.string,
  headerRoute: PropTypes.string,
  header: PropTypes.string.isRequired,
};

export default Topnav;
