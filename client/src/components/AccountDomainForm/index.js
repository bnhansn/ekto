import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';

class AccountDomainForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isCreatingDomain: PropTypes.bool.isRequired,
  };

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, isCreatingDomain } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group">
          <Field
            type="text"
            name="host"
            component="input"
            className="form-control"
            placeholder="http://www.example.com"
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
  if (!values.host) {
    errors.host = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'createDomain',
  validate,
})(AccountDomainForm);