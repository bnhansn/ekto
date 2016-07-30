import AccountDomain from '../AccountDomain';
import React, { Component, PropTypes } from 'react';
import AccountDomainForm from '../AccountDomainForm';

class AccountDomainsList extends Component {
  static propTypes = {
    domains: PropTypes.array.isRequired,
    onDomainDelete: PropTypes.func.isRequired,
    isCreatingDomain: PropTypes.bool.isRequired,
    onNewDomainSubmit: PropTypes.func.isRequired,
  }

  handleNewDomainSubmit(data) {
    this.props.onNewDomainSubmit(data);
  }

  handleDomainDelete(id) {
    this.props.onDomainDelete(id);
  }

  renderDomains() {
    const { domains } = this.props;
    if (!domains.length) { return null; }

    return domains.map(domain =>
      <AccountDomain
        key={domain.id}
        domain={domain}
        onDelete={::this.handleDomainDelete}
      />
    );
  }

  render() {
    const { isCreatingDomain } = this.props;

    return (
      <div className="card">
        <div className="card-block">
          <div className="row">
            <div className="col-sm-4 col-xs-12">
              <h5>Domains</h5>
              <p className="small text-muted">
                Whitelisted domains which can make api requests to fetch blog posts
              </p>
            </div>
            <div className="col-sm-8 col-xs-12">
              {this.renderDomains()}
              <AccountDomainForm
                isCreatingDomain={isCreatingDomain}
                onSubmit={::this.handleNewDomainSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDomainsList;
