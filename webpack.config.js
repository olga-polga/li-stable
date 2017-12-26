var webpack = require('webpack');
var path = require('path');                // a useful node path helper library
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: [
        './src/index.js'
    ],
    cache: false,
    output: {
        path: path.resolve(__dirname, 'public'), // store the bundled output in dist/bundle.js
        filename: 'bundle.js'                  // specifying file name for our compiled assets
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                }
            },
            {

                test: /\.s?css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        importLoaders: 1,
                        modules: true,
                        minimize: true,
                        sourceMap: true,
                    },
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"}

        ]
    },

    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'public/[name].bundle.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development'),
                'REACT_APP_REPO_URL': JSON.stringify('http://localhost:8090')
            }
        }),
    ],
    devServer: {
        contentBase: 'public',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }
}
module.exports = config;
