import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchPost } from './actions';
import React, { Component, PropTypes } from 'react';

class PostEdit extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { params: { accountSlug, postSlug } } = this.props;
    this.props.fetchPost(accountSlug, postSlug);
  }

  render() {
    const { post, isLoading } = this.props;

    if (isLoading && isEmpty(post)) {
      return (
        <div className="container">
          Loading...
        </div>
      );
    }

    return (
      <div className="container">
        {post.attributes.title}
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.post,
    isLoading: state.post.isLoading,
  }),
  { fetchPost }
)(PostEdit);
