/* eslint-disable no-console */
const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const config = require('./config.dev');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${ip.address()}:8000/`,
    'webpack/hot/only-dev-server',
    './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]),
      },
    ],
  },
  postcss: function process() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new ProgressBarPlugin({
      format: '[:bar] Running for :elapsed seconds',
      clear: false,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    config: JSON.stringify(config),
  },
};
