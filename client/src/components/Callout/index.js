import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/settings';

const styles = StyleSheet.create({
  callout: {
    padding: '10px 15px',
    color: '#fff',
    background: colors.info,
  },
});

const Callout = ({ children }) =>
  <div className="card media">
    <div className={`${css(styles.callout)} media-left`}>
      <i className="glyphicon glyphicon-info-sign" />
    </div>
    <div className="media-body" style={{ padding: '10px' }}>
      {children}
    </div>
  </div>;

Callout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Callout;
