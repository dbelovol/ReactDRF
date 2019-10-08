//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const PurifyCSSPlugin = require('purifycss-webpack');
//const PurgecssPlugin = require('purgecss-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const glob = require('glob-all');
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const ShakePlugin = require('webpack-common-shake').Plugin



module.exports = merge(common, {

    mode: 'development',
    output: {
        publicPath: "/"
    },
    
    devServer: {
        historyApiFallback: true,
        
       
    },
    
    module: {
        rules: [
            {
                test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                
                publicPath:'/'
                
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                exclude: /node_modules/,
                options: {
                name: 'IMG/[name].[ext]',
                publicPath:'/'
                },
            },
            
            
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
           template: 'src/index.html',
        })
//        new PurgecssPlugin({
      // Give pths to parse for rules. These should be absolute!
//            paths: glob.sync([path.join(__dirname, 'src/*.js'), path.join(__dirname, 'node_modules/mdbreact/dist/*.js')]),
//        })
//        new BundleAnalyzerPlugin()
       
    ]
});
