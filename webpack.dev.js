const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = merge.smart(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '10.155.29.93',
        publicPath: '/',
        disableHostCheck: true,
        open: true,
        overlay: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

config.module.rules.filter(rule => rule.test.test('.css'))[0].use = [
    'style-loader',
    'css-loader',
    'stylus-loader'
];

module.exports = config;
