const ip = require('ip');

module.exports = {
  config(environment) {
    if (environment === 'production') {
      return {
        API_URL: 'https://api.ekto.tech/v0',
      };
    }
    return {
      API_URL: `http://${ip.address()}:3000/v0`,
    };
  },
};
