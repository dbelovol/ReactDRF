const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const serverConfig = {
    mode: 'production',
    entry: {
      index: './src/server/index.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: __dirname +"/dist",
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
              options: {
                  presets: [
                  ['@babel/preset-env',{modules:false}],
                  '@babel/preset-react',    
                  ],
                  
                  
              }
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
          name: '[name].[ext]',
          publicPath:'/static/img/',
          outputPath:'public/img/'
          },
      },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      })
    ]
  }
  
  const browserConfig = {
    mode: 'production',
    entry: {
      index: './src/browser/index.js'
    },
    output: {
      path: __dirname +"/dist/public",
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
              options: {
                  presets: [
                  ['@babel/preset-env',{modules:false}],
                  '@babel/preset-react',    
                  ],
                  
                  
              }
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
          name: '[name].[ext]',
          publicPath:'/static/img/',
          outputPath:'img/'
          },
      },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true",
      }), 
      new CompressionPlugin({
        algorithm: 'brotliCompress',
        filename: '[name][ext].br',

      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[name][ext].gz',
      })
      // new BundleAnalyzerPlugin()
    ]
  }

  module.exports = [serverConfig, browserConfig]