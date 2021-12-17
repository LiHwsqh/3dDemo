const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: {
        filename: '[name].[contenthash:6].js',
    },
    mode: 'production'
});
