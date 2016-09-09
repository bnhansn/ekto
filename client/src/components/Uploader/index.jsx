/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import React, { Component, PropTypes } from 'react';
import 'aws-sdk/dist/aws-sdk';
import Dropzone from 'react-dropzone';
import {
  PHOTO_BUCKET,
  PHOTO_BUCKET_REGION,
  PHOTO_BUCKET_ACCESS_KEY_ID,
  PHOTO_BUCKET_SECRET_ACCESS_KEY,
} from 'config';

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
              className="btn delete-image-button"
              onClick={this.handleImageDelete}
            >
              <i className="icon icon-bin2" />
            </button>
          </div>
        }
        {!currentImage && !isUploadingImage &&
          <Dropzone onDrop={this.handleUpload} className="dropzone">
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
