const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const pkg = require('../package.json');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: "[name].js",
        chunkFilename: "[name].js",
        library: 'vmui',
        libraryTarget: 'umd'
    },
    externals: {
        vue: 'Vue'
    },
    plugins: [
        new webpack.BannerPlugin(pkg.name + ' v' + pkg.version + ' by Zhangling (c) ' + new Date().getFullYear()),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});
