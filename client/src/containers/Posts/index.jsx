import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';
import React, { Component, PropTypes } from 'react';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchPosts(this.props.params.accountSlug);
  }

  renderPosts() {
    const { params: { accountSlug }, posts } = this.props;

    if (!posts.length) { return null; }

    return posts.map(post =>
      <Link
        key={post.id}
        to={`/accounts/${accountSlug}/posts/${post.id}`}
        className="list-group-item list-group-item-action flex align-center justify-between"
      >
        <span>{post.title}</span>
        {!post.published &&
          <span className="tag tag-default m-l-1">Unpublished</span>
        }
        <div className="flex-grow"></div>
        <i className="icon icon-arrow-right2"></i>
      </Link>
    );
  }

  render() {
    const { params: { accountSlug }, isLoading } = this.props;

    return (
      <div>
        <div className="container">
          {isLoading && <div className="loader"></div>}
          <div className="list-group m-b-1">
            {this.renderPosts()}
          </div>
          <Link to={`/accounts/${accountSlug}/posts/new`} className="btn btn-secondary">
            New post
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
  }),
  { fetchPosts }
)(Posts);
