import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { css, StyleSheet } from 'aphrodite';
import DeletePostModal from '../DeletePostModal';

const styles = StyleSheet.create({
  previewCard: {
    marginBottom: '0',
    borderBottom: '0',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    justifyContent: 'center',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
    ':first-child': {
      borderRight: '0',
      borderBottomRightRadius: '0',
    },
    ':last-child': {
      borderBottomLeftRadius: '0',
    },
  },
});

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
      <div className="m-b-1">
        <div className={`card ${css(styles.previewCard)}`}>
          <div className="card-block">
            {!post.published &&
              <span className="tag tag-default pull-xs-right">Unpublished</span>
            }
            <h3>{post.title}</h3>
            <p>{excerpt(post.html)}</p>
            <span className="text-muted">
              <span className="glyphicon glyphicon-time" style={{ marginRight: '.5rem' }} />
              <span>{moment(post.publishedAt).fromNow()}</span>
            </span>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Link
            to={`/accounts/${accountSlug}/posts/${post.id}`}
            className={`btn btn-secondary ${css(styles.button)}`}
          >
            <span className="glyphicon glyphicon-pencil" style={{ marginRight: '.5rem' }} />
            <span>Edit</span>
          </Link>
          <button
            className={`btn btn-secondary ${css(styles.button)}`}
            onClick={() => this.setState({ deleteModalOpen: true })}
          >
            <span className="glyphicon glyphicon-trash" style={{ marginRight: '.5rem' }} />
            <span>Delete</span>
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
