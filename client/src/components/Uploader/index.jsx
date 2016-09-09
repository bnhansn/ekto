/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import React, { Component, PropTypes } from 'react';
import 'aws-sdk/dist/aws-sdk';
import Dropzone from 'react-dropzone';
import { css, StyleSheet } from 'aphrodite';
import {
  PHOTO_BUCKET,
  PHOTO_BUCKET_REGION,
  PHOTO_BUCKET_ACCESS_KEY_ID,
  PHOTO_BUCKET_SECRET_ACCESS_KEY,
} from 'config';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  dropzone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px',
    height: '125px',
    fontWeight: '500',
    color: colors.primary,
    cursor: 'pointer',
    background: colors.grayLighter,
    border: `3px dashed ${colors.grayLight}`,
    borderRadius: '5px',
    ':hover': {
      background: 'rgb(225,230,235)',
    },
  },

  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#fff',
    background: 'rgba(0,0,0,.6)',
    border: '0',
    boxShadow: 'rgba(255,255,255,.2) 0 0 0 1px',
    ':hover': {
      color: '#fff',
      background: colors.danger,
    },
  },
});

class Uploader extends Component {
  static propTypes = {
    image: PropTypes.string,
    onDelete: PropTypes.func,
    onUpload: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isUploadingImage: false,
      currentImage: props.image,
    };
  }

  handleImageDelete = () => {
    this.setState({ currentImage: null });
    this.props.onDelete();
  }

  handleUpload = (files) => {
    this.setState({ isUploadingImage: true });
    const image = files[0];
    const filename = `${Math.random().toString(36).substring(13)}.${image.type.split('/')[1]}`;
    const params = {
      Body: image,
      Bucket: PHOTO_BUCKET,
      ContentType: image.type,
      Key: filename,
    };
    const credentials = new window.AWS.Credentials({
      accessKeyId: PHOTO_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: PHOTO_BUCKET_SECRET_ACCESS_KEY,
    });
    const s3 = new window.AWS.S3({ credentials, region: PHOTO_BUCKET_REGION });
    s3.upload(params, (error, data) => {
      if (error) {
        this.setState({ isUploadingImage: false });
      } else {
        const s3Url = data.Location;
        this.props.onUpload(s3Url);
        this.setState({
          isUploadingImage: false,
          currentImage: data.Location,
        });
      }
    });
  }

  render() {
    const { currentImage, isUploadingImage } = this.state;

    return (
      <div>
        {currentImage && !isUploadingImage &&
          <div style={{ position: 'relative' }}>
            <img src={currentImage} alt="preview" className="img-fluid" />
            <button
              className={`btn ${css(styles.deleteButton)}`}
              onClick={this.handleImageDelete}
            >
              <i className="icon icon-bin2" />
            </button>
          </div>
        }
        {!currentImage && !isUploadingImage &&
          <Dropzone onDrop={this.handleUpload} className={css(styles.dropzone)}>
            Drop to upload
          </Dropzone>
        }
        {isUploadingImage &&
          <div className="loader" />
        }
      </div>
    );
  }
}

export default Uploader;
