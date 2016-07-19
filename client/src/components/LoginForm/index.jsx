import Input from '../Input';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import React, { PropTypes, Component } from 'react';

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form
        className="m-x-auto p-y-1"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit(::this.handleSubmit)}
      >
        <div className="card">
          <div className="card-header">
            Login
          </div>
          <div className="card-block">
            <Field name="email" type="text" component={Input} placeholder="Email" />
            <Field name="password" type="password" component={Input} placeholder="Password" />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <Link to="/forgot" className="btn btn-link">Forgot password</Link>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
