import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from './actions';
import PostPreview from '../../components/PostPreview';
import Pager from '../../components/Pager';
import { colors } from '../../styles/variables';

class PostIndex extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
    };
  }

  componentWillMount() {
    this.loadPosts();
  }

  loadPosts() {
    const { page, limit } = this.state;
    this.props.fetchPosts(this.props.params.accountSlug, { page, limit });
  }

  handlePostDelete = (id) => this.props.deletePost(this.props.params.accountSlug, id);

  handlePagerClick = (direction) => {
    if (direction === 'next') {
      this.setState({
        page: this.state.page + 1,
      }, () => { this.loadPosts(); });
    } else if (direction === 'prev') {
      this.setState({
        page: this.state.page - 1,
      }, () => { this.loadPosts(); });
    }
  }

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
    const { params: { accountSlug }, posts, meta, isLoading } = this.props;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2 push-md-10 col-xs-12 m-b-1">
              <Link
                className="btn btn-secondary btn-block m-b-1"
                to={`/accounts/${accountSlug}/posts/new`}
              >
                New post
              </Link>
              <Pager meta={meta} onPagerClick={this.handlePagerClick} />
            </div>
            <div className="col-md-10 pull-md-2 col-xs-12">
              {isLoading && <div className="loader" />}
              {!isLoading && !posts.length &&
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    fontSize: '1.5rem',
                    fontWeight: '300',
                    color: colors.grayLight,
                    background: colors.grayLighter,
                    borderRadius: '4px',
                    boxShadow: 'inset 0 0 7px rgba(0,0,0,.05)',
                  }}
                >
                  No posts
                </div>
              }
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
    meta: state.posts.meta,
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
  }),
  { fetchPosts, deletePost }
)(PostIndex);
