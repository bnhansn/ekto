/* eslint-disable no-console */
const ip = require('ip');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
});

server.listen(
  8000,
  ip.address(),
  error => {
    if (error) { console.log(error); }
  }
);
