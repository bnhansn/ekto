import classnames from 'classnames';
import includes from 'lodash/includes';
import React, { PropTypes } from 'react';

const Alert = (props) => {
  const { alert: { klass, icon, message } } = props;
  const iconClass = classnames({
    notification2: icon === 'notification' || (!icon && klass === 'warning'),
    warning2: icon === 'warning' || ((!icon && klass === 'danger') || !klass),
    info2: icon === 'info' || (!icon && includes(['primary', 'info'], klass)),
    checkmark: icon === 'checkmark' || (!icon && includes(['success', 'white', 'black'], klass)),
  });

  return (
    <div
      className={`alert alert-${klass || 'danger'}`}
      onClick={() => { props.onClick(); }}
    >
      <i className={`icon icon-${iconClass} alert-icon`} />
      {message || 'Unknown error'}
      <div style={{ flexGrow: 1 }} />
      <i className="icon icon-cross alert-close" />
    </div>
  );
};

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Alert;
