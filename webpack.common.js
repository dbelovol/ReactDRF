const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');




module.exports = {

    entry: './src/index.js',
    
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                
            }
        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: "src/main.css",
            chunkFilename: "src/[id].css"
        }),
//        new PurgecssPlugin({
      // Give pths to parse for rules. These should be absolute!
//            paths: glob.sync([path.join(__dirname, 'src/*.js'), path.join(__dirname, 'node_modules/mdbreact/dist/*.js')]),
//        })
//        new BundleAnalyzerPlugin()
       
    ]
};
