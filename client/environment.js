const ip = require('ip');

module.exports = {
  config(environment) {
    if (environment === 'production') {
      return {
        API_URL: 'https://api.ekto.tech/v0',
        PHOTO_BUCKET: 'ekto.prod',
        PHOTO_BUCKET_REGION: 'us-west-2',
        PHOTO_BUCKET_ACCESS_KEY_ID: 'AKIAILO3LS24LA6XGUCA',
        PHOTO_BUCKET_SECRET_ACCESS_KEY: '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',
      };
    }
    return {
      API_URL: `http://${ip.address()}:3000/v0`,
      PHOTO_BUCKET: 'ekto.dev',
      PHOTO_BUCKET_REGION: 'us-west-2',
      PHOTO_BUCKET_ACCESS_KEY_ID: 'AKIAILO3LS24LA6XGUCA',
      PHOTO_BUCKET_SECRET_ACCESS_KEY: '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',
    };
  },
};
