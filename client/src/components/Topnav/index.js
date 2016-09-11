import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/settings';

const styles = StyleSheet.create({
  topnav: {
    padding: '20px 0',
    background: colors.grayLighter,
    borderBottom: '1px solid rgb(225,230,235)',
  },

  header: {
    display: 'inline-block',
    marginBottom: '0',
  },

  headerLink: {
    padding: '5px',
    margin: '-5px 0 -5px -5px',
    color: colors.primary,
    borderRadius: '3px',
    ':hover': {
      color: colors.primaryDark,
      background: 'rgba(120,125,130,.1)',
    },
    ':focus': {
      color: colors.primaryDark,
      background: 'rgba(120,125,130,.1)',
    },
  },
});

const Topnav = ({ className, header, headerRoute, subheader }) =>
  <div className={`${css(styles.topnav)} ${className || ''}`}>
    <div className="container">
      {headerRoute ?
        <Link to={headerRoute}>
          <h5 className={css(styles.header, styles.headerLink)}>{header}</h5>
        </Link> :
        <h5 className={css(styles.header)}>{header}</h5>
      }
      {subheader && <span style={{ margin: '0 8px 0 6px', fontSize: '20px' }}>&#8250;</span>}
      {subheader && <h5 className={css(styles.header)}>{subheader}</h5>}
    </div>
  </div>;

Topnav.propTypes = {
  className: PropTypes.string,
  subheader: PropTypes.string,
  headerRoute: PropTypes.string,
  header: PropTypes.string.isRequired,
};

export default Topnav;
