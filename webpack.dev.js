const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge.smart(common, {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    devServer: {
        publicPath: '/',
        disableHostCheck: true,
        open: true,
        overlay: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
