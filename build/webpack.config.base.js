'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.config');

const isProduction = process.env.NODE_ENV === 'production';

const urlLoaderLimit = config.common.urlLoaderLimit;

// reference path alias
const alias = {
  docs: resolve('docs'),
  src: resolve('src'),
  typings: resolve('typings'),
  'void-ui': isProduction ? resolve('dist/void-ui.common.js') : resolve('src/index.ts'),
  'void-ui/style': resolve('src/index.scss'),
};

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,
    publicPath: isProduction
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.scss'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay,
          },
        },
        enforce: 'pre',
        include: [resolve('src'), resolve('docs'), resolve('test')],
      },
      {
        test: /\.ts$/,
        use: 'tslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('docs')],
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: vueLoaderConfig,
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        include: [resolve('src'), resolve('docs')],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src'), resolve('docs'), resolve('test')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            name: utils.assetsPath('img/[name].[hash:8].[ext]'),
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            name: utils.assetsPath('media/[name].[hash:8].[ext]'),
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttc|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            name: utils.assetsPath('fonts/[name].[hash:8].[ext]'),
          },
        },
      },
      {
        test: /\.md$/,
        use: {
          loader: 'vue-markdown-loader',
          options: {
            xhtmlOut: true,
            wrapper: 'div',
          },
        },
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
};
