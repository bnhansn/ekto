import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import AccountDomainsList from '../../components/AccountDomainsList';
import AccountSettingsForm from '../../components/AccountSettingsForm';
import { updateAccount, createDomain, deleteDomain, deleteAccount } from './actions';

class AccountSettings extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    user: PropTypes.object.isRequired,
    domains: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    createDomain: PropTypes.func.isRequired,
    deleteDomain: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    isCreatingDomain: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      deleteConfirmation: '',
    };
  }

  @autobind
  handleSubmit(data) {
    this.props.updateAccount(this.props.account.id, data);
  }

  @autobind
  handleNewDomainSubmit(data) {
    this.props.createDomain(this.props.account.id, data);
  }

  @autobind
  handleDomainDelete(id) {
    this.props.deleteDomain(this.props.account.id, id);
  }

  @autobind
  handleAccountDelete(e) {
    e.preventDefault();
    const { account } = this.props;
    if (this.state.deleteConfirmation !== account.name) {
      return false;
    }
    this.props.deleteAccount(this.props.account.id);
    return true;
  }

  @autobind
  handleModalClose() {
    this.setState({
      modalOpen: false,
      deleteConfirmation: '',
    });
  }

  render() {
    const { modalOpen } = this.state;
    const { isSubmitting, initialValues, domains, isCreatingDomain, user, account } = this.props;

    return (
      <div className="container">
        <AccountSettingsForm
          enableReinitialize
          isSubmitting={isSubmitting}
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
        />
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <h5>Info</h5>
              </div>
              <div className="col-sm-8 col-xs-12">
                <div className="form-group">
                  <label htmlFor="key">Account key</label>
                  <input
                    readOnly
                    name="key"
                    type="text"
                    defaultValue={account.key}
                    className="form-control"
                  />
                </div>
                <p className="small text-muted">
                  Blog posts can be retrieved from the api at <code style={{ wordWrap: 'break-word' }}>https://api.ekto.tech/v1/{account.key}/posts</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AccountDomainsList
          domains={domains}
          isCreatingDomain={isCreatingDomain}
          onDomainDelete={this.handleDomainDelete}
          onNewDomainSubmit={this.handleNewDomainSubmit}
        />
        {user.id === account.ownerId &&
          <div className="card">
            <div className="card-block">
              <div className="row">
                <div className="col-sm-4 col-xs-12">
                  <h5>Danger zone</h5>
                  <p className="small text-muted">
                    Deleting an account is permanent and deletes all associated posts.
                  </p>
                </div>
                <div className="col-sm-8 col-xs-12">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.setState({ modalOpen: true })}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        <Modal
          isOpen={modalOpen}
          className="modal"
          overlayClassName="modal-overlay"
          onRequestClose={this.handleModalClose}
        >
          <form onSubmit={this.handleAccountDelete}>
            <div className="modal-header">
              <h6 className="text-primary">Delete account</h6>
              <i
                className="modal-close"
                onClick={this.handleModalClose}
              />
            </div>
            <div className="modal-content">
              <p>
                Deleting an account is irreversible and deletes all associated
                posts. Enter your accounts's name <code>{account.name}</code>
                &nbsp;below to confirm you want to permanently delete it.
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => { this.setState({ deleteConfirmation: e.target.value }); }}
                />
              </div>
            </div>
            <div className="modal-footer text-xs-right">
              <div className="btn-toolbar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={this.state.deleteConfirmation !== account.name}
                >
                  Delete account
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    account: state.account.account,
    domains: state.account.domains,
    initialValues: state.account.account,
    isSubmitting: state.accountSettings.isSubmitting,
    isCreatingDomain: state.accountSettings.isCreatingDomain,
  }),
  { updateAccount, createDomain, deleteDomain, deleteAccount }
)(AccountSettings);
