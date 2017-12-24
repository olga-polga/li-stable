var webpack = require('webpack');
var path = require('path');                // a useful node path helper library
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: [
        './src/main.js'
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
                    loader: "sass-loader"
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
    ],
    devServer: {
        contentBase: 'public',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        proxy: {
            '/api/**': {
                target:'http://localhost:8090' , logLevel: 'debug'
            }
        }

    },
}
module.exports = config;
