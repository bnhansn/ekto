import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Alert = (props) => {
  const { alert: { klass, message } } = props;
  const iconClass = classnames({
    checkmark: klass === 'success',
    notification2: klass === 'warning',
    warning2: klass === 'danger' || !klass,
    info2: klass === 'primary' || klass === 'info',
  });

  return (
    <div
      className={`alert alert-${klass || 'danger'}`}
      onClick={() => { props.onClick(); }}
    >
      <i className={`icon icon-${iconClass} alert-icon`}></i>
      {message || 'Unknown error'}
      <div style={{ flexGrow: 1 }}></div>
      <i className="icon icon-cross alert-close"></i>
    </div>
  );
};

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Alert;
