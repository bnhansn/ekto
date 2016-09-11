import React, { Component, PropTypes } from 'react';

class AccountDomain extends Component {
  static propTypes = {
    domain: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  handleDelete = () => this.props.onDelete(this.props.domain.id);

  render() {
    const { domain } = this.props;

    return (
      <div className="form-group">
        <div className="input-group">
          <input className="form-control" readOnly value={domain.host} />
          <div className="input-group-btn">
            <button className="btn btn-secondary" onClick={this.handleDelete}>
              <span className="glyphicon glyphicon-trash" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDomain;
