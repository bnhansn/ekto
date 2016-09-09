import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

class SettingsForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <h5>Profile</h5>
              </div>
              <div className="col-sm-8 col-xs-12">
                <Field
                  type="text"
                  name="name"
                  label="Name"
                  component={Input}
                />
                <Field
                  type="text"
                  name="email"
                  label="Email"
                  component={Input}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="card-block">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <h5>Password</h5>
              </div>
              <div className="col-sm-8 col-xs-12">
                <Field
                  type="password"
                  name="password"
                  component={Input}
                  label="New password"
                />
                <Field
                  type="password"
                  component={Input}
                  label="Confirm password"
                  name="passwordConfirmation"
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
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
  if (values.password && values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  if ((values.password || values.passwordConfirmation) &&
      values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  return errors;
};

export default reduxForm({
  form: 'settings',
  validate,
})(SettingsForm);
