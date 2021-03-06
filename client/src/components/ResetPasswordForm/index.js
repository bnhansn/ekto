import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

class ResetPasswordForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit)}
        style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem 0' }}
      >
        <div className="card">
          <div className="card-header">
            Reset password
          </div>
          <div className="card-block">
            <Field name="password" type="password" component={Input} placeholder="New password" />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordForm);
