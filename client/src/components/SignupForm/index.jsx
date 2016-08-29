import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { autobind } from 'core-decorators';
import Input from '../Input';

class SignupForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  @autobind
  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form
        className="signup-form p-y-3"
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <div className="row">
          <div className="col-md-3 col-xs-12">
            <Field
              name="name"
              type="text"
              component={Input}
              placeholder="Full name"
              className="form-control form-control-lg signup-input"
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Field
              name="email"
              type="email"
              component={Input}
              placeholder="Email"
              className="form-control form-control-lg signup-input"
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Field
              name="password"
              type="password"
              component={Input}
              placeholder="Password"
              className="form-control form-control-lg signup-input"
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <button
              type="submit"
              className="btn btn-block btn-lg signup-button"
              disabled={isSubmitting}
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
