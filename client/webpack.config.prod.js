/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const environment = require('./environment');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '/assets/bundle.[hash].js',
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
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new ExtractTextPlugin('/assets/styles.[hash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
    }),
    new ProgressBarPlugin({
      format: '[:bar] Running for :elapsed seconds',
      clear: false,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    config: JSON.stringify(environment.config()),
  },
};
