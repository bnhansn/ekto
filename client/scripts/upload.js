/* eslint-disable no-console */
const s3 = require('s3');
require('dotenv').config();

(() => {
  if (!process.env.REACT_APP_EKTO_API ||
      !process.env.REACT_APP_EKTO_PHOTO_BUCKET ||
      !process.env.REACT_APP_EKTO_PHOTO_BUCKET_REGION ||
      !process.env.REACT_APP_EKTO_PHOTO_BUCKET_ACCESS_KEY_ID ||
      !process.env.REACT_APP_EKTO_PHOTO_BUCKET_SECRET_ACCESS_KEY) {
    console.error('==> 🤔  Ensure all env variables are defined before deploying');
    process.exit(1);
  }
})();

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

const params = {
  localDir: 'build',
  deleteRemoved: true,
  s3Params: {
    Bucket: process.env.AWS_S3_BUCKET,
  },
};

const uploader = client.uploadDir(params);

uploader.on('error', err => {
  console.error('==> 😱  Unable to sync:', err.stack);
});

uploader.on('progress', () => {
  console.log(`==> 🚀  ${uploader.progressAmount} of ${uploader.progressTotal} complete`);
});

uploader.on('end', () => {
  console.log(`==> 🎉  Upload to ${process.env.AWS_S3_BUCKET} successful`);
});
