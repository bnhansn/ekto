import moment from 'moment';
import Modal from 'react-modal';
import showdown from 'showdown';
import DatePicker from 'react-datepicker';
import { autobind } from 'core-decorators';
import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Input from '../Input';
import { newlineExtension } from './utils';
import MarkdownGuide from '../../components/MarkdownGuide';

class Editor extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    initialValues: PropTypes.object,
    team: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    Tabs.setUseDefaultStyles(false);
    this.state = {
      preview: '',
      deleteModalOpen: false,
      title: props.initialValues ? props.initialValues.title : 'Untitled',
      publishedAt: props.initialValues && props.initialValues.publishedAt ?
                   moment(props.initialValues.publishedAt) :
                   moment(),
    };
  }

  componentWillMount() {
    const { initialValues } = this.props;
    if (initialValues) {
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

  getInitialAuthorId() {
    const { user, initialValues } = this.props;
    if (!initialValues) { return user.id; }
    return initialValues.authorId;
  }

  @autobind
  handleModalClose() {
    this.setState({
      deleteModalOpen: false,
    });
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
    const { isSaving, initialValues } = this.props;
    const existingPost = initialValues !== undefined;
    if (existingPost) { return null; }
    return isSaving ? 'Saving...' : 'Save';
  }

  renderEditSaveButton() {
    const { isSaving, initialValues } = this.props;
    const existingPost = initialValues !== undefined;
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
    const { account, initialValues, handleSubmit } = this.props;
    const existingPost = initialValues !== undefined;
    const published = existingPost && initialValues.published;

    return (
      <div>
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
                {published ?
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
            <TabList>
              <Tab><i className="icon icon-file-text m-r-sm" />Write</Tab>
              <Tab><i className="icon icon-eye m-r-sm" />Preview</Tab>
              <Tab><i className="icon icon-cogs m-r-sm" />Settings</Tab>
              <Tab><i className="icon icon-map4 m-r-sm" />Guide</Tab>
            </TabList>
            <TabPanel>
              <Field
                ref={(c) => { this.title = c; }}
                type="text"
                name="title"
                component="input"
                placeholder="Title"
                className="post-title"
                onKeyUp={() => { this.setState({ title: this.title.value }); }}
              />
              <Field
                type="text"
                ref={(c) => { this.markdown = c; }}
                name="markdown"
                component="textarea"
                className="post-markdown"
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
                  <p className="small text-muted">
                    {`http://api.ekto.tech/v1/${account.key}/posts/${existingPost ? initialValues.slug : ''}`}
                  </p>
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
                  <label htmlFor="authorId">Author</label>
                  <Field
                    label="Author"
                    name="authorId"
                    component="select"
                    className="form-control"
                    defaultValue={this.getInitialAuthorId()}
                  >
                    {this.renderAuthorOptions()}
                  </Field>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <MarkdownGuide />
            </TabPanel>
          </Tabs>
        </form>
        <Modal
          className="modal"
          isOpen={deleteModalOpen}
          overlayClassName="modal-overlay"
          onRequestClose={this.handleModalClose}
        >
          <div className="modal-header">
            <h6 className="text-primary">Delete post</h6>
            <i
              className="modal-close"
              onClick={this.handleModalClose}
            />
          </div>
          <div className="modal-content">
            <p>Are you sure you want to permanently delete this post?</p>
          </div>
          <div className="modal-footer text-xs-right">
            <div className="btn-toolbar">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleModalClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.props.onDelete()}
              >
                Delete post
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editor',
})(Editor);
