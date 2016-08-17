import { connect } from 'react-redux';
import Gravatar from '../../components/Gravatar';
import React, { Component, PropTypes } from 'react';

class Team extends Component {
  static propTypes = {
    team: PropTypes.array.isRequired,
    account: PropTypes.object.isRequired,
  };

  renderTeam() {
    const { team, account } = this.props;
    if (!team.length) { return null; }
    const ownerId = account.ownerId;

    return team.map(user =>
      <li key={user.id} className="list-group-item">
        <div className="media">
          <div className="media-left">
            <Gravatar
              size={30}
              className="img-circle"
              email={user.email || ''}
            />
          </div>
          <div className="media-body">
            {user.name}
            {ownerId === user.id &&
              <span className="tag tag-default m-l-1">Owner</span>
            }
          </div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className="container">
        <ul className="list-group">
          {this.renderTeam()}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    team: state.account.team,
    account: state.account.account,
  }),
  null
)(Team);
