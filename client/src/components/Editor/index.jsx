import moment from 'moment';
import showdown from 'showdown';
import DatePicker from 'react-datepicker';
import { autobind } from 'core-decorators';
import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Input from '../Input';
import Textarea from '../Textarea';
import { newlineExtension } from './utils';
import MarkdownGuide from '../../components/MarkdownGuide';
import Uploader from '../../components/Uploader';
import DeletePostModal from '../../components/DeletePostModal';

class Editor extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    existingPost: PropTypes.bool,
    initialValues: PropTypes.object,
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    Tabs.setUseDefaultStyles(false);
    this.state = {
      preview: '',
      deleteModalOpen: false,
      image: props.existingPost ? props.initialValues.image : null,
      title: props.existingPost ? props.initialValues.title : 'Untitled',
      publishedAt: props.existingPost && props.initialValues.publishedAt ?
                   moment(props.initialValues.publishedAt) :
                   moment(),
    };
  }

  componentWillMount() {
    const { existingPost, initialValues } = this.props;
    if (existingPost) {
      this.setPreview(initialValues.markdown);
    }
  }

  setPreview(markdown) {
    newlineExtension();
    const converter = new showdown.Converter({
      extensions: ['newline'],
      strikethrough: true,
      tablesHeaderId: true,
      simplifiedAutoLink: true,
    });
    const html = converter.makeHtml(markdown);
    this.setState({ preview: html });
  }

  @autobind
  handlePublish(data) {
    const post = { ...data, published: true };
    this.handleSubmit(post);
  }

  @autobind
  handleUnpublish(data) {
    const post = { ...data, published: false };
    this.handleSubmit(post);
  }

  @autobind
  handleSubmit(data) {
    this.dropdown.hide();
    const post = {
      ...data,
      image: this.state.image,
      html: this.state.preview,
      publishedAt: this.state.publishedAt,
    };
    this.props.onSubmit(post);
  }

  @autobind
  renderPreview() {
    return { __html: this.state.preview };
  }

  renderNewSaveButton() {
    const { isSaving, existingPost } = this.props;
    if (existingPost) { return null; }
    return isSaving ? 'Saving...' : 'Save';
  }

  renderEditSaveButton() {
    const { isSaving, existingPost } = this.props;
    if (!existingPost) { return null; }
    return isSaving ? 'Updating...' : 'Update';
  }

  renderAuthorOptions() {
    const { team } = this.props;
    if (!team.length) { return null; }

    return team.map(user => <option key={user.id} value={user.id}>{user.name}</option>);
  }

  render() {
    const { deleteModalOpen } = this.state;
    const { initialValues, handleSubmit, existingPost } = this.props;
    const isPublished = initialValues.published;

    return (
      <div className="m-b-2">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="text-xs-right m-b-1">
            <button type="submit" className="btn btn-primary save-post-button">
              {this.renderNewSaveButton()}
              {this.renderEditSaveButton()}
            </button>
            <Dropdown ref={(c) => { this.dropdown = c; }}>
              <DropdownTrigger>
                <button type="button" className="btn btn-primary post-dropdown-trigger">
                  <i className="icon icon-arrow-down5" />
                </button>
              </DropdownTrigger>
              <DropdownContent className="dropdown-right text-xs-left">
                <button type="submit" className="dropdown-item">
                  {existingPost ? 'Update post' : 'Save Draft'}
                </button>
                {isPublished ?
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleSubmit(this.handleUnpublish)}
                  >
                    Unpublish
                  </button> :
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleSubmit(this.handlePublish)}
                  >
                    Publish
                  </button>
                }
                {existingPost &&
                  <div>
                    <hr className="m-a-0" />
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => this.setState({ deleteModalOpen: true })}
                    >
                      Delete
                    </button>
                  </div>
                }
              </DropdownContent>
            </Dropdown>
          </div>
          <Tabs>
            <TabList className="editor-tab-list">
              <Tab className="editor-tab"><i className="icon icon-file-text m-r-sm" />Write</Tab>
              <Tab className="editor-tab"><i className="icon icon-eye m-r-sm" />Preview</Tab>
              <Tab className="editor-tab"><i className="icon icon-cogs m-r-sm" />Settings</Tab>
              <Tab className="editor-tab"><i className="icon icon-map4 m-r-sm" />Guide</Tab>
            </TabList>
            <TabPanel>
              <Field
                type="text"
                name="title"
                component="input"
                placeholder="Title"
                className="post-title"
                ref={(c) => { this.title = c; }}
                onKeyUp={() => { this.setState({ title: this.title.value }); }}
              />
              <Field
                type="text"
                name="markdown"
                component="textarea"
                className="post-markdown"
                ref={(c) => { this.markdown = c; }}
                onKeyUp={() => { this.setPreview(this.markdown.value); }}
              />
            </TabPanel>
            <TabPanel>
              <div className="post-title-preview">{this.state.title}</div>
              <div className="post-html-preview" dangerouslySetInnerHTML={this.renderPreview()} />
            </TabPanel>
            <TabPanel>
              <div className="post-settings">
                <div className="post-settings-title">
                  <h4 className="m-b-0">Settings</h4>
                </div>
                <div className="post-settings-content">
                  <Field
                    type="text"
                    name="slug"
                    label="Slug"
                    component={Input}
                  />
                  <div className="form-group">
                    <label htmlFor="datepicker">Publish date</label>
                    <DatePicker
                      name="datepicker"
                      className="form-control"
                      popoverAttachment="top left"
                      selected={this.state.publishedAt}
                      popoverTargetAttachment="bottom left"
                      onChange={(date) => this.setState({ publishedAt: date })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="authorId">Author</label>
                    <Field
                      label="Author"
                      name="authorId"
                      component="select"
                      className="form-control"
                    >
                      {this.renderAuthorOptions()}
                    </Field>
                  </div>
                  <Field
                    type="text"
                    name="metaTitle"
                    label="Meta title"
                    component={Input}
                  />
                  <Field
                    name="metaDescription"
                    label="Meta description"
                    component={Textarea}
                  />
                  <div className="form-group">
                    <label htmlFor="image">Featured image</label>
                    <Uploader
                      image={this.state.image}
                      onUpload={image => this.setState({ image })}
                      onDelete={() => this.setState({ image: '' })}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <MarkdownGuide />
            </TabPanel>
          </Tabs>
        </form>
        <DeletePostModal
          isOpen={deleteModalOpen}
          onDelete={() => this.props.onDelete()}
          onRequestClose={() => this.setState({ deleteModalOpen: false })}
        />
      </div>
    );
  }
}

export default reduxForm({
  form: 'editor',
})(Editor);
