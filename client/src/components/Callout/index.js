import React, { PropTypes } from 'react';

const Callout = ({ klass, children }) =>
  <div className="card media">
    <div className={`bg-${klass} media-left`} style={{ padding: '10px 15px', color: '#fff' }}>
      <i className="glyphicon glyphicon-info-sign" />
    </div>
    <div className="media-body" style={{ padding: '10px' }}>
      {children}
    </div>
  </div>;

Callout.propTypes = {
  klass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Callout;
