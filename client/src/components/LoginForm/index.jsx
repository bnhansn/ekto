import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Input from '../Input';

class LoginForm extends Component {
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
        onSubmit={handleSubmit(this.handleSubmit)}
        style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem 0' }}
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
