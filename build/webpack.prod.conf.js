const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
module.exports = merge(base, {
    mode: 'production',
    // output: {
    //     path: path.resolve(__dirname, 'views'),
    //     filename: 'js/[name].[chunkhash].js',
    //     chunkFilename: 'js/[id].[chunkhash].js'
    // },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html', filename: 'index.html', favicon: './bitbug_favicon.ico'}),
        new cleanWebpackPlugin('dist'),
    ]
})