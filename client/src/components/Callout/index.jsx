import React, { PropTypes } from 'react';

const Callout = ({ klass, children }) =>
  <div className="card media">
    <div className={`bg-${klass} media-left callout-left`}>
      <i className="icon icon-info2" />
    </div>
    <div className="media-body callout-body">
      {children}
    </div>
  </div>;

Callout.propTypes = {
  klass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Callout;
