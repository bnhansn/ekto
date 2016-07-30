import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';
import { keyTransform, assignAttributes } from '../../utils';

const renderField = field =>
  <input
    {...field.input}
    className={`form-control ${(field.touched && field.error) ? 'has-error' : ''}`}
  />;

class AccountDomainForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isCreatingDomain: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    const attributes = keyTransform(data);
    const domain = assignAttributes(attributes);
    this.props.onSubmit(domain);
  }

  render() {
    const { handleSubmit, isCreatingDomain } = this.props;

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className="input-group">
          <Field
            type="text"
            name="url"
            placeholder="Url"
            component={renderField}
          />
          <div className="input-group-btn">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isCreatingDomain}
            >
              {isCreatingDomain ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.url) {
    errors.url = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'createDomain',
  validate,
})(AccountDomainForm);
