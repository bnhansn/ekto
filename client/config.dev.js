const ip = require('ip');

module.exports = {
  API_URL: `http://${ip.address()}:3000/api`,
};
