const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge.smart(common, {
    output: {
        filename: '[name].[contenthash:6].js',
    },
    mode: 'production',
    plugins: [
        new UglifyJsPlugin({
            // 缓存
            cache: false,
            // 多线程
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                output: {
                    beautify: false,
                }
            }
        })
    ]
});
