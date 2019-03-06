const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, argv) => {
  const debug = env !== 'production';
  return {
    context: path.join(__dirname, 'src'),
    devtool: debug ? 'inline-sourcemap' : null,
    entry: './app/client.js',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              'react-html-attrs',
              'transform-class-properties',
              'transform-decorators-legacy'
            ]
          }
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    output: {
      publicPath: '/',
      path: `${__dirname}/dist/`,
      filename: 'client.min.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('dev'),
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        files: {
          css: ['style.css'],
          js: ['client.min.js']
        }
      }),
      new WebpackPwaManifest({
        name: 'Campaigner',
        short_name: 'Campaigner',
        description: 'Campaigner',
        background_color: '#ff9501',
        theme_color: '#576EFC',
        display: 'standalone',
        crossorigin: 'use-credentials' // can be null, use-credentials or anonymous
        // icons: [
        //   {
        //     src: path.resolve('src/assets/icon.png'),
        //     sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        //   },
        //   {
        //     src: path.resolve('src/assets/large-icon.png'),
        //     size: '1024x1024' // you can also use the specifications pattern
        //   }
        // ]
      })
    ]
  };
};
