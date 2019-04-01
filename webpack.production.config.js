const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env = 'development', argv) => {
  let processEnvConfig = {};
  const htmlWebpackPluginConfig = {};

  if (env && env === 'production') {
    processEnvConfig = {
      NODE_ENV: JSON.stringify(env)
    };
  } else if (env && env === 'staging') {
    processEnvConfig = {
      NODE_ENV: JSON.stringify(env),
      ENCRYPT_ALGO: JSON.stringify('AES-256-CBC')
    };
  } else {
    processEnvConfig = {
      NODE_ENV: JSON.stringify(env)
    };
  }

  return {
    context: path.join(__dirname, '/'),
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: false
    },
    entry: {
      main: './src/app/client.js'
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: '[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015', 'react', 'stage-2'],
              plugins: ['syntax-dynamic-import']
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
          use: {
            loader: 'url-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader'
            },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/,

            // priority
            priority: 20
          },
          // common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.DefinePlugin({
        'process.env': processEnvConfig
      }),
      new AsyncChunkNames(),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          // Run cssnano in safe mode to avoid
          // potentially unsafe transformations.
          safe: true
        },
        canPrint: false
      }),
      new MinifyPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[chunkhash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        files: {
          css: ['style.css'],
          js: ['bundle.js']
        },
        minify: {
          html5: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: false,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributese: true,
          useShortDoctype: true
        }
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
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
