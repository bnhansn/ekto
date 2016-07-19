import React, { PropTypes } from 'react';

const Alert = (props) => {
  const { alert: { klass, message } } = props;

  return (
    <div
      className={`alert alert-${klass || 'danger'}`}
      onClick={() => { props.onClick(); }}
    >
      {message || 'Unknown error'}
      <i className="icon icon-cross alert-close"></i>
    </div>
  );
};

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Alert;
