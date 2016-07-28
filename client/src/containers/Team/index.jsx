import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchTeam } from './actions';
import Gravatar from '../../components/Gravatar';
import React, { Component, PropTypes } from 'react';

class Team extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    account: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchTeam: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchTeam(this.props.account.id);
  }

  renderTeam() {
    const { team, account } = this.props;
    if (!team.length) { return null; }
    const ownerId = account.attributes.createdBy.toString();

    return team.map(user =>
      <li key={user.id} className="list-group-item">
        <div className="media">
          <div className="media-left">
            <Gravatar
              size={30}
              className="img-circle"
              email={user.attributes.email || ''}
            />
          </div>
          <div className="media-body">
            {user.attributes.name}
            {ownerId === user.id &&
              <span className="tag tag-default m-l-1">Owner</span>
            }
          </div>
        </div>
      </li>
    );
  }

  render() {
    const { team, isLoading } = this.props;
    if (isLoading) {
      return <div className="container">Loading...</div>;
    }

    if (isEmpty(team)) {
      return null;
    }

    return (
      <div className="container">
        <ul className="list-group">
          {::this.renderTeam()}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    team: state.team.team,
    account: state.account.account,
    isLoading: state.team.isLoading,
  }),
  { fetchTeam }
)(Team);
