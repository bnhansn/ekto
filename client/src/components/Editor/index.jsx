import React, { Component, PropTypes } from 'react';

class Editor extends Component {
  static propTypes = {
    post: PropTypes.object,
    onEditorChange: PropTypes.func.isRequired,
  }

  handleChange() {
    const title = this.refs.title.value;
    const markdown = this.refs.markdown.value;
    this.props.onEditorChange(title, markdown);
  }

  render() {
    const { post } = this.props;
    const attributes = post.attributes || {};

    return (
      <div>
        <input
          ref="title"
          type="text"
          className="post-title"
          placeholder="Title"
          onChange={::this.handleChange}
          defaultValue={attributes.title || ''}
        />
        <textarea
          ref="markdown"
          className="post-markdown"
          onChange={::this.handleChange}
          defaultValue={attributes.markdown || ''}
        ></textarea>
      </div>
    );
  }
}

export default Editor;
