var webpack = require('webpack');
var path = require('path');                // a useful node path helper library
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: [
        './src/main.js'
    ],

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

                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'public/[name].bundle.css',
            allChunks: true,
        }),
    ],
    devServer: {
        contentBase: 'public'
    },
}

module.exports = config;
