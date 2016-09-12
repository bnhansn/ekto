import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Input from '../Input';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onLinkClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} style={{ padding: '10px 15px' }}>
        <Field name="email" type="text" component={Input} placeholder="Email" />
        <Field name="password" type="password" component={Input} placeholder="Password" />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginBottom: '5px' }}
          className="btn btn-block btn-primary"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'right' }}>
          <small><Link to="/forgot" onClick={this.props.onLinkClick}>Forgot password?</Link></small>
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
