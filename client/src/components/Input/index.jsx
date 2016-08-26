import React, { PropTypes } from 'react';

const Input = (props) =>
  <div className="form-group">
    {props.label && <label htmlFor={props.input.name}>{props.label}</label>}
    <input
      {...props.input}
      type={props.type}
      placeholder={props.placeholder}
      className={props.className ? props.className : 'form-control'}
    />
    {props.meta.touched && props.meta.error && <p className="input-error">{props.meta.error}</p>}
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
