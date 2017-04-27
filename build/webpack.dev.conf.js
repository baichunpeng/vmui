const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './docs/example/main.js',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '../dist/example'),
        publicPath: '/example/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'})
    ]
});
