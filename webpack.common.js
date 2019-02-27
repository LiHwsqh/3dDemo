const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {SOURCE_VERSION = '0.0.1', TARGET} = process.env;

module.exports = {
    entry: {
        index: './index.js',
    },

    output: {
        filename: '[name].[hash].js',
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
                            name: '[name].' + SOURCE_VERSION + '.[ext]'
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
                            name: '[name].' + SOURCE_VERSION + '.[ext]'
                        }
                    }
                ]
            }
        ]
    },
/*
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    priority: 0,
                    test: /[\\/]node_modules[\\/]/
                },
                manifest: {
                    name: 'manifest',
                    chunks: 'all',
                    priority: 0,
                    test: /src[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },
*/

    plugins: [
        new webpack.DefinePlugin({
            'process.env.TARGET': "'"+TARGET+"'"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
    ]
};