import React, { PropTypes } from 'react';
import includes from 'lodash/includes';
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
  const { klass, icon, message } = props;
  let iconClass;
  if (icon === 'notification' || (!icon && klass === 'warning')) {
    iconClass = 'notification2';
  }
  if (icon === 'warning' || ((!icon && klass === 'danger') || !klass)) {
    iconClass = 'warning-sign';
  }
  if (icon === 'info' || (!icon && includes(['primary', 'info'], klass))) {
    iconClass = 'info-sign';
  }
  if (icon === 'checkmark' || (!icon && includes(['success', 'white', 'black'], klass))) {
    iconClass = 'ok';
  }

  const alertClass = css(
    styles.alert,
    klass === 'white' && styles.alertWhite,
    klass === 'black' && styles.alertBlack,
    klass === 'primary' && styles.alertPrimary,
    klass === 'info' && styles.alertInfo,
    klass === 'warning' && styles.alertWarning,
    klass === 'success' && styles.alertSuccess,
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
  icon: PropTypes.string,
  klass: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Alert;
