import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { colors } from '../../styles/settings';
import Input from '../Input';

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    background: 'rgba(0,0,0,.15)',
    border: '1px solid #fff',
    ':focus': {
      background: 'rgba(0,0,0,.2)',
      border: '1px solid #fff',
    },
    '::-webkit-input-placeholder': {
      color: 'rgba(255,255,255,.9)',
    },
    '::-moz-placeholder': {
      color: 'rgba(255,255,255,.9)',
      opacity: '1',
    },
    ':-ms-input-placeholder': {
      color: 'rgba(255,255,255,.9)',
    },
    '::placeholder': {
      color: 'rgba(255,255,255,.9)',
    },
  },

  button: {
    color: colors.primary,
    background: '#fff',
    border: '1px solid #fff',
    ':hover': {
      color: colors.primary,
      background: '#fff',
    },
    ':focus': {
      color: colors.primary,
      background: '#fff',
    },
  },
});

class SignupForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form
        className="signup-form"
        style={{ padding: '2rem 0' }}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <div className="row">
          <div className="col-md-3 col-xs-12">
            <Field
              name="name"
              type="text"
              component={Input}
              placeholder="Full name"
              className={`form-control form-control-lg ${css(styles.input)}`}
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Field
              name="email"
              type="email"
              component={Input}
              placeholder="Email"
              className={`form-control form-control-lg ${css(styles.input)}`}
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Field
              name="password"
              type="password"
              component={Input}
              placeholder="Password"
              className={`form-control form-control-lg ${css(styles.input)}`}
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-block btn-lg ${css(styles.button)}`}
            >
              {isSubmitting ? 'Submitting...' : 'Signup'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
