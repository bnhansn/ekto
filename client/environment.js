const ip = require('ip');

module.exports = {
  config(environment) {
    if (environment === 'production') {
      return {
        API_URL: 'http://billow.us-west-2.elasticbeanstalk.com/api',
      };
    }
    return {
      API_URL: `http://${ip.address()}:3000/api`,
    };
  },
};
