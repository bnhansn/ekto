import classnames from 'classnames';
import includes from 'lodash/includes';
import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/settings';

const styles = StyleSheet.create({
  alert: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: '2000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '300px',
    minWidth: '250px',
    padding: '10px 20px',
    color: '#fff',
    borderRadius: '2px',
    boxShadow: '0 3px 20px rgba(120,125,130,.3), 0 1px 2px rgba(0,0,0,.05)',
  },

  close: {
    marginLeft: '1rem',
    color: 'rgba(0,0,0,.2)',
    cursor: 'pointer',
    ':hover': {
      color: 'rgba(0,0,0,.4)',
    },
  },

  alertBlack: {
    background: 'rgba(0,0,0,.85)',
  },

  blackClose: {
    color: 'rgba(255,255,255,.3)',
    ':hover': {
      color: 'rgba(255,255,255,.5)',
    },
  },

  alertWhite: {
    color: colors.grayDark,
    background: 'rgba(255,255,255,.9)',
  },

  alertPrimary: {
    background: colors.primary,
  },

  alertDanger: {
    background: colors.danger,
  },

  alertInfo: {
    background: colors.info,
  },

  alertWarning: {
    background: colors.warning,
  },

  alertSuccess: {
    background: colors.success,
  },
});

const Alert = (props) => {
  const { alert: { klass, icon, message } } = props;
  const iconClass = classnames({
    notification2: icon === 'notification' || (!icon && klass === 'warning'),
    'warning-sign': icon === 'warning' || ((!icon && klass === 'danger') || !klass),
    'info-sign': icon === 'info' || (!icon && includes(['primary', 'info'], klass)),
    ok: icon === 'checkmark' || (!icon && includes(['success', 'white', 'black'], klass)),
  });

  const alertClass = css(
    styles.alert,
    klass === 'white' && styles.alertWhite,
    klass === 'black' && styles.alertBlack,
    klass === 'primary' && styles.alertPrimary,
    klass === 'info' && styles.alertInfo,
    klass === 'warning' && styles.alertWarning,
    (klass === 'danger' || !klass) && styles.alertDanger,
  );

  const closeClass = css(
    styles.close,
    klass === 'black' && styles.blackClose,
  );

  return (
    <div
      className={alertClass}
      onClick={props.onClick}
    >
      <i className={`glyphicon glyphicon-${iconClass}`} style={{ marginRight: '.75rem' }} />
      {message || 'Unknown error'}
      <div style={{ flexGrow: 1 }} />
      <i className={`glyphicon glyphicon-remove ${closeClass}`} />
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Alert;
