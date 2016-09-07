/* eslint-disable no-console, import/no-extraneous-dependencies */
const s3 = require('s3');
require('dotenv').config();

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

const params = {
  localDir: './build',
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
  console.log('==> 🎉  Upload successful');
});
