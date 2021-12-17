const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge.smart(common, {
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
    ]
});
