'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./js/main.js",
    output: {
        filename: "bundle.js",
        library: 'vm'
    },
    watch: true,
    module: {
        loaders: [
            {
            test: /\.js$/,
            loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue"
            }
        ]
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: '"ru"'
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        compress: true,
        port: 8080,
    }
};

if (NODE_ENV == 'production') {

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
console.log(NODE_ENV);