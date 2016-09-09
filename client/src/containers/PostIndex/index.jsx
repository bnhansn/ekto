import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from './actions';
import PostPreview from '../../components/PostPreview';

class PostIndex extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchPosts(this.props.params.accountSlug);
  }

  handlePostDelete = (id) => this.props.deletePost(this.props.params.accountSlug, id);

  renderPosts() {
    const { params: { accountSlug }, posts } = this.props;

    if (!posts.length) { return null; }

    return posts.map(post =>
      <PostPreview
        post={post}
        key={post.id}
        accountSlug={accountSlug}
        onDelete={this.handlePostDelete}
      />
    );
  }

  render() {
    const { params: { accountSlug }, isLoading } = this.props;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2 push-md-10 col-xs-12 m-b-1">
              <Link
                className="btn btn-secondary btn-block"
                to={`/accounts/${accountSlug}/posts/new`}
              >
                New post
              </Link>
            </div>
            <div className="col-md-10 pull-md-2 col-xs-12">
              {isLoading && <div className="loader" />}
              {this.renderPosts()}
            </div>
          </div>
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
  { fetchPosts, deletePost }
)(PostIndex);
