var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

var serverConfig = {
    mode: 'development',
    entry: {
      // polyfill: 'babel-polyfill',
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
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      })
    ]
  }
  
  module.exports = [serverConfig,]