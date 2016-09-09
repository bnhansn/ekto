import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  error: {
    height: '1rem',
    fontSize: '90%',
    color: colors.danger,
  },
});

const Input = (props) =>
  <div className="form-group">
    {props.label && <label htmlFor={props.input.name}>{props.label}</label>}
    <input
      {...props.input}
      type={props.type}
      placeholder={props.placeholder}
      className={props.className ? props.className : 'form-control'}
    />
    {props.meta.touched && props.meta.error &&
      <div className={css(styles.error)}>{props.meta.error}</div>
    }
  </div>;

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};

export default Input;
