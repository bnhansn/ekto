import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import DeletePostModal from '../DeletePostModal';

const excerpt = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return `${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`;
};

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    accountSlug: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteModalOpen: false,
    };
  }

  handleDelete = () => this.props.onDelete(this.props.post.id);

  render() {
    const { deleteModalOpen } = this.state;
    const { post, accountSlug } = this.props;

    return (
      <div className="post-preview">
        <div className="card post-preview-card">
          <div className="card-block">
            {!post.published &&
              <span className="tag tag-default pull-xs-right">Unpublished</span>
            }
            <h3>{post.title}</h3>
            <p>{excerpt(post.html)}</p>
            <span className="text-muted">
              <i className="icon icon-clock m-r-sm" />
              <span>{moment(post.publishedAt).fromNow()}</span>
            </span>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Link
            className="btn btn-secondary post-preview-button"
            to={`/accounts/${accountSlug}/posts/${post.id}`}
          >
            <i className="icon icon-pencil m-r-sm" /><span>Edit</span>
          </Link>
          <button
            className="btn btn-secondary post-preview-button"
            onClick={() => this.setState({ deleteModalOpen: true })}
          >
            <i className="icon icon-bin m-r-sm" /><span>Delete</span>
          </button>
        </div>
        <DeletePostModal
          isOpen={deleteModalOpen}
          onDelete={this.handleDelete}
          onRequestClose={() => this.setState({ deleteModalOpen: false })}
        />
      </div>
    );
  }
}

export default PostPreview;
