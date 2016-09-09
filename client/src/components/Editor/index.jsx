import moment from 'moment';
import showdown from 'showdown';
import DatePicker from 'react-datepicker';
import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Textarea from '../Textarea';
import { newlineExtension } from './utils';
import MarkdownGuide from '../../components/MarkdownGuide';
import Uploader from '../../components/Uploader';
import DeletePostModal from '../../components/DeletePostModal';
import { colors, media } from '../../styles/variables';

const styles = StyleSheet.create({
  editorPanel: {
    width: '100%',
    padding: '15px 20px',
    color: colors.grayDark,
    background: '#fff',
    border: '0',
    outline: 'none',
  },

  editorTitle: {
    fontSize: '1.5rem',
    fontWeight: '500',
    borderBottom: `1px solid ${colors.grayLightest}`,
  },

  contentView: {
    minHeight: '450px',
  },

  savePostButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  postDropdownTrigger: {
    borderLeft: '1px solid rgba(0,0,0,.1)',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },

  editorTabList: {
    [media.xsDown]: {
      display: 'flex',
    },
  },

  editorTab: {
    [media.xsDown]: {
      alignItems: 'center',
      flexGrow: '1',
      justifyContent: 'center',
      padding: '10px 15px',
      fontSize: '90%',
    },
  },
});

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

  handlePublish = (data) => {
    const post = { ...data, published: true };
    this.handleSubmit(post);
  }

  handleUnpublish = (data) => {
    const post = { ...data, published: false };
    this.handleSubmit(post);
  }

  handleSubmit = (data) => {
    this.dropdown.hide();
    const post = {
      ...data,
      image: this.state.image,
      html: this.state.preview,
      publishedAt: this.state.publishedAt,
    };
    this.props.onSubmit(post);
  }

  renderPreview = () => {
    const preview = { __html: this.state.preview };
    return preview;
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
            <button type="submit" className={`btn btn-primary ${css(styles.savePostButton)}`}>
              {this.renderNewSaveButton()}
              {this.renderEditSaveButton()}
            </button>
            <Dropdown ref={(c) => { this.dropdown = c; }}>
              <DropdownTrigger>
                <button
                  type="button"
                  className={`btn btn-primary ${css(styles.postDropdownTrigger)}`}
                >
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
            <TabList className={css(styles.editorTabList)}>
              <Tab className={css(styles.editorTab)}>
                <i className="icon icon-file-text" style={{ marginRight: '.5rem' }} />
                <span>Write</span>
              </Tab>
              <Tab className={css(styles.editorTab)}>
                <i className="icon icon-eye" style={{ marginRight: '.5rem' }} />
                <span>Preview</span>
              </Tab>
              <Tab className={css(styles.editorTab)}>
                <i className="icon icon-cogs" style={{ marginRight: '.5rem' }} />
                <span>Settings</span>
              </Tab>
              <Tab className={css(styles.editorTab)}>
                <i className="icon icon-map4" style={{ marginRight: '.5rem' }} />
                <span>Guide</span>
              </Tab>
            </TabList>
            <TabPanel>
              <Field
                type="text"
                name="title"
                component="input"
                placeholder="Title"
                ref={(c) => { this.title = c; }}
                className={css(styles.editorPanel, styles.editorTitle)}
                onKeyUp={() => { this.setState({ title: this.title.value }); }}
              />
              <Field
                type="text"
                name="markdown"
                component="textarea"
                ref={(c) => { this.markdown = c; }}
                className={css(styles.editorPanel, styles.contentView)}
                onKeyUp={() => { this.setPreview(this.markdown.value); }}
              />
            </TabPanel>
            <TabPanel>
              <div className={css(styles.editorPanel, styles.editorTitle)}>{this.state.title}</div>
              <div
                className={css(styles.editorPanel, styles.contentView)}
                dangerouslySetInnerHTML={this.renderPreview()}
              />
            </TabPanel>
            <TabPanel>
              <div>
                <div className={css(styles.editorPanel, styles.editorTitle)}>Settings</div>
                <div className={css(styles.editorPanel)}>
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
