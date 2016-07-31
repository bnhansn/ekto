import { connect } from 'react-redux';
import { createPost } from './actions';
import Editor from '../../components/Editor';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MarkdownGuide from '../../components/MarkdownGuide';
import { keyTransform, assignAttributes } from '../../utils';

class PostNew extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    Tabs.setUseDefaultStyles(false);
    this.state = { post: {} };
  }

  handleEditorChange(title, markdown) {
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
    this.props.createPost(this.props.params.accountSlug, data);
  }

  render() {
    const { isSaving } = this.props;

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
            <Editor post={this.state.post} onEditorChange={::this.handleEditorChange} />
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
    isSaving: state.postNew.isSaving,
  }),
  { createPost }
)(PostNew);
