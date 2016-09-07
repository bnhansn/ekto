/* eslint-disable import/no-extraneous-dependencies */
const ip = require('ip');
require('dotenv').config();

module.exports = {
  config(environment) {
    if (environment === 'production') {
      return {
        API_URL: 'https://api.ekto.tech/v0',
        PHOTO_BUCKET: 'ekto.prod',
        PHOTO_BUCKET_REGION: 'us-west-2',
        PHOTO_BUCKET_ACCESS_KEY_ID: process.env.PHOTO_BUCKET_ACCESS_KEY_ID,
        PHOTO_BUCKET_SECRET_ACCESS_KEY: process.env.PHOTO_BUCKET_SECRET_ACCESS_KEY,
      };
    }
    return {
      API_URL: `http://${ip.address()}:3000/v0`,
      PHOTO_BUCKET: 'ekto.dev',
      PHOTO_BUCKET_REGION: 'us-west-2',
      PHOTO_BUCKET_ACCESS_KEY_ID: process.env.PHOTO_BUCKET_ACCESS_KEY_ID,
      PHOTO_BUCKET_SECRET_ACCESS_KEY: process.env.PHOTO_BUCKET_SECRET_ACCESS_KEY,
    };
  },
};
