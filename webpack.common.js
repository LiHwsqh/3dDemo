const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './index.js',
    },

    output: {
        filename: '[name].[hash:6].js',
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