'use strict';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./js/main.js",
    output: {
        filename: "./public/bundle.js",
        library: 'vm'
    },
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
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    plugins: [
       /* new webpack.NoEmitOnErrorsPlugin(),*/
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: '"ru"'}),

        new UglifyJsPlugin({

            uglifyOptions: {
                ie8: false,
                ecma: 6,

                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    unsafe: true},
                warnings: false
            }
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
/*
if (NODE_ENV === 'production') {

    module.exports.plugins.push(
        new UglifyJsPlugin({
        uglifyOptions: {
            ie8: false,
            ecma: 6,

            output: {
                comments: false,
                beautify: false,
            },
            compress: {warnings: false,
                drop_console: true,
                unsafe: true},
            warnings: false
        }
    })
    );
};*/
console.log(NODE_ENV);