const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {URL_CDN, IS_NEIBU} = require('./config');

module.exports = merge.smart(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist' + (IS_NEIBU ? '/neibu' : '')),
        publicPath: URL_CDN
    },
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
