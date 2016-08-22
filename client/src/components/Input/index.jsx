import React, { PropTypes } from 'react';

const Input = (props) =>
  <div className="form-group">
    {props.input.label && <label>{props.input.label}</label>}
    <input
      {...props.input}
      className={props.input.className ? props.input.className : 'form-control'}
    />
    {props.touched && props.error && <p className="input-error">{props.error}</p>}
  </div>;

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
};

export default Input;
