import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { fetchPost, updatePost } from './actions';
// import Editor from '../../components/Editor';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MarkdownGuide from '../../components/MarkdownGuide';
import { keyTransform, assignAttributes } from '../../utils';

class PostEdit extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    Tabs.setUseDefaultStyles(false);
    this.state = { post: {} };
  }

  componentWillMount() {
    const { params: { accountSlug, id } } = this.props;
    this.props.fetchPost(accountSlug, id);
  }

  handleEditorChange() {
    const title = this.refs.title.value;
    const markdown = this.refs.markdown.value;
    this.setState({
      post: {
        ...this.state.post,
        title,
        markdown,
      },
    });
  }

  handleSubmit() {
    const { post } = this.state;
    const attributes = keyTransform(post);
    const data = assignAttributes(attributes);
    this.props.updatePost(this.props.params.accountSlug, this.props.params.id, data);
  }

  render() {
    const { post, isLoading, isSaving } = this.props;

    if (isLoading || isEmpty(post)) {
      return <div className="loader"></div>;
    }

    return (
      <div className="container">
        <div className="text-xs-right m-b-1">
          <button className="btn btn-primary" onClick={::this.handleSubmit}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
        <Tabs>
          <TabList>
            <Tab><i className="icon icon-file-text m-r-sm"></i>Write</Tab>
            <Tab><i className="icon icon-eye m-r-sm"></i>Preview</Tab>
            <Tab><i className="icon icon-cogs m-r-sm"></i>Settings</Tab>
            <Tab><i className="icon icon-map4 m-r-sm"></i>Guide</Tab>
          </TabList>
          <TabPanel>
            <input
              ref="title"
              type="text"
              className="post-title"
              placeholder="Title"
              onChange={::this.handleEditorChange}
              defaultValue={post.attributes.title || ''}
            />
            <textarea
              ref="markdown"
              className="post-markdown"
              onChange={::this.handleEditorChange}
              defaultValue={post.attributes.markdown || ''}
            ></textarea>
          </TabPanel>
          <TabPanel>
            <h2>Preview</h2>
          </TabPanel>
          <TabPanel>
            <h2>Settings</h2>
          </TabPanel>
          <TabPanel>
            <MarkdownGuide />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.post,
    isSaving: state.post.isSaving,
    isLoading: state.post.isLoading,
  }),
  { fetchPost, updatePost }
)(PostEdit);
