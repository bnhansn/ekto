import Input from '../Input';
import { Field, reduxForm } from 'redux-form';
import React, { PropTypes, Component } from 'react';
import { keyTransform, assignAttributes } from '../../utils';

class AccountSettingsForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    const attributes = keyTransform(data);
    const account = assignAttributes(attributes);
    this.props.onSubmit(account);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-4">
                <h5>Settings</h5>
              </div>
              <div className="col-sm-8">
                <Field
                  type="text"
                  name="name"
                  label="Name"
                  component={Input}
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
  return errors;
};

export default reduxForm({
  form: 'accountSettings',
  validate,
})(AccountSettingsForm);
