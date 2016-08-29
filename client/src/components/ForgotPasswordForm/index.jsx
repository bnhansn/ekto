import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import Input from '../Input';

class ForgotPasswordForm extends Component {
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
        className="m-x-auto p-y-1"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <div className="card">
          <div className="card-header">
            Forgot password
          </div>
          <div className="card-block">
            <Field name="email" component={Input} placeholder="Email" />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
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
  return errors;
};

export default reduxForm({
  form: 'forgotPassword',
  validate,
})(ForgotPasswordForm);
