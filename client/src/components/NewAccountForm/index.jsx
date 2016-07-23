import Input from '../Input';
import { Field, reduxForm } from 'redux-form';
import React, { PropTypes, Component } from 'react';

class NewAccountForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isSavingNewAccount: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, isSavingNewAccount } = this.props;

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className="card">
          <div className="card-header">
            New account
          </div>
          <div className="card-block">
            <Field name="name" type="text" component={Input} placeholder="Name" />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSavingNewAccount}
            >
              {isSavingNewAccount ? 'Saving...' : 'Save'}
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
  form: 'newAccount',
  validate,
})(NewAccountForm);
