const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './index.js',
    },

    output: {
        filename: '[name].[contenthash: 6].js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                exclude: path.join(__dirname, './lib')
            },
            {
                test: /\.(styl|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: { importLoaders: 1 }},
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpg|png|jpeg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.mp3/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash:6].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
    ]
};