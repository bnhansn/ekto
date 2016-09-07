/* eslint-disable no-console, import/no-extraneous-dependencies */
const ip = require('ip');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
});

const port = 8000;

server.listen(
  port,
  ip.address(),
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log(`\n==> 🌎  WebpackDevServer listening at http://${ip.address()}:${port}`);
    }
  }
);
