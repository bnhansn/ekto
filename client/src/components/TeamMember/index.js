import React, { Component, PropTypes } from 'react';
import Gravatar from '../../components/Gravatar';

class TeamMember extends Component {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    teamMember: PropTypes.object.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    currentUserId: PropTypes.number.isRequired,
  };

  handleRemoveClick = () => this.props.onRemoveClick(this.props.teamMember.id);

  render() {
    const { teamMember, ownerId, currentUserId } = this.props;

    return (
      <li className="list-group-item">
        <div className="media">
          <div className="media-left">
            <Gravatar
              size={30}
              className="img-circle"
              email={teamMember.email || ''}
            />
          </div>
          <div className="media-body">
            {teamMember.name}
            {ownerId === teamMember.id &&
              <span className="tag tag-default" style={{ marginLeft: '1rem' }}>Owner</span>
            }
          </div>
          {(currentUserId === ownerId) &&
            <div className="media-right">
              <button
                type="button"
                className="btn btn-sm btn-gray"
                onClick={this.handleRemoveClick}
                disabled={ownerId === teamMember.id}
              >
                <span style={{ marginRight: '4px' }}>&times;</span>
                <span>Remove</span>
              </button>
            </div>
          }
        </div>
      </li>
    );
  }
}

export default TeamMember;
